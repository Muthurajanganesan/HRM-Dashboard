import React, { useState } from 'react';
import type { Meeting } from '../types';

interface Props {
    meetings: Meeting[];
    setMeetings: React.Dispatch<React.SetStateAction<Meeting[]>>;
}

export const Meetings: React.FC<Props> = ({ meetings, setMeetings }) => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<Partial<Meeting>>({});

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.date || !formData.time) return;

        // Simulating sending via email or mobile as requested
        alert(`Sending meeting invites for ${formData.title} to participants via Email/Mobile integration...`);

        const newMeeting: Meeting = {
            id: Math.random().toString(36).substr(2, 9),
            title: formData.title,
            host: formData.host || 'You',
            date: formData.date,
            time: formData.time,
            participants: formData.participants || 'Team',
            platform: formData.platform || 'Google Meet'
        };
        setMeetings([...meetings, newMeeting]);
        setShowForm(false);
        setFormData({});
    };

    return (
        <div className="animate-fade">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Meetings Schedule</h1>
                    <p className="page-subtitle">Collaborate and discuss with your team</p>
                </div>
                <button className="custom-btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    {document.createElement('span').innerHTML = showForm ? '✕ Cancel' : '📹 Schedule Meeting'}
                </button>
            </div>

            {showForm && (
                <div className="glass-panel content-section">
                    <div className="section-header">
                        <h2 className="section-title">Schedule New Meeting</h2>
                    </div>
                    <form onSubmit={handleCreate}>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>Meeting Title</label>
                                <input required className="custom-input" placeholder="e.g. Monthly Sync" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Date</label>
                                <input required type="date" className="custom-input" value={formData.date || ''} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Time</label>
                                <input required type="time" className="custom-input" value={formData.time || ''} onChange={e => setFormData({ ...formData, time: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Platform / Location</label>
                                <select required className="custom-input" value={formData.platform || 'Google Meet'} onChange={e => setFormData({ ...formData, platform: e.target.value })}>
                                    <option value="Google Meet">Google Meet</option>
                                    <option value="Zoom">Zoom</option>
                                    <option value="Microsoft Teams">Microsoft Teams</option>
                                    <option value="Conference Room A">Conference Room A</option>
                                    <option value="Conference Room B">Conference Room B</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Participants</label>
                                <input required className="custom-input" placeholder="e.g. Dev Team, @john" value={formData.participants || ''} onChange={e => setFormData({ ...formData, participants: e.target.value })} />
                            </div>
                        </div>
                        <div className="actions">
                            <button type="submit" className="custom-btn btn-primary">Schedule Now</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="glass-panel">
                <div style={{ padding: '24px', overflowX: 'auto' }}>
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Title & Platform</th>
                                <th>Date & Time</th>
                                <th>Host</th>
                                <th>Participants</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {meetings.length === 0 ? (
                                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>No upcoming meetings.</td></tr>
                            ) : meetings.map(mtg => (
                                <tr key={mtg.id}>
                                    <td>
                                        <div style={{ fontWeight: 500, fontSize: '16px' }}>{mtg.title}</div>
                                        <div style={{ color: 'var(--primary-color)', fontSize: '12px', marginTop: '4px' }}>{mtg.platform}</div>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 500 }}>{mtg.date}</div>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{mtg.time}</div>
                                    </td>
                                    <td>{mtg.host}</td>
                                    <td>{mtg.participants}</td>
                                    <td>
                                        <button className="custom-btn btn-outline" style={{ padding: '6px 12px' }}>Join</button>
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
