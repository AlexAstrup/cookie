import SidebarControls from '../components/SidebarControls';
import {Outlet} from 'react-router-dom';
import {ModelingProvider} from '../context/ModelingContext';

export default function DashboardLayout() {
  return (
    <ModelingProvider>
      <div className="dashboard dashboard-shell">
        <div className="dashboard-body">
          <aside className="sidebar">
            <SidebarControls/>
          </aside>
          <main className="dashboard-main">
            <Outlet/>
          </main>
        </div>
      </div>
    </ModelingProvider>
  );
}
