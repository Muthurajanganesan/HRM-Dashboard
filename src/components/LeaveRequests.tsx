import React, { useState } from 'react';
import type { LeaveRequest } from '../types';

interface Props {
    leaves: LeaveRequest[];
    setLeaves: React.Dispatch<React.SetStateAction<LeaveRequest[]>>;
}

export const LeaveRequests: React.FC<Props> = ({ leaves, setLeaves }) => {
    const [showRequest, setShowRequest] = useState(false);
    const [formData, setFormData] = useState<Partial<LeaveRequest>>({ type: 'Sick' });

    const handleRequest = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.employeeName || !formData.startDate || !formData.endDate) return;

        alert(`Sending request for ${formData.employeeName} via Email/Mobile integration...`);

        const newRequest: LeaveRequest = {
            id: Math.random().toString(36).substr(2, 9),
            employeeName: formData.employeeName,
            type: formData.type || 'Sick',
            startDate: formData.startDate,
            endDate: formData.endDate,
            reason: formData.reason || '',
            status: 'Pending'
        };
        setLeaves([newRequest, ...leaves]);
        setShowRequest(false);
        setFormData({ type: 'Sick' });
    };

    const updateStatus = (id: string, status: 'Approved' | 'Denied') => {
        setLeaves(leaves.map(l => l.id === id ? { ...l, status } : l));
    };

    const statusClass = (status: string) => {
        if (status === 'Approved') return 'status-approved';
        if (status === 'Denied') return 'status-denied';
        return 'status-pending';
    };

    return (
        <div className="animate-fade">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Leave Requests</h1>
                    <p className="page-subtitle">Manage employee absence and time off</p>
                </div>
                <button className="custom-btn btn-primary" onClick={() => setShowRequest(!showRequest)}>
                    {document.createElement('span').innerHTML = showRequest ? '✕ Cancel' : '✉️ Request Leave'}
                </button>
            </div>

            {showRequest && (
                <div className="glass-panel content-section">
                    <div className="section-header">
                        <h2 className="section-title">New Email / Mobile Leave Request</h2>
                    </div>
                    <form onSubmit={handleRequest}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Your Name</label>
                                <input required className="custom-input" placeholder="e.g. John Doe" value={formData.employeeName || ''} onChange={e => setFormData({ ...formData, employeeName: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Leave Type</label>
                                <select className="custom-input" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                    <option value="Sick">Sick Leave</option>
                                    <option value="Casual">Casual Leave</option>
                                    <option value="Earned">Earned Leave</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Start Date</label>
                                <input required type="date" className="custom-input" value={formData.startDate || ''} onChange={e => setFormData({ ...formData, startDate: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>End Date</label>
                                <input required type="date" className="custom-input" value={formData.endDate || ''} onChange={e => setFormData({ ...formData, endDate: e.target.value })} />
                            </div>
                            <div className="form-group full-width">
                                <label>Reason</label>
                                <input required className="custom-input" placeholder="Brief explanation..." value={formData.reason || ''} onChange={e => setFormData({ ...formData, reason: e.target.value })} />
                            </div>
                        </div>
                        <div className="actions">
                            <button type="submit" className="custom-btn btn-primary">Send Request</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="glass-panel">
                <div style={{ padding: '24px', overflowX: 'auto' }}>
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Type</th>
                                <th>Duration</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaves.length === 0 ? (
                                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>No leave requests.</td></tr>
                            ) : leaves.map(req => (
                                <tr key={req.id}>
                                    <td style={{ fontWeight: 500 }}>{req.employeeName}</td>
                                    <td>{req.type}</td>
                                    <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{req.startDate} to {req.endDate}</td>
                                    <td style={{ color: 'var(--text-muted)' }}>{req.reason}</td>
                                    <td><span className={`status-badge ${statusClass(req.status)}`}>{req.status}</span></td>
                                    <td>
                                        {req.status === 'Pending' ? (
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button className="custom-btn btn-success" style={{ padding: '6px 10px', fontSize: '12px' }} onClick={() => updateStatus(req.id, 'Approved')}>Approve</button>
                                                <button className="custom-btn btn-danger" style={{ padding: '6px 10px', fontSize: '12px' }} onClick={() => updateStatus(req.id, 'Denied')}>Deny</button>
                                            </div>
                                        ) : '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
