
export enum ComplaintStatus {
  RECEIVED = 'Received',
  ASSIGNED = 'Assigned to Department',
  IN_PROGRESS = 'In Progress',
  RESOLVED = 'Resolved'
}

export interface Complaint {
  id: string;
  type: string;
  description: string;
  location: string;
  timestamp: Date;
  status: ComplaintStatus;
  photoUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export type Screen = 'LOGIN' | 'HOME' | 'RAISE_COMPLAINT' | 'STATUS_TRACKING';
