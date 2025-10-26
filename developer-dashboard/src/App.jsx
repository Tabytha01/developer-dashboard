import { useState } from 'react'

function App() {
  const [dark, setDark] = useState(false)
  const toggleDark = () => setDark(v => !v)

  const cards = [
    { title: 'Welcome', text: 'This is your dashboard.' },
    { title: 'Projects', text: 'Track your ongoing work.' },
    { title: 'Notes', text: 'Keep simple reminders here.' },
  ]

  const tasksInit = [
    { id: 1, text: 'Try the dark mode toggle', done: false },
    { id: 2, text: 'Add your first project card', done: false },
  ]

  const [tasks, setTasks] = useState(tasksInit)
  const toggleTask = (id) => setTasks(t => t.map(x => x.id === id ? { ...x, done: !x.done } : x))

  const shell = dark ? 'min-h-screen bg-gray-900 text-white' : 'min-h-screen bg-gray-50 text-gray-900'
  const card = dark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
  const subtle = dark ? 'text-gray-300' : 'text-gray-600'

  return (
    <div className={shell}>
      {/* Header */}
      <header className={`flex items-center justify-between p-4 border-b ${dark ? 'border-gray-800' : 'border-gray-200'} sticky top-0 bg-transparent`}>
        <h1 className="text-xl font-bold">Developer Dashboard</h1>
        <button onClick={toggleDark} className={`${dark ? 'bg-gray-800 text-gray-200' : 'bg-blue-600 text-white'} px-3 py-2 rounded`}>
          {dark ? 'Light' : 'Dark'} Mode
        </button>
      </header>

      {/* Content */}
      <main className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c, i) => (
          <div key={i} className={`${card} rounded-lg p-4`}>
            <h2 className="text-lg font-semibold">{c.title}</h2>
            <p className={`${subtle} text-sm mt-1`}>{c.text}</p>
          </div>
        ))}

        {/* Tasks */}
        <div className={`${card} rounded-lg p-4 lg:col-span-3`}>
          <h2 className="text-lg font-semibold">Tasks</h2>
          <ul className="mt-3 space-y-2">
            {tasks.map(t => (
              <li key={t.id} className="flex items-center gap-2">
                <input
                  id={`task-${t.id}`}
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleTask(t.id)}
                  className="size-4 accent-blue-600"
                />
                <label htmlFor={`task-${t.id}`} className={t.done ? `${subtle} line-through` : ''}>{t.text}</label>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}

export default App
