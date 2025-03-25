import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/components/App.tsx'

// @ts-expect-error works fine in docker compose
import { Employee } from '@types/types'

const a: Employee = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  department: 'IT',
  dateStarted: '2021-01-01',
  quote: 'Work hard, play hard',
  status: 'active',
  avatarUrl: 'https://example.com/avatar.jpg'
}

console.log(a);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
