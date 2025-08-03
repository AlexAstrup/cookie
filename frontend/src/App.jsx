import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import RequireAuth from './components/RequireAuth';

import SignInPage from './pages/SignInScreen';
import Home from './pages/Home';
import About from './pages/About';
import ChartPage from './pages/ChartPage';
import Contact from './pages/Contact';

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ['/signin'];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <Router>
      {shouldShowHeader && <Header />}
      <div className="app-content" style={{ marginTop: '70px' }}>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/about" element={<RequireAuth><About /></RequireAuth>} />
          <Route path="/chart" element={<RequireAuth><ChartPage /></RequireAuth>} />
          <Route path="/contact" element={<RequireAuth><Contact /></RequireAuth>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
