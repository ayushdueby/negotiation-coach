import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Negotiate from './pages/Negotiate'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/negotiate" element={<Negotiate />} />
      </Routes>
    </BrowserRouter>
  )
}
