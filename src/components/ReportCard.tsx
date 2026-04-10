import React from 'react'
import styles from './ReportCard.module.css'
import StatusBadge from './StatusBadge'
import { Report } from '../types'

interface ReportCardProps {
  report: Report
  onClick: () => void
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function ReportCard({ report, onClick }: ReportCardProps) {
  return (
    <button className={styles.card} onClick={onClick}>
      <div className={styles.top}>
        <span className={styles.title}>{report.title}</span>
        <StatusBadge status={report.status} />
      </div>
      <p className={styles.description}>{report.description}</p>
      <div className={styles.meta}>
        {report.location && (
          <span className={styles.location}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {report.location}
          </span>
        )}
        <span className={styles.date}>{formatDate(report.created_at)}</span>
      </div>
    </button>
  )
}
