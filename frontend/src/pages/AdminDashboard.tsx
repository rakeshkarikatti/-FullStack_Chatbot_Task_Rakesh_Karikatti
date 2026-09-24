import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Enquiry, EnquiryStatus, EnquiryStats } from '../types/enquiry';
import {
  getEnquiries,
  updateEnquiry,
  deleteEnquiry,
  logoutAdmin,
  formatApiError,
} from '../services/api';
import {
  Shield,
  Search,
  RotateCcw,
  LogOut,
  Eye,
  Trash2,
  X,
  AlertTriangle,
  Loader2,
  Users,
  Clock,
  CheckCircle2,
  FileText,
  Mail,
  Phone,
  Tag,
  Calendar,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [stats, setStats] = useState<EnquiryStats>({
    total: 0,
    new: 0,
    contacted: 0,
    inProgress: 0,
    closed: 0,
    student: 0,
    customer: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [search, setSearch] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [enquiryToDelete, setEnquiryToDelete] = useState<Enquiry | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Check auth
  useEffect(() => {
    const token = localStorage.getItem('dronetv_admin_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Load enquiries
  const fetchEnquiries = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getEnquiries({
        search: search.trim() || undefined,
        userType: userTypeFilter !== 'All' ? userTypeFilter : undefined,
        status: statusFilter !== 'All' ? statusFilter : undefined,
      });
      setEnquiries(response.data);
      if (response.stats) {
        setStats(response.stats);
      }
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setIsLoading(false);
    }
  }, [search, userTypeFilter, statusFilter]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  // Status Change
  const handleStatusChange = async (id: number, newStatus: EnquiryStatus) => {
    try {
      const response = await updateEnquiry(id, newStatus);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: response.data.status } : e))
      );
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry((prev) => (prev ? { ...prev, status: response.data.status } : null));
      }
      setActionNotice(`Enquiry #${id} updated to "${newStatus}".`);
      setTimeout(() => setActionNotice(null), 3000);
      fetchEnquiries();
    } catch (err) {
      alert(formatApiError(err));
    }
  };

  // Delete Confirmation & Execution
  const handleDeleteConfirm = async () => {
    if (!enquiryToDelete) return;
    setIsDeleting(true);
    try {
      await deleteEnquiry(enquiryToDelete.id);
      setEnquiries((prev) => prev.filter((e) => e.id !== enquiryToDelete.id));
      if (selectedEnquiry?.id === enquiryToDelete.id) {
        setSelectedEnquiry(null);
      }
      setActionNotice(`Enquiry #${enquiryToDelete.id} deleted successfully.`);
      setTimeout(() => setActionNotice(null), 3000);
      setEnquiryToDelete(null);
      fetchEnquiries();
    } catch (err) {
      alert(formatApiError(err));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/admin/login');
  };

  const getStatusBadgeClass = (status: EnquiryStatus) => {
    switch (status) {
      case 'New':
        return 'status-badge status-new';
      case 'Contacted':
        return 'status-badge status-contacted';
      case 'In Progress':
        return 'status-badge status-progress';
      case 'Closed':
        return 'status-badge status-closed';
      default:
        return 'status-badge';
    }
  };

  return (
    <div className="admin-dashboard-container">
      {/* Top Navigation Bar */}
      <header className="admin-header">
        <div className="max-width-container admin-header-inner">
          <div className="admin-header-brand">
            <div className="admin-shield-icon">
              <Shield size={20} />
            </div>
            <div>
              <h2 className="admin-header-title">Admin Management Portal</h2>
              <span className="admin-header-sub">DroneTV Lead & Enquiry Pipeline</span>
            </div>
          </div>

          <div className="admin-header-actions">
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => fetchEnquiries()}
              title="Refresh Enquiries"
            >
              <RotateCcw size={16} />
              <span>Refresh</span>
            </button>

            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={handleLogout}
              title="Sign Out"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-width-container dashboard-main">
        {/* Action Notice Alert */}
        {actionNotice && (
          <div className="alert alert-success" role="alert">
            <CheckCircle2 size={18} className="alert-icon" />
            <div className="alert-content">
              <p>{actionNotice}</p>
            </div>
          </div>
        )}

        {/* 1. Statistics Cards */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-box total-box">
              <FileText size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Total Leads</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-box new-box">
              <Clock size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.new}</span>
              <span className="stat-label">New Enquiries</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-box contacted-box">
              <Users size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.contacted}</span>
              <span className="stat-label">Contacted</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-box progress-box">
              <RotateCcw size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.inProgress}</span>
              <span className="stat-label">In Progress</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-box closed-box">
              <CheckCircle2 size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.closed}</span>
              <span className="stat-label">Closed</span>
            </div>
          </div>
        </section>

        {/* 2. Search & Filter Bar */}
        <section className="dashboard-filter-card">
          <div className="search-row">
            <div className="search-input-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search by name, email, phone, or interest..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearch('')}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="filter-pill-groups">
            {/* User Type Filters */}
            <div className="filter-group">
              <span className="filter-label">User Type:</span>
              <div className="pill-buttons">
                {['All', 'Student', 'Customer', 'Other'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`filter-pill ${userTypeFilter === type ? 'active' : ''}`}
                    onClick={() => setUserTypeFilter(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filters */}
            <div className="filter-group">
              <span className="filter-label">Status:</span>
              <div className="pill-buttons">
                {['All', 'New', 'Contacted', 'In Progress', 'Closed'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    className={`filter-pill ${statusFilter === st ? 'active' : ''}`}
                    onClick={() => setStatusFilter(st)}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Enquiries Table & Mobile Cards */}
        <section className="enquiries-table-card">
          {isLoading ? (
            <div className="table-loading-box">
              <Loader2 size={32} className="spinner" />
              <p>Loading enquiries...</p>
            </div>
          ) : error ? (
            <div className="table-error-box">
              <AlertTriangle size={28} className="text-danger" />
              <p>{error}</p>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => fetchEnquiries()}
              >
                Retry
              </button>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="empty-state-card">
              <p className="empty-text">
                {search || userTypeFilter !== 'All' || statusFilter !== 'All'
                  ? 'No enquiries match your search or filter criteria.'
                  : 'No enquiries found.'}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Lead Contact</th>
                      <th>Type</th>
                      <th>Interest / Course</th>
                      <th>Status</th>
                      <th>Submitted</th>
                      <th className="th-actions">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((enq) => (
                      <tr key={enq.id} className="table-row">
                        <td className="td-id">#{enq.id}</td>
                        <td className="td-contact">
                          <strong className="lead-name">{enq.name}</strong>
                          <span className="lead-email">{enq.email}</span>
                          <span className="lead-phone">{enq.phone}</span>
                        </td>
                        <td>
                          <span className={`user-badge badge-${enq.userType.toLowerCase()}`}>
                            {enq.userType}
                          </span>
                        </td>
                        <td className="td-interest">
                          <span className="interest-text">{enq.interest}</span>
                        </td>
                        <td>
                          <select
                            className={`status-dropdown ${getStatusBadgeClass(enq.status)}`}
                            value={enq.status}
                            onChange={(e) =>
                              handleStatusChange(enq.id, e.target.value as EnquiryStatus)
                            }
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td className="td-date">
                          {new Date(enq.createdAt).toLocaleDateString([], {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="td-actions">
                          <button
                            type="button"
                            className="btn-icon"
                            onClick={() => setSelectedEnquiry(enq)}
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            type="button"
                            className="btn-icon text-danger"
                            onClick={() => setEnquiryToDelete(enq)}
                            title="Delete Enquiry"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards View */}
              <div className="mobile-cards-list">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="mobile-enquiry-card">
                    <div className="mobile-card-header">
                      <span className="mobile-enq-id">#{enq.id}</span>
                      <span className={`user-badge badge-${enq.userType.toLowerCase()}`}>
                        {enq.userType}
                      </span>
                    </div>

                    <h4 className="mobile-lead-name">{enq.name}</h4>
                    <p className="mobile-lead-detail"><Mail size={14} /> {enq.email}</p>
                    <p className="mobile-lead-detail"><Phone size={14} /> {enq.phone}</p>
                    <p className="mobile-lead-interest"><Tag size={14} /> {enq.interest}</p>

                    <div className="mobile-card-footer">
                      <select
                        className={`status-dropdown ${getStatusBadgeClass(enq.status)}`}
                        value={enq.status}
                        onChange={(e) =>
                          handleStatusChange(enq.id, e.target.value as EnquiryStatus)
                        }
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                      </select>

                      <div className="mobile-actions">
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => setSelectedEnquiry(enq)}
                        >
                          <Eye size={14} /> Details
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => setEnquiryToDelete(enq)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      {/* View Enquiry Details Modal */}
      {selectedEnquiry && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-header">
              <div className="modal-title-box">
                <FileText size={20} className="modal-icon" />
                <h3>Enquiry #{selectedEnquiry.id} Details</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedEnquiry(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-info-grid">
                <div className="modal-info-item">
                  <span className="m-label">Name</span>
                  <span className="m-val">{selectedEnquiry.name}</span>
                </div>
                <div className="modal-info-item">
                  <span className="m-label">User Type</span>
                  <span className={`user-badge badge-${selectedEnquiry.userType.toLowerCase()}`}>
                    {selectedEnquiry.userType}
                  </span>
                </div>
                <div className="modal-info-item">
                  <span className="m-label">Email</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="m-val m-link">
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div className="modal-info-item">
                  <span className="m-label">Phone</span>
                  <a href={`tel:${selectedEnquiry.phone}`} className="m-val m-link">
                    {selectedEnquiry.phone}
                  </a>
                </div>
                <div className="modal-info-item full-width">
                  <span className="m-label">Service / Course Interest</span>
                  <span className="m-val font-semibold">{selectedEnquiry.interest}</span>
                </div>
                <div className="modal-info-item">
                  <span className="m-label">Current Status</span>
                  <select
                    className={`status-dropdown ${getStatusBadgeClass(selectedEnquiry.status)}`}
                    value={selectedEnquiry.status}
                    onChange={(e) =>
                      handleStatusChange(selectedEnquiry.id, e.target.value as EnquiryStatus)
                    }
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div className="modal-info-item">
                  <span className="m-label"><Calendar size={14} /> Created At</span>
                  <span className="m-val text-muted">
                    {new Date(selectedEnquiry.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="modal-message-box">
                <span className="m-label">Message / Details</span>
                <p className="modal-message-text">{selectedEnquiry.message}</p>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setSelectedEnquiry(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {enquiryToDelete && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card modal-confirm">
            <div className="modal-header">
              <div className="modal-title-box text-danger">
                <AlertTriangle size={22} />
                <h3>Confirm Deletion</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setEnquiryToDelete(null)}
                disabled={isDeleting}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <p className="confirm-text">
                Are you sure you want to delete enquiry <strong>#{enquiryToDelete.id}</strong> from <strong>{enquiryToDelete.name}</strong>?
              </p>
              <p className="confirm-subtext">This action cannot be undone.</p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setEnquiryToDelete(null)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? <Loader2 size={16} className="spinner" /> : <Trash2 size={16} />}
                <span>Delete Enquiry</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminDashboard;
