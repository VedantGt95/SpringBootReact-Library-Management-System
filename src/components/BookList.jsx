import React from 'react'

export default function BooksList({ books = [], onDelete }) {
  return (
    <div className="space-y-3">
      {books.length === 0 && (
        <div className="card p-4 rounded-lg text-white/60">No books available.</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map(book => (
          <div key={book.id} className="card p-4 rounded-xl border border-white/6 hover:shadow-2xl transform hover:-translate-y-1 transition">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{book.bookName}</h3>
                <p className="text-sm text-white/60">by {book.author}</p>
              </div>

              <div className="text-right">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${book.available ? 'bg-green-500 text-black' : 'bg-red-600 text-white'}`}>
                  {book.available ? 'Available' : 'Issued'}
                </div>
                <div className="mt-2 text-sm text-white/60">₹{book.price}</div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  if (!window.confirm(`Delete book "${book.bookName}"?`)) return
                  onDelete && onDelete(book.id)
                }}
                className="px-3 py-1 rounded-md bg-red-600 text-white text-sm hover:brightness-105 transition"
              >
                Delete
              </button>

              <div className="text-xs text-white/60">ID: {book.id}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
