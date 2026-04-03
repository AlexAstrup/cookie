import {Routes, Route, useLocation} from 'react-router-dom';
import Header from './components/Header';
import RequireAuth from './components/RequireAuth';
import { ModelingProvider } from './context/ModelingContext';

import SignInPage from './pages/SignInScreen';
import Home from './pages/Home';
import About from './pages/About';
import Scenarios from './pages/Scenarios';
import Data from './pages/Data';
import Models from './pages/Models';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';

function AppContent() {
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
            path="/data"
            element={<RequireAuth><Data/></RequireAuth>}
          />
          <Route
            path="/models"
            element={<RequireAuth><Models/></RequireAuth>}
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
            <Route index element={<Scenarios/>}/>
            <Route path=":scenarioId" element={<Dashboard/>}/>
          </Route>
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <ModelingProvider>
      <AppContent />
    </ModelingProvider>
  );
}

export default App;
