'use client'

export default function ExportButton() {
  async function handleExport() {
    const res = await fetch('/api/export')
    if (!res.ok) {
      const err = await res.json()
      alert(`Export failed: ${err.error}`)
      return
    }
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `storyblok-export-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleExport}
      style={{
        fontSize: '0.8rem',
        fontWeight: 600,
        color: '#00b3b0',
        background: '#00b3b010',
        border: '1px solid #00b3b040',
        borderRadius: 6,
        padding: '6px 14px',
        cursor: 'pointer',
        letterSpacing: '0.02em',
      }}
    >
      Export JSON
    </button>
  )
}
