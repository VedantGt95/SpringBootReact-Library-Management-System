import React, { useState } from 'react'



export default function AddBookForm({ onAdd }) {
  const [bookName, setBookName] = useState('')
  const [author, setAuthor] = useState('')
  const [price, setPrice] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!bookName.trim() || !author.trim() || price === '') {
      return alert('Please fill all fields')
    }
    const payload = { bookName: bookName.trim(), author: author.trim(), price: Number(price) }
    onAdd && onAdd(payload)
    setBookName(''); setAuthor(''); setPrice('')
  }

  return (
    <form onSubmit={submit} className="card p-4 rounded-xl shadow-lg border border-white/6 glass-animation">
      <h4 className="text-lg font-semibold mb-3">Add New Book</h4>

      <input
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
        placeholder="Book title"
        className="w-full mb-2 p-2 rounded-md bg-transparent border border-white/6 focus:ring-2 focus:ring-accent outline-none"
      />

      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        className="w-full mb-2 p-2 rounded-md bg-transparent border border-white/6 focus:ring-2 focus:ring-accent outline-none"
      />

      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price (₹)"
        type="number"
        min="0"
        className="w-full mb-3 p-2 rounded-md bg-transparent border border-white/6 focus:ring-2 focus:ring-accent outline-none"
      />

      <div className="flex justify-end">
        <button
  type="submit"
  className="px-4 py-2 rounded-md bg-white text-black font-medium"
>
  Add Book
</button>

      </div>
    </form>
  )
}
