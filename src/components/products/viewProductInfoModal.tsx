import { RiCloseFill } from "react-icons/ri";
import { FiDollarSign, FiUsers, FiCalendar } from "react-icons/fi";
import formatDate from '../../utils/date';
import type Product from '../../types/product';
import "./productStyles/viewProductInfoModal.css";


interface Props {
  show: boolean;
  product: Product;
  onClose: () => void;
  users: string[]; 
}

function ViewProductInfoModal({ show, product, onClose, users }: Props) {
  if (!show || !product) return null;

const rawDate = product.created_at_formatted;
const displayDate = formatDate(rawDate);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <RiCloseFill />
        </button>

        <h2 className="modal-title">{product.name}</h2>
        <p className="modal-subtitle">Detalles completos del producto</p>

        <div className="modal-section">
          <div className="modal-label"><FiDollarSign /> Precio</div>
          <div className="modal-price">${product.price.toFixed(2)}</div>

          <div className="modal-label">Descripción</div>
          <div className="modal-box">{product.description}</div>

          <div className="modal-label">
            <FiUsers /> Usuarios Asignados ({users?.length || 0})
          </div>
          {users?.length ? (
            <div className="modal-tags">
              {users.map((name, i) => (
                <span key={i} className="modal-tag">{name}</span>
              ))}
            </div>
          ) : (
            <small className="modal-note">Sin usuarios asignados</small>
          )}

          <div className="modal-label"><FiCalendar /> Fecha de Creación</div>
          <div className="modal-box">{formatDate(displayDate)}</div>
        </div>
      </div>
    </div>
  );
}

export default ViewProductInfoModal;