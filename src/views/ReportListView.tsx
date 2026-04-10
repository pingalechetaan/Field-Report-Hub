import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ReportCard from '../components/ReportCard'
import { Report } from '../types'
import { supabase } from '../lib/supabase'
import styles from './ReportListView.module.css'

interface Props {
  onNewReport: () => void
  onViewReport: (report: Report) => void
}

export default function ReportListView({ onNewReport, onViewReport }: Props) {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchReports()
  }, [])

  async function fetchReports() {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError('Failed to load reports. Please try again.')
      setReports([])
    } else {
      setReports(data || [])
    }
    setLoading(false)
  }

  const addBtn = (
    <button className={styles.addBtn} onClick={onNewReport} aria-label="New report">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>
  )

  return (
    <div className={styles.root}>
      <Header title="Field Report Hub" action={addBtn} />
      <main className={styles.main}>
        {loading ? (
          <div className={styles.centered}>
            <div className={styles.spinner} />
            <p className={styles.hint}>Loading reports...</p>
          </div>
        ) : error ? (
          <div className={styles.centered}>
            <p className={styles.errorText}>{error}</p>
            <button className={styles.retryBtn} onClick={fetchReports}>Retry</button>
          </div>
        ) : reports.length === 0 ? (
          <div className={styles.centered}>
            <div className={styles.emptyIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </div>
            <p className={styles.emptyTitle}>No reports yet</p>
            <p className={styles.hint}>Tap the + button to create your first report</p>
            <button className={styles.createBtn} onClick={onNewReport}>Create Report</button>
          </div>
        ) : (
          <div className={styles.list}>
            {reports.map(report => (
              <ReportCard
                key={report.id}
                report={report}
                onClick={() => onViewReport(report)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
