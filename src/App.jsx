import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from './features/theme/themeSlice';
import MainPage from './pages/MainPage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import Header from './Header';
import { LanguageProvider } from './LanguageContext';
import './App.css';

const App = () => {
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <LanguageProvider>
      <div className="App">
        <button onClick={() => dispatch(toggleTheme())}>
          Toggle Theme
        </button>
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/edit/:id" element={<EditPage />} />
          </Routes>
        </Router>
      </div>
    </LanguageProvider>
  );
};

export default App;