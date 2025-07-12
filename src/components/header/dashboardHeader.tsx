// src/components/Header.tsx
import { BsBoxSeam } from "react-icons/bs";
import { RxExit } from "react-icons/rx";
import { useAuth } from '../../context/authContext';
import './headerStyles/dashboardHeader.css';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="dashboard-header">
      <div className="header-div">
        <div className='box'><BsBoxSeam /></div>
        <div>
          <h1 className="dashboard-title">Gestión de Productos</h1>
          <span className="dashboard-welcome">
            Bienvenido, <b className="welcome-user">{user?.username}</b>
          </span>
        </div>
      </div>
      <button className="logout-btn" onClick={logout}><RxExit />Cerrar Sesión</button>
    </header>
  );
}

export default Header;