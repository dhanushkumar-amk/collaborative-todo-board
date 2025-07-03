// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthLogin';
import LandingPage from './pages/LandingPage';
import TodoPage from './pages/TodoPage';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route path='/'element={<LandingPage/>} />
        <Route path='/todoListPage'element={<TodoPage/>} />
      </Routes>
    </>
  );
}
