import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <>
      <Header />
      <main className="public-main">
        <Outlet />
      </main>
    </>
  );
}
