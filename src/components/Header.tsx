import React from 'react'
import styles from './Header.module.css'

interface HeaderProps {
  title: string
  onBack?: () => void
  action?: React.ReactNode
}

export default function Header({ title, onBack, action }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {onBack && (
          <button className={styles.backBtn} onClick={onBack} aria-label="Go back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        <h1 className={styles.title}>{title}</h1>
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </header>
  )
}
