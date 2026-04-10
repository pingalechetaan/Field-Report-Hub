import React from 'react'
import styles from './StatusBadge.module.css'
import { ReportStatus } from '../types'

interface StatusBadgeProps {
  status: ReportStatus
}

const labels: Record<ReportStatus, string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  approved: 'Approved',
  rejected: 'Rejected',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}
