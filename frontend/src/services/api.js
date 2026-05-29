const API_BASE = import.meta.env.VITE_API_URL || ''

export async function getCoaching(payload) {
  const res = await fetch(`${API_BASE}/api/negotiate/coach`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `Request failed: ${res.status}`)
  }

  return res.json()
}
