import React, { useState } from 'react'
import ReportListView from './views/ReportListView'
import NewReportView from './views/NewReportView'
import ReportDetailView from './views/ReportDetailView'
import { Report } from './types'

type View = 'list' | 'new' | 'detail'

export default function App() {
  const [view, setView] = useState<View>('list')
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [listKey, setListKey] = useState(0)

  function handleViewReport(report: Report) {
    setSelectedReport(report)
    setView('detail')
  }

  function handleSaved() {
    setListKey(k => k + 1)
    setView('list')
  }

  if (view === 'new') {
    return <NewReportView onBack={() => setView('list')} onSaved={handleSaved} />
  }

  if (view === 'detail' && selectedReport) {
    return <ReportDetailView report={selectedReport} onBack={() => setView('list')} />
  }

  return (
    <ReportListView
      key={listKey}
      onNewReport={() => setView('new')}
      onViewReport={handleViewReport}
    />
  )
}
