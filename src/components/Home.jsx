import React, { useEffect, useState } from 'react'
import api from '../api'
import BooksList from './BookList'

export default function Home() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const res = await api.get('/book/all')
     
      const all = Array.isArray(res.data) ? res.data : []
      setBooks(all)
    } catch (err) {
      console.error('fetchBooks:', err)
      alert('Failed to load books')
    } finally {
      setLoading(false)
    }
  }

  const filtered = books
    .filter(b => b.available) 
    .filter(b => b.bookName?.toLowerCase().includes(query.toLowerCase()) || b.author?.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Available Books</h2>
          <p className="text-sm text-white/60">Browse currently available books in the library</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by title or author..."
            className="p-2 rounded-md bg-transparent border border-white/6 outline-none focus:ring-2 focus:ring-accent"
          />
          <button onClick={fetchBooks} className="px-3 py-2 rounded-md bg-accent text-black">Refresh</button>
        </div>
      </header>

      {loading ? (
        <div className="text-white/60">Loading...</div>
      ) : (
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="card p-4 rounded-lg text-white/60">No available books match your search.</div>
          ) : (
            <BooksList books={filtered} onDelete={() => {}} />
           
          )}
        </div>
      )}
    </div>
  )
}
