import React from 'react';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    userEmail: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, userEmail }) => {
    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'employees', label: 'Employees', icon: '👥' },
        { id: 'leaves', label: 'Leave Requests', icon: '📅' },
        { id: 'events', label: 'Events Organizer', icon: '🎉' },
        { id: 'meetings', label: 'Meetings', icon: '🤝' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-brand">
                    <span style={{ fontSize: '1.5rem' }}>✨</span> HRM
                </div>
            </div>

            <nav className="sidebar-nav">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                        style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', fontFamily: 'inherit', fontSize: '15px' }}
                    >
                        <span style={{ fontSize: '18px' }}>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </nav>

            <div className="user-profile">
                <div className="avatar">M</div>
                <div className="user-info">
                    <span className="user-name">Muthurajan Ganesan</span>
                    <span className="user-email" title={userEmail}>{userEmail}</span>
                </div>
            </div>
        </aside>
    );
};
