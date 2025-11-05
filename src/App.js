import React, { useState } from 'react'
import Home from './components/Home.jsx'
import AdminPanel from './components/AdminPanel'


export default function App() {
const [route, setRoute] = useState('home')


return (
<div className="min-h-screen text-text bg-bg">
<nav className="flex items-center justify-between px-6 py-4 border-b border-white/5">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-violet flex items-center justify-center text-black font-bold">L</div>
<div>
<h1 className="text-lg font-semibold">Library System</h1>
<p className="text-xs text-white/60">Admin & Home Dashboard</p>
</div>
</div>


<div className="flex items-center gap-4">
<button
  onClick={() => setRoute('home')}
  className="px-4 py-2 rounded-md bg-white text-black"
>
  Home
</button>

<button
  onClick={() => setRoute('admin')}
  className="px-4 py-2 rounded-md bg-white text-black"
>
  Admin Panel
</button>

</div>
</nav>


<main className="p-6">
{route === 'home' && <Home />}
{route === 'admin' && <AdminPanel />}
</main>
</div>
)
}