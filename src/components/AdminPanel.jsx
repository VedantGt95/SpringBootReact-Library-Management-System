import React, { useEffect, useState } from 'react'
import api from '../api'
import AddBookForm from './AddBookForm'
import AddStudentForm from './AddStudentForm'
import BooksList from './BookList'
import StudentsList from './StudentList'

export default function AdminPanel() {
  const [active, setActive] = useState('books') 
  const [books, setBooks] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    try {
      setLoading(true)
      const [bRes, sRes] = await Promise.all([api.get('/book/all'), api.get('/student/all')])
      setBooks(Array.isArray(bRes.data) ? bRes.data : [])
      setStudents(Array.isArray(sRes.data) ? sRes.data : [])
    } catch (err) {
      console.error('fetchAll:', err)
      alert('Failed to load data from server')
    } finally {
      setLoading(false)
    }
  }


  const handleAddBook = async (bookPayload) => {
    try {
      const res = await api.post('/book/add', bookPayload)
      setBooks(prev => [...prev, res.data])
      alert('Book added')
    } catch (err) {
      console.error('addBook:', err)
      alert('Failed to add book')
    }
  }

  const handleDeleteBook = async (id) => {
    if (!window.confirm('Delete this book?')) return
    try {
      await api.delete(`/book/delete/${id}`)
      setBooks(prev => prev.filter(b => b.id !== id))
    } catch (err) {
      console.error('deleteBook:', err)
      alert('Failed to delete book')
    }
  }

  const handleAddStudent = async (studentPayload) => {
    try {
      const res = await api.post('/student/add', studentPayload)
      setStudents(prev => [...prev, res.data])
      alert('Student added')
    } catch (err) {
      console.error('addStudent:', err)
      alert('Failed to add student')
    }
  }

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Delete this student?')) return
    try {
      await api.delete(`/student/delete/${id}`)
      setStudents(prev => prev.filter(s => s.id !== id))
    } catch (err) {
      console.error('deleteStudent:', err)
      alert('Failed to delete student')
    }
  }

  const SidebarItem = ({ id, label, onClick, icon }) => (
   <button
  onClick={() => onClick(id)}
  className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 bg-white text-black shadow-sm"
>
  <span className="text-sm">{icon}</span>
  <span className="font-medium">{label}</span>
</button>

  )

  return (
    <div className="flex gap-6">
     
      <aside className="w-64 card p-4 rounded-2xl border border-white/6 backdrop-blur-md shadow-lg">
        <div className="mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-violet flex items-center justify-center font-bold text-black">L</div>
          <h3 className="mt-3 text-lg font-semibold">Admin Panel</h3>
          <p className="text-xs text-white/60">Manage books & students</p>
        </div>

        <nav className="flex flex-col gap-2">
          <SidebarItem id="dashboard" label="Dashboard" activeKey={active} onClick={setActive} icon="🏠" />
          <SidebarItem id="books" label="Books" activeKey={active} onClick={setActive} icon="📚" />
          <SidebarItem id="students" label="Students" activeKey={active} onClick={setActive} icon="🎓" />
          <button
            onClick={fetchAll}
            className="mt-4 px-4 py-2 rounded-md bg-transparent hover:bg-white/3 text-sm"
          >
            🔄 Refresh Data
          </button>
        </nav>

        <div className="mt-6 text-xs text-white/60">
          <div className="mb-2">Quick Stats</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span>Books</span>
              <span className="font-semibold">{books.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Students</span>
              <span className="font-semibold">{students.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Loading</span>
              <span>{loading ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <section className="flex-1">
        {active === 'dashboard' && (
          <div className="card p-6 rounded-2xl border border-white/6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
            <p className="text-white/60 mb-4">Overview of the library</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg card">
                <div className="text-sm text-white/60">Total Books</div>
                <div className="text-2xl font-bold">{books.length}</div>
              </div>
              <div className="p-4 rounded-lg card">
                <div className="text-sm text-white/60">Total Students</div>
                <div className="text-2xl font-bold">{students.length}</div>
              </div>
              <div className="p-4 rounded-lg card">
                <div className="text-sm text-white/60">Available Books</div>
                <div className="text-2xl font-bold">{books.filter(b => b.available).length}</div>
              </div>
            </div>
          </div>
        )}

        {active === 'books' && (
          <div className="space-y-6">
            <div className="card p-4 rounded-2xl border border-white/6 shadow-lg">
              <AddBookForm onAdd={handleAddBook} />
            </div>

            <div className="card p-4 rounded-2xl border border-white/6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Books</h3>
              <BooksList books={books} onDelete={handleDeleteBook} />
            </div>
          </div>
        )}

        {active === 'students' && (
          <div className="space-y-6">
            <div className="card p-4 rounded-2xl border border-white/6 shadow-lg">
              <AddStudentForm onAdd={handleAddStudent} />
            </div>

            <div className="card p-4 rounded-2xl border border-white/6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Students</h3>
              <StudentsList students={students} onDelete={handleDeleteStudent} />
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
