import './App.css'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './componentes/routes.jsx'

function App() {
  return <RouterProvider router={router} />
}

export default App
