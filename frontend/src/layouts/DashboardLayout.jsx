import SidebarControls from '../components/SidebarControls';
import {Outlet, useLocation} from 'react-router-dom';

export default function DashboardLayout() {
  const location = useLocation();
  const isScenariosPage = location.pathname === '/dashboard';

  return (
    <div className="dashboard dashboard-shell">
      <div className="dashboard-body">
        {!isScenariosPage && (
          <aside className="sidebar">
            <SidebarControls/>
          </aside>
        )}
        <main className="dashboard-main">
          <Outlet/>
        </main>
      </div>
    </div>
  );
}
