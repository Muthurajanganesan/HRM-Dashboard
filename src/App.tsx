import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Employees } from './components/Employees';
import { LeaveRequests } from './components/LeaveRequests';
import { Events } from './components/Events';
import { Meetings } from './components/Meetings';
import type { Employee, LeaveRequest, Event, Meeting } from './types';
import './App.css';

// Initial Mock Data
const initialEmployees: Employee[] = [
  { id: '1', name: 'John Doe', role: 'Software Engineer', department: 'Engineering', email: 'john@company.com', mobile: '+1 234 567 8900' },
  { id: '2', name: 'Jane Smith', role: 'HR Manager', department: 'HR', email: 'jane@company.com', mobile: '+1 987 654 3210' },
  { id: '3', name: 'Alice Johnson', role: 'Product Designer', department: 'Design', email: 'alice@company.com', mobile: '+1 555 123 4567' }
];

const initialLeaves: LeaveRequest[] = [
  { id: '1', employeeName: 'John Doe', type: 'Sick', startDate: '2026-03-05', endDate: '2026-03-06', reason: 'Flu symptoms', status: 'Pending' },
  { id: '2', employeeName: 'Alice Johnson', type: 'Earned', startDate: '2026-04-10', endDate: '2026-04-15', reason: 'Family vacation', status: 'Approved' }
];

const initialEvents: Event[] = [
  { id: '1', title: 'Annual Company Retreat', organizer: 'HR Team', date: '2026-04-15', time: '09:00', location: 'Mountain Resort', description: '3-day team building activities.' }
];

const initialMeetings: Meeting[] = [
  { id: '1', title: 'Weekly Sync', host: 'Jane Smith', date: '2026-03-02', time: '10:00', participants: 'Engineering Team', platform: 'Google Meet' }
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const userEmail = "2k22cse099@kiot.ac.in"; // Requested email

  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [leaves, setLeaves] = useState<LeaveRequest[]>(initialLeaves);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);

  const renderContent = () => {
    switch (activeTab) {
      case 'employees':
        return <Employees employees={employees} setEmployees={setEmployees} />;
      case 'leaves':
        return <LeaveRequests leaves={leaves} setLeaves={setLeaves} />;
      case 'events':
        return <Events events={events} setEvents={setEvents} />;
      case 'meetings':
        return <Meetings meetings={meetings} setMeetings={setMeetings} />;
      case 'dashboard':
      default:
        return (
          <div className="animate-fade">
            <div className="page-header">
              <div>
                <h1 className="page-title">Welcome back!</h1>
                <p className="page-subtitle">Here is a summary of your workspace today.</p>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="glass-panel stat-card">
                <div className="stat-icon primary">👥</div>
                <div className="stat-info">
                  <h3>{employees.length}</h3>
                  <p>Total Employees</p>
                </div>
              </div>
              <div className="glass-panel stat-card">
                <div className="stat-icon warning">📅</div>
                <div className="stat-info">
                  <h3>{leaves.filter(l => l.status === 'Pending').length}</h3>
                  <p>Pending Leaves</p>
                </div>
              </div>
              <div className="glass-panel stat-card">
                <div className="stat-icon success">🎉</div>
                <div className="stat-info">
                  <h3>{events.length}</h3>
                  <p>Upcoming Events</p>
                </div>
              </div>
            </div>

            <div className="glass-panel content-section" style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                ✨ Dashboard Overview
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '15px' }}>
                Welcome to the next-generation HRM Dashboard. Use the navigation panel on the left to manage
                your employee directory, review leave requests with email/mobile confirmations,
                organize cross-functional company events, and effortlessly schedule collaborative team meetings.
              </p>
              <button className="custom-btn btn-primary" style={{ marginTop: '24px', padding: '12px 24px', fontSize: '15px' }} onClick={() => setActiveTab('employees')}>
                Explore Directory →
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userEmail={userEmail} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
