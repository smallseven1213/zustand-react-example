import { useUserStore } from './stores/user'
import './App.css'

function App() {
  const { name, account, email, setName, setAccount, setEmail, clear } = useUserStore()

  return (
    <>
      <div className="card">
        <h1>User</h1>
        <p>Current name: {name || '(empty)'}</p>
        <input
          type="text"
          placeholder="Type a name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div style={{ marginTop: 12 }}>
          <p>Current account: {account || '(empty)'} </p>
          <input
            type="text"
            placeholder="Type an account..."
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <p>Current email: {email || '(empty)'} </p>
          <input
            type="email"
            placeholder="Type an email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button onClick={clear} style={{ marginTop: 12 }}>Clear All</button>
      </div>
    </>
  )
}

export default App
