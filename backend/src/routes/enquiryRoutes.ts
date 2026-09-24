import { Router } from 'express';
import {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/enquiryController';
import { requireAdminAuth } from '../middleware/authMiddleware';

const router = Router();

// Public: submit enquiry
router.post('/', createEnquiry);

// Protected: Admin only operations
router.get('/', requireAdminAuth, getEnquiries);
router.get('/:id', requireAdminAuth, getEnquiryById);
router.patch('/:id', requireAdminAuth, updateEnquiryStatus);
router.delete('/:id', requireAdminAuth, deleteEnquiry);

export default router;
