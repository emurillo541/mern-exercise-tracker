import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import HomePage from './pages/HomePage.jsx';
import CreateExercisePage from './pages/CreateExercisePage.jsx';
import EditExercisePage from './pages/EditExercisePage.jsx';
import './App.css';

const App = () => (
  <BrowserRouter>
    <header>
      <h1>Exercise Tracker</h1>
      <p>Track your exercises efficiently.</p>
      <Navigation />
    </header>
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateExercisePage />} />
        <Route path="/edit/:id" element={<EditExercisePage />} />
      </Routes>
    </main>
    <footer>© 2025 Emmanuel Murillo</footer>
  </BrowserRouter>
);

export default App;