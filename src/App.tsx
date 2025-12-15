import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UploadReceipt from './components/UploadReceipt'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <img
  src="https://smart-receipts-s3.s3.us-east-2.amazonaws.com/receipts/364ec9e0-704e-491c-9c57-429e29ce4849/2d33ce8d-7892-4c93-8e46-1a5acbaeba68.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ6UPZ3F6WSOIFHWE%2F20251215%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251215T002314Z&X-Amz-Expires=300&X-Amz-Signature=b339f62ef1630560ac66ba0b97601ac3a0edb7b2eece3c9d468ee5e89d32f2b0&X-Amz-SignedHeaders=host"
  alt="Uploaded receipt"
  style={{ maxWidth: "300px" }}
/>
        <UploadReceipt />
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
