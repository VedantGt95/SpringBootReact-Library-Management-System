import React, { useState } from 'react'

export default function AddStudentForm({ onAdd }) {
  const [name, setName] = useState('')
  const [course, setCourse] = useState('')
  const [email, setEmail] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim() || !course.trim() || !email.trim()) {
      return alert('Please fill all fields')
    }
    const payload = { name: name.trim(), course: course.trim(), email: email.trim() }
    onAdd && onAdd(payload)
    setName(''); setCourse(''); setEmail('')
  }

  return (
    <form onSubmit={submit} className="card p-4 rounded-xl shadow-lg border border-white/6 glass-animation">
      <h4 className="text-lg font-semibold mb-3">Add New Student</h4>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Student name"
        className="w-full mb-2 p-2 rounded-md bg-transparent border border-white/6 focus:ring-2 focus:ring-accent outline-none"
      />

      <input
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        placeholder="Course"
        className="w-full mb-2 p-2 rounded-md bg-transparent border border-white/6 focus:ring-2 focus:ring-accent outline-none"
      />

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        className="w-full mb-3 p-2 rounded-md bg-transparent border border-white/6 focus:ring-2 focus:ring-accent outline-none"
      />

      <div className="flex justify-end">
       <button
  type="submit"
  className="px-4 py-2 rounded-md bg-white text-black font-medium shadow-sm"
>
  Add Student
</button>

      </div>
    </form>
  )
}
