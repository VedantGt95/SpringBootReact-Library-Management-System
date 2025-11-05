import React from 'react'

export default function StudentsList({ students = [], onDelete }) {
  return (
    <div className="space-y-3">
      {students.length === 0 && (
        <div className="card p-4 rounded-lg text-white/60">No students found.</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map(student => (
          <div key={student.id} className="card p-4 rounded-xl border border-white/6 hover:shadow-2xl transform hover:-translate-y-1 transition">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{student.name}</h3>
                <p className="text-sm text-white/60">{student.course}</p>
                <p className="text-sm text-white/60">{student.email}</p>
              </div>

              <div className="text-right">
                <div className="text-xs text-white/60">ID: {student.id}</div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  if (!window.confirm(`Delete student "${student.name}"?`)) return
                  onDelete && onDelete(student.id)
                }}
                className="px-3 py-1 rounded-md bg-red-600 text-white text-sm hover:brightness-105 transition"
              >
                Delete
              </button>

              <div className="text-xs text-white/60">Registered</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
