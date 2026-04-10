import React, { useState } from 'react'
import Header from '../components/Header'
import { supabase } from '../lib/supabase'
import styles from './NewReportView.module.css'
import { ReportStatus } from '../types'

interface Props {
  onBack: () => void
  onSaved: () => void
}

export default function NewReportView({ onBack, onSaved }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [status, setStatus] = useState<ReportStatus>('draft')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) {
      setError('Title is required.')
      return
    }
    setSaving(true)
    setError(null)

    const { error: insertError } = await supabase.from('reports').insert({
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      status,
    })

    setSaving(false)
    if (insertError) {
      setError('Failed to save report. Please try again.')
      return
    }
    onSaved()
  }

  return (
    <div className={styles.root}>
      <Header title="New Report" onBack={onBack} />
      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="title">Title <span className={styles.required}>*</span></label>
            <input
              id="title"
              className={styles.input}
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter report title"
              maxLength={120}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="location">Location</label>
            <input
              id="location"
              className={styles.input}
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="e.g. Site A, Building 3"
              maxLength={120}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="status">Status</label>
            <select
              id="status"
              className={styles.select}
              value={status}
              onChange={e => setStatus(e.target.value as ReportStatus)}
            >
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="description">Description</label>
            <textarea
              id="description"
              className={styles.textarea}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe the field report..."
              rows={6}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Report'}
          </button>
        </form>
      </main>
    </div>
  )
}
