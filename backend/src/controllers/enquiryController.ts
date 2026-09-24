import { Request, Response, NextFunction } from 'express';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool, {
  isDatabaseConnected,
  inMemoryEnquiries,
  getNextEnquiryId,
  EnquiryRecord,
} from '../config/database';
import {
  validateEnquiryInput,
  validateStatusUpdate,
  UserType,
  EnquiryStatus,
} from '../utils/validation';
import { cleanPlainText } from '../utils/sanitize';

interface EnquiryRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  phone: string;
  user_type: UserType;
  interest: string;
  message: string;
  status: EnquiryStatus;
  created_at: Date;
  updated_at: Date;
}

/**
 * Helper to format DB row or memory record to camelCase API response
 */
function formatEnquiry(record: EnquiryRow | EnquiryRecord) {
  return {
    id: record.id,
    name: record.name,
    email: record.email,
    phone: record.phone,
    userType: record.user_type,
    interest: record.interest,
    message: record.message,
    status: record.status,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  };
}

/**
 * POST /api/enquiries
 * Public endpoint to submit a lead / enquiry
 */
export async function createEnquiry(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const rawData = req.body;

    const validation = validateEnquiryInput(rawData);
    if (!validation.isValid) {
      res.status(400).json({
        success: false,
        message: 'Validation failed. Please verify the entered information.',
        errors: validation.errors,
      });
      return;
    }

    // Sanitize values
    const name = cleanPlainText(rawData.name);
    const email = cleanPlainText(rawData.email).toLowerCase();
    const phone = cleanPlainText(rawData.phone);
    const userType = cleanPlainText(rawData.userType) as UserType;
    const interest = cleanPlainText(rawData.interest);
    const message = cleanPlainText(rawData.message);
    const status: EnquiryStatus = 'New';

    if (isDatabaseConnected) {
      const insertQuery = `
        INSERT INTO enquiries (name, email, phone, user_type, interest, message, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      const [result] = await pool.execute<ResultSetHeader>(insertQuery, [
        name,
        email,
        phone,
        userType,
        interest,
        message,
        status,
      ]);

      res.status(201).json({
        success: true,
        message: 'Thank you! Your enquiry has been submitted successfully. Our team will get back to you.',
        data: {
          id: result.insertId,
          name,
          email,
          phone,
          userType,
          interest,
          message,
          status,
          createdAt: new Date(),
        },
      });
    } else {
      const newRecord: EnquiryRecord = {
        id: getNextEnquiryId(),
        name,
        email,
        phone,
        user_type: userType,
        interest,
        message,
        status,
        created_at: new Date(),
        updated_at: new Date(),
      };
      inMemoryEnquiries.unshift(newRecord);

      res.status(201).json({
        success: true,
        message: 'Thank you! Your enquiry has been submitted successfully. Our team will get back to you.',
        data: formatEnquiry(newRecord),
      });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/enquiries
 * Protected endpoint for admins to list, search, and filter enquiries
 */
export async function getEnquiries(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { search, userType, status } = req.query;

    if (isDatabaseConnected) {
      let query = 'SELECT * FROM enquiries WHERE 1=1';
      const params: (string | number)[] = [];

      if (userType && typeof userType === 'string' && userType !== 'All') {
        query += ' AND user_type = ?';
        params.push(userType);
      }

      if (status && typeof status === 'string' && status !== 'All') {
        query += ' AND status = ?';
        params.push(status);
      }

      if (search && typeof search === 'string' && search.trim().length > 0) {
        const searchTerm = `%${search.trim()}%`;
        query += ' AND (name LIKE ? OR email LIKE ? OR phone LIKE ? OR interest LIKE ? OR message LIKE ?)';
        params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
      }

      query += ' ORDER BY created_at DESC';

      const [rows] = await pool.execute<EnquiryRow[]>(query, params);

      const [countsResult] = await pool.execute<RowDataPacket[]>(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'New' THEN 1 ELSE 0 END) as newCount,
          SUM(CASE WHEN status = 'Contacted' THEN 1 ELSE 0 END) as contactedCount,
          SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as inProgressCount,
          SUM(CASE WHEN status = 'Closed' THEN 1 ELSE 0 END) as closedCount,
          SUM(CASE WHEN user_type = 'Student' THEN 1 ELSE 0 END) as studentCount,
          SUM(CASE WHEN user_type = 'Customer' THEN 1 ELSE 0 END) as customerCount
        FROM enquiries
      `);

      const stats = countsResult[0] || {
        total: 0,
        newCount: 0,
        contactedCount: 0,
        inProgressCount: 0,
        closedCount: 0,
        studentCount: 0,
        customerCount: 0,
      };

      res.status(200).json({
        success: true,
        data: rows.map(formatEnquiry),
        stats: {
          total: Number(stats.total) || 0,
          new: Number(stats.newCount) || 0,
          contacted: Number(stats.contactedCount) || 0,
          inProgress: Number(stats.inProgressCount) || 0,
          closed: Number(stats.closedCount) || 0,
          student: Number(stats.studentCount) || 0,
          customer: Number(stats.customerCount) || 0,
        },
      });
    } else {
      let filtered = [...inMemoryEnquiries];

      if (userType && typeof userType === 'string' && userType !== 'All') {
        filtered = filtered.filter((e) => e.user_type === userType);
      }

      if (status && typeof status === 'string' && status !== 'All') {
        filtered = filtered.filter((e) => e.status === status);
      }

      if (search && typeof search === 'string' && search.trim().length > 0) {
        const s = search.trim().toLowerCase();
        filtered = filtered.filter(
          (e) =>
            e.name.toLowerCase().includes(s) ||
            e.email.toLowerCase().includes(s) ||
            e.phone.toLowerCase().includes(s) ||
            e.interest.toLowerCase().includes(s) ||
            e.message.toLowerCase().includes(s)
        );
      }

      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      const total = inMemoryEnquiries.length;
      const newCount = inMemoryEnquiries.filter((e) => e.status === 'New').length;
      const contactedCount = inMemoryEnquiries.filter((e) => e.status === 'Contacted').length;
      const inProgressCount = inMemoryEnquiries.filter((e) => e.status === 'In Progress').length;
      const closedCount = inMemoryEnquiries.filter((e) => e.status === 'Closed').length;
      const studentCount = inMemoryEnquiries.filter((e) => e.user_type === 'Student').length;
      const customerCount = inMemoryEnquiries.filter((e) => e.user_type === 'Customer').length;

      res.status(200).json({
        success: true,
        data: filtered.map(formatEnquiry),
        stats: {
          total,
          new: newCount,
          contacted: contactedCount,
          inProgress: inProgressCount,
          closed: closedCount,
          student: studentCount,
          customer: customerCount,
        },
      });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/enquiries/:id
 * Protected endpoint to fetch a single enquiry
 */
export async function getEnquiryById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
      res.status(400).json({
        success: false,
        message: 'Invalid enquiry ID format.',
      });
      return;
    }

    if (isDatabaseConnected) {
      const [rows] = await pool.execute<EnquiryRow[]>(
        'SELECT * FROM enquiries WHERE id = ? LIMIT 1',
        [id]
      );

      if (!rows || rows.length === 0) {
        res.status(404).json({
          success: false,
          message: 'Enquiry not found.',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: formatEnquiry(rows[0]),
      });
    } else {
      const record = inMemoryEnquiries.find((e) => e.id === id);
      if (!record) {
        res.status(404).json({
          success: false,
          message: 'Enquiry not found.',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: formatEnquiry(record),
      });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /api/enquiries/:id
 * Protected endpoint to update enquiry status
 */
export async function updateEnquiryStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
      res.status(400).json({
        success: false,
        message: 'Invalid enquiry ID format.',
      });
      return;
    }

    const { status } = req.body;
    const statusValidation = validateStatusUpdate(status);
    if (!statusValidation.isValid) {
      res.status(400).json({
        success: false,
        message: statusValidation.error,
      });
      return;
    }

    const cleanStatus = status.trim() as EnquiryStatus;

    if (isDatabaseConnected) {
      const [updateResult] = await pool.execute<ResultSetHeader>(
        'UPDATE enquiries SET status = ?, updated_at = NOW() WHERE id = ?',
        [cleanStatus, id]
      );

      if (updateResult.affectedRows === 0) {
        res.status(404).json({
          success: false,
          message: 'Enquiry not found.',
        });
        return;
      }

      const [rows] = await pool.execute<EnquiryRow[]>(
        'SELECT * FROM enquiries WHERE id = ? LIMIT 1',
        [id]
      );

      res.status(200).json({
        success: true,
        message: 'Enquiry status updated successfully.',
        data: formatEnquiry(rows[0]),
      });
    } else {
      const record = inMemoryEnquiries.find((e) => e.id === id);
      if (!record) {
        res.status(404).json({
          success: false,
          message: 'Enquiry not found.',
        });
        return;
      }

      record.status = cleanStatus;
      record.updated_at = new Date();

      res.status(200).json({
        success: true,
        message: 'Enquiry status updated successfully.',
        data: formatEnquiry(record),
      });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/enquiries/:id
 * Protected endpoint to delete an enquiry
 */
export async function deleteEnquiry(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
      res.status(400).json({
        success: false,
        message: 'Invalid enquiry ID format.',
      });
      return;
    }

    if (isDatabaseConnected) {
      const [deleteResult] = await pool.execute<ResultSetHeader>(
        'DELETE FROM enquiries WHERE id = ?',
        [id]
      );

      if (deleteResult.affectedRows === 0) {
        res.status(404).json({
          success: false,
          message: 'Enquiry not found.',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Enquiry deleted successfully.',
      });
    } else {
      const index = inMemoryEnquiries.findIndex((e) => e.id === id);
      if (index === -1) {
        res.status(404).json({
          success: false,
          message: 'Enquiry not found.',
        });
        return;
      }

      inMemoryEnquiries.splice(index, 1);

      res.status(200).json({
        success: true,
        message: 'Enquiry deleted successfully.',
      });
    }
  } catch (error) {
    next(error);
  }
}
