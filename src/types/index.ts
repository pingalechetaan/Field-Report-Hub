export interface Report {
  id: string
  title: string
  description: string
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
  location: string
  created_at: string
  updated_at: string
  user_id: string
}

export type ReportStatus = Report['status']
