import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Results from './pages/Results';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </>
  )
}

export default App
