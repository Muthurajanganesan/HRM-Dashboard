import React, { useState } from 'react';
import type { Event } from '../types';

interface Props {
    events: Event[];
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

export const Events: React.FC<Props> = ({ events, setEvents }) => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<Partial<Event>>({});

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.date || !formData.time) return;

        alert(`Sending event invitations for ${formData.title} via Email/Mobile integration...`);

        const newEvent: Event = {
            id: Math.random().toString(36).substr(2, 9),
            title: formData.title,
            organizer: formData.organizer || 'Admin',
            date: formData.date,
            time: formData.time,
            location: formData.location || 'TBD',
            description: formData.description || ''
        };
        setEvents([...events, newEvent]);
        setShowForm(false);
        setFormData({});
    };

    return (
        <div className="animate-fade">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Event Organizer</h1>
                    <p className="page-subtitle">Schedule and manage company events or outings</p>
                </div>
                <button className="custom-btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? '✕ Cancel' : '🎪 Create Event'}
                </button>
            </div>

            {showForm && (
                <div className="glass-panel content-section">
                    <div className="section-header">
                        <h2 className="section-title">New Event Request</h2>
                    </div>
                    <form onSubmit={handleCreate}>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>Event Title</label>
                                <input required className="custom-input" placeholder="e.g. Annual Team Lunch" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} />
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
                                <label>Organizer Name</label>
                                <input required className="custom-input" placeholder="e.g. HR Department" value={formData.organizer || ''} onChange={e => setFormData({ ...formData, organizer: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input required className="custom-input" placeholder="e.g. Cafe XYZ" value={formData.location || ''} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                            </div>
                            <div className="form-group full-width">
                                <label>Description (Optional)</label>
                                <input className="custom-input" placeholder="Additional details..." value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                        </div>
                        <div className="actions">
                            <button type="submit" className="custom-btn btn-success">Save & Invite</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="dashboard-grid">
                {events.length === 0 ? (
                    <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1' }}>
                        No events organized yet. Schedule one above!
                    </div>
                ) : events.map(ev => (
                    <div key={ev.id} className="glass-panel stat-card" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '24px' }}>
                        <h3 style={{ margin: '0 0 12px', fontSize: '20px' }}>{ev.title}</h3>
                        <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span>📅 {ev.date}</span>
                            <span>⏰ {ev.time}</span>
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>
                            📍 {ev.location}
                        </div>
                        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-color)', width: '100%', fontSize: '13px' }}>
                            Organized by <strong>{ev.organizer}</strong>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
