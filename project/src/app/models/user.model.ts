export interface User {
  id: number;
  firstname: string;
  name: string;
  email: string;
  role: 'consultant' | 'mentor' | 'admin';
  email_verified_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface RegisterRequest {
  firstname: string;
  name: string;
  email: string;
  password: string;
  role?: 'consultant' | 'mentor' | 'admin';
}
export interface Mission {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'in-progress' | 'completed';
  userId: number;
  rate: number;
}

export interface TimeSheet {
  id: number;
  userId: number;
  missionId: number;
  date: Date;
  hours: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Invoice {
  id: number;
  userId: number;
  missionId: number;
  amount: number;
  status: 'pending' | 'paid';
  dueDate: Date;
  createdAt: Date;
}