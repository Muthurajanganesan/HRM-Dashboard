export interface Employee {
    id: string;
    name: string;
    role: string;
    department: string;
    email: string;
    mobile: string;
}

export interface LeaveRequest {
    id: string;
    employeeName: string;
    type: string; /* Sick, Casual, Earned */
    startDate: string;
    endDate: string;
    reason: string;
    status: 'Pending' | 'Approved' | 'Denied';
}

export interface Event {
    id: string;
    title: string;
    organizer: string;
    date: string;
    time: string;
    location: string;
    description: string;
}

export interface Meeting {
    id: string;
    title: string;
    host: string;
    date: string;
    time: string;
    participants: string;
    platform: string;
}
