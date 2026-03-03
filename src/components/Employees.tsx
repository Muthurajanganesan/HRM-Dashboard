import React, { useState } from 'react';
import type { Employee } from '../types';

interface Props {
    employees: Employee[];
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}

export const Employees: React.FC<Props> = ({ employees, setEmployees }) => {
    const [showAdd, setShowAdd] = useState(false);
    const [formData, setFormData] = useState<Partial<Employee>>({});

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email) return;
        const newEmployee: Employee = {
            id: Math.random().toString(36).substr(2, 9),
            name: formData.name,
            role: formData.role || 'Employee',
            department: formData.department || 'General',
            email: formData.email,
            mobile: formData.mobile || ''
        };
        setEmployees([...employees, newEmployee]);
        setShowAdd(false);
        setFormData({});
    };

    return (
        <div className="animate-fade">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Employees Directory</h1>
                    <p className="page-subtitle">Manage your team members and their roles</p>
                </div>
                <button className="custom-btn btn-primary" onClick={() => setShowAdd(!showAdd)}>
                    {showAdd ? '✕ Cancel' : '➕ Add Employee'}
                </button>
            </div>

            {showAdd && (
                <div className="glass-panel content-section">
                    <div className="section-header">
                        <h2 className="section-title">Add New Employee</h2>
                    </div>
                    <form onSubmit={handleAdd}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input required className="custom-input" placeholder="e.g. John Doe" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input required type="email" className="custom-input" placeholder="e.g. john@company.com" value={formData.email || ''} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Role / Designation</label>
                                <input className="custom-input" placeholder="e.g. Software Engineer" value={formData.role || ''} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Department</label>
                                <input className="custom-input" placeholder="e.g. Engineering" value={formData.department || ''} onChange={e => setFormData({ ...formData, department: e.target.value })} />
                            </div>
                            <div className="form-group full-width">
                                <label>Mobile Number</label>
                                <input className="custom-input" placeholder="e.g. +1 234 567 890" value={formData.mobile || ''} onChange={e => setFormData({ ...formData, mobile: e.target.value })} />
                            </div>
                        </div>
                        <div className="actions">
                            <button type="submit" className="custom-btn btn-success">Save Employee</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="glass-panel">
                <div style={{ padding: '24px', overflowX: 'auto' }}>
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Department</th>
                                <th>Email</th>
                                <th>Mobile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length === 0 ? (
                                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>No employees found. Add one above!</td></tr>
                            ) : employees.map(emp => (
                                <tr key={emp.id}>
                                    <td style={{ fontWeight: 500 }}>{emp.name}</td>
                                    <td>{emp.role}</td>
                                    <td><span className="status-badge" style={{ background: '#e9ecef', color: '#333', border: '1px solid #ccc' }}>{emp.department}</span></td>
                                    <td style={{ color: 'var(--text-muted)' }}>{emp.email}</td>
                                    <td style={{ color: 'var(--text-muted)' }}>{emp.mobile}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
