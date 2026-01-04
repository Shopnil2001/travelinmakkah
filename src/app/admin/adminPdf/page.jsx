'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit3, Upload, Loader2, X, FileText, File, Check, AlertCircle } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '../../../../Provider/AuthProvider';
import LoadingSpinner from '../../../../components/Loading';
import PrivateRoute from '../../../../components/PrivateRoute';
import AdminSidebar from '../../../../components/AdminSidebar';
import '../admin.css';

// PDF sections configuration
const PDF_SECTIONS = [
  {
    key: 'HAJJ_GUIDE',
    label: 'Hajj Guide PDF',
    description: 'Displayed at the bottom of the Hajj Guide page',
    color: '#64B5F6'
  },
  {
    key: 'UMRAH_GUIDE',
    label: 'Umrah Guide PDF',
    description: 'Displayed at the bottom of the Umrah Guide page',
    color: '#D4A84B'
  },
  {
    key: 'GENERAL_PDF',
    label: 'Guideline Book PDFs',
    description: 'Displayed on the Complete Guideline Book page (supports multiple PDFs)',
    color: '#C9A962',
    multiple: true
  }
];

// Maximum file size in MB (configurable)
const MAX_FILE_SIZE_MB = 50;

const AdminPdfPage = () => {
  const { user } = useAuth();
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state for each section
  const [uploadingSection, setUploadingSection] = useState(null);
  const [formData, setFormData] = useState({
    section: '',
    title: '',
    description: '',
    file: null
  });

  // Edit mode state
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: ''
  });

  // Load all PDFs
  useEffect(() => {
    if (!user) return;
    loadPdfs();
  }, [user]);

  const loadPdfs = async () => {
    try {
      const res = await api.get('/pdfs');
      setPdfs(res.data);
    } catch (err) {
      setError('Failed to load PDFs');
    } finally {
      setLoading(false);
    }
  };

  // Get PDF for a specific section
  const getPdfForSection = (sectionKey) => {
    if (sectionKey === 'GENERAL_PDF') {
      return pdfs.filter(p => p.section === 'GENERAL_PDF');
    }
    return pdfs.find(p => p.section === sectionKey);
  };

  // Handle file selection
  const handleFileSelect = (e, sectionKey) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed');
      return;
    }

    // Validate file size
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_FILE_SIZE_MB) {
      setError(`File too large. Maximum size is ${MAX_FILE_SIZE_MB}MB`);
      return;
    }

    setFormData({
      section: sectionKey,
      title: '',
      description: '',
      file
    });
    setUploadingSection(sectionKey);
    setError('');
  };

  // Handle PDF upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!formData.file || !formData.title.trim()) {
      setError('Please select a file and enter a title');
      return;
    }

    setError('');
    const submitData = new FormData();
    submitData.append('pdf', formData.file);
    submitData.append('section', formData.section);
    submitData.append('title', formData.title.trim());
    submitData.append('description', formData.description.trim());

    try {
      await api.post('/pdfs/upload', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess('PDF uploaded successfully!');
      setTimeout(() => setSuccess(''), 3000);

      // Reset form
      setFormData({ section: '', title: '', description: '', file: null });
      setUploadingSection(null);

      // Reload PDFs
      await loadPdfs();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload PDF');
    }
  };

  // Handle edit
  const handleEdit = (pdf) => {
    setEditingId(pdf._id);
    setEditFormData({
      title: pdf.title || '',
      description: pdf.description || ''
    });
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editFormData.title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      await api.put(`/pdfs/${editingId}`, editFormData);
      setSuccess('PDF updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
      setEditingId(null);
      await loadPdfs();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update PDF');
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this PDF?')) return;

    try {
      await api.delete(`/pdfs/${id}`);
      setSuccess('PDF deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
      await loadPdfs();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete PDF');
    }
  };

  // Cancel upload
  const cancelUpload = () => {
    setFormData({ section: '', title: '', description: '', file: null });
    setUploadingSection(null);
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    const mb = bytes / (1024 * 1024);
    return mb >= 1 ? `${mb.toFixed(2)} MB` : `${(bytes / 1024).toFixed(2)} KB`;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <PrivateRoute adminOnly>
      <div className="admin-layout">
        <AdminSidebar />

        <main className="admin-content">
          <div className="admin-content-wrapper">
            {/* Header */}
            <header className="admin-page-header admin-animate-in">
              <h1 className="admin-page-title">PDF Manager</h1>
              <p className="admin-page-subtitle">
                Upload and manage PDF guides for Hajj, Umrah, and general resources
              </p>
            </header>

            {/* Alerts */}
            {error && (
              <div className="admin-alert admin-alert-error admin-animate-in">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
                <button className="admin-alert-close" onClick={() => setError('')}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {success && (
              <div className="admin-alert admin-alert-success admin-animate-in">
                <Check className="w-5 h-5" />
                <span>{success}</span>
              </div>
            )}

            {/* PDF Sections */}
            <div className="space-y-8">
              {PDF_SECTIONS.map((section, idx) => {
                const existingPdf = getPdfForSection(section.key);
                const isMultiple = section.multiple;
                const existingPdfs = isMultiple ? existingPdf : (existingPdf ? [existingPdf] : []);
                const isUploading = uploadingSection === section.key;

                return (
                  <div
                    key={section.key}
                    className={`admin-card admin-animate-in admin-animate-delay-${idx + 1}`}
                    style={{ borderLeft: `4px solid ${section.color}` }}
                  >
                    <div className="admin-card-header">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${section.color}20` }}
                        >
                          <FileText className="w-5 h-5" style={{ color: section.color }} />
                        </div>
                        <div>
                          <h2 className="admin-card-title">{section.label}</h2>
                          <p className="text-sm text-[#6B7280]">{section.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="admin-card-body">
                      {/* Existing PDFs */}
                      {existingPdfs.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-[#2D3339] mb-3">
                            {isMultiple ? 'Uploaded PDFs' : 'Current PDF'}
                          </h4>
                          <div className="space-y-3">
                            {existingPdfs.map((pdf) => (
                              <div
                                key={pdf._id}
                                className="flex items-start gap-4 p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E3DA]"
                              >
                                <div
                                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: `${section.color}15` }}
                                >
                                  <File className="w-6 h-6" style={{ color: section.color }} />
                                </div>

                                {editingId === pdf._id ? (
                                  // Edit Mode
                                  <form onSubmit={handleUpdate} className="flex-1 space-y-3">
                                    <input
                                      type="text"
                                      className="admin-input"
                                      placeholder="PDF Title"
                                      value={editFormData.title}
                                      onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                                      required
                                    />
                                    <textarea
                                      className="admin-input"
                                      placeholder="Short description (optional)"
                                      rows={2}
                                      value={editFormData.description}
                                      onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                                    />
                                    <div className="flex gap-2">
                                      <button type="submit" className="admin-btn admin-btn-primary">
                                        <Check className="w-4 h-4" />
                                        Save
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setEditingId(null)}
                                        className="admin-btn admin-btn-secondary"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </form>
                                ) : (
                                  // View Mode
                                  <>
                                    <div className="flex-1 min-w-0">
                                      <h5 className="font-medium text-[#2D3339] truncate">{pdf.title}</h5>
                                      {pdf.description && (
                                        <p className="text-sm text-[#6B7280] mt-1 line-clamp-2">{pdf.description}</p>
                                      )}
                                      <div className="flex flex-wrap gap-2 mt-2 text-xs text-[#9CA3AF]">
                                        <span>{pdf.originalName || 'PDF File'}</span>
                                        <span>|</span>
                                        <span>{formatFileSize(pdf.size)}</span>
                                        {pdf.updatedAt && (
                                          <>
                                            <span>|</span>
                                            <span>Updated: {new Date(pdf.updatedAt).toLocaleDateString()}</span>
                                          </>
                                        )}
                                      </div>
                                    </div>

                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => handleEdit(pdf)}
                                        className="admin-action-btn admin-action-btn-edit"
                                      >
                                        <Edit3 className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => handleDelete(pdf._id)}
                                        className="admin-action-btn admin-action-btn-delete"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Upload Form */}
                      {isUploading ? (
                        <form onSubmit={handleUpload} className="space-y-4">
                          <div className="flex items-center gap-3 p-4 bg-[#EBF4FF] rounded-xl border border-[#64B5F6]/30">
                            <File className="w-6 h-6 text-[#64B5F6]" />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-[#2D3339] truncate">{formData.file?.name}</p>
                              <p className="text-sm text-[#6B7280]">{formatFileSize(formData.file?.size)}</p>
                            </div>
                            <button
                              type="button"
                              onClick={cancelUpload}
                              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                            >
                              <X className="w-4 h-4 text-[#6B7280]" />
                            </button>
                          </div>

                          <div>
                            <label className="admin-label">PDF Title *</label>
                            <input
                              type="text"
                              className="admin-input"
                              placeholder="Enter a title for this PDF"
                              value={formData.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                              required
                            />
                          </div>

                          <div>
                            <label className="admin-label">Short Description</label>
                            <textarea
                              className="admin-input"
                              placeholder="Brief description of this PDF content (optional)"
                              rows={2}
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                          </div>

                          <div className="flex gap-3">
                            <button type="submit" className="admin-btn admin-btn-primary">
                              <Upload className="w-4 h-4" />
                              Upload PDF
                            </button>
                            <button
                              type="button"
                              onClick={cancelUpload}
                              className="admin-btn admin-btn-secondary"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div>
                          {/* Show upload option */}
                          {(isMultiple || existingPdfs.length === 0) && (
                            <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#E8E3DA] rounded-xl cursor-pointer hover:border-[#C9A962] hover:bg-[#FAF8F5] transition-all duration-300 group">
                              <div
                                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                                style={{ backgroundColor: `${section.color}15` }}
                              >
                                <Upload className="w-8 h-8" style={{ color: section.color }} />
                              </div>
                              <span className="font-medium text-[#2D3339] mb-1">
                                {isMultiple ? 'Add New PDF' : 'Upload PDF'}
                              </span>
                              <span className="text-sm text-[#6B7280]">
                                Click to browse or drag and drop (Max {MAX_FILE_SIZE_MB}MB)
                              </span>
                              <input
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                onChange={(e) => handleFileSelect(e, section.key)}
                              />
                            </label>
                          )}

                          {/* Replace existing option for single-PDF sections */}
                          {!isMultiple && existingPdfs.length > 0 && (
                            <label className="flex items-center justify-center gap-3 p-4 mt-4 border border-[#E8E3DA] rounded-xl cursor-pointer hover:border-[#C9A962] hover:bg-[#FAF8F5] transition-all duration-300">
                              <Upload className="w-5 h-5 text-[#C9A962]" />
                              <span className="font-medium text-[#2D3339]">Replace with New PDF</span>
                              <input
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                onChange={(e) => handleFileSelect(e, section.key)}
                              />
                            </label>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Info Box */}
            <div className="admin-card mt-8 admin-animate-in" style={{ borderLeft: '4px solid #6B7280' }}>
              <div className="admin-card-body">
                <h4 className="font-medium text-[#2D3339] mb-2">PDF Display Information</h4>
                <ul className="text-sm text-[#6B7280] space-y-2">
                  <li><span className="font-medium text-[#64B5F6]">Hajj Guide PDF:</span> Shows at the bottom of the Hajj Guide page, above the footer.</li>
                  <li><span className="font-medium text-[#D4A84B]">Umrah Guide PDF:</span> Shows at the bottom of the Umrah Guide page, above the footer.</li>
                  <li><span className="font-medium text-[#C9A962]">Guideline Book PDFs:</span> Shows on the dedicated Complete Guideline Book page (accessible via More menu).</li>
                  <li><strong>Page Lock:</strong> Users can only view the first 5 pages. To access more, they must contact you.</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PrivateRoute>
  );
};

export default AdminPdfPage;
