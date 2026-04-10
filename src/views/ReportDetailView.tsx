import React from 'react'
import Header from '../components/Header'
import StatusBadge from '../components/StatusBadge'
import { Report } from '../types'
import styles from './ReportDetailView.module.css'

interface Props {
  report: Report
  onBack: () => void
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })
}

export default function ReportDetailView({ report, onBack }: Props) {
  return (
    <div className={styles.root}>
      <Header title="Report Details" onBack={onBack} />
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.topRow}>
            <h2 className={styles.title}>{report.title}</h2>
            <StatusBadge status={report.status} />
          </div>

          {report.location && (
            <div className={styles.row}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className={styles.rowText}>{report.location}</span>
            </div>
          )}

          <div className={styles.row}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className={styles.rowText}>{formatDate(report.created_at)}</span>
          </div>

          <div className={styles.divider} />

          <div className={styles.section}>
            <h3 className={styles.sectionLabel}>Description</h3>
            {report.description ? (
              <p className={styles.description}>{report.description}</p>
            ) : (
              <p className={styles.empty}>No description provided.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
