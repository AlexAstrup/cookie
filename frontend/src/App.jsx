import {Routes, Route, useLocation} from 'react-router-dom';
import Header from './components/Header';
import RequireAuth from './components/RequireAuth';

import SignInPage from './pages/SignInScreen';
import Home from './pages/Home';
import About from './pages/About';
import ChartPage from './pages/ChartPage';
import Contact from './pages/Contact';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ['/signin'];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header/>}
      <div className="app-content">
        <Routes>
          {/* Public Route */}
          <Route path="/signin" element={<SignInPage/>}/>

          {/* Protected Routes */}
          <Route
            path="/"
            element={<RequireAuth><Home/></RequireAuth>}
          />
          <Route
            path="/about"
            element={<RequireAuth><About/></RequireAuth>}
          />
          <Route
            path="/chart"
            element={<RequireAuth><ChartPage/></RequireAuth>}
          />
          <Route
            path="/contact"
            element={<RequireAuth><Contact/></RequireAuth>}
          />

          {/* Nested Dashboard Layout */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardLayout/>
              </RequireAuth>
            }
          >
            <Route index element={<Dashboard/>}/>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
