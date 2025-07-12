import { RiCloseFill } from "react-icons/ri";
import { FiDollarSign, FiUsers, FiCalendar } from "react-icons/fi";
import type { Product } from "../../pages/dashboardPage";
import formatDate from '../../utils/date';
import "./productStyles/viewProductInfoModal.css";

interface Props {
  show: boolean;
  product: Product | null;
  onClose: () => void;
  users: { u_id: number; u_name: string }[];
}

function ViewProductInfoModal({ show, product, onClose }: Props) {
  if (!show || !product) return null;

const cached = localStorage.getItem('selectedProduct');
const fallbackProduct = cached ? JSON.parse(cached) : null;

const createdAtFormatted = product.created_at_formatted || fallbackProduct?.created_at_formatted || "Not available";

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
            <FiUsers /> Usuarios Asignados ({product.userNames?.length || 0})
          </div>
          {product.userNames?.length ? (
            <div className="modal-tags">
              {product.userNames.map((name, i) => (
                <span key={i} className="modal-tag">{name}</span>
              ))}
            </div>
          ) : (
            <small className="modal-note">Sin usuarios asignados</small>
          )}

          <div className="modal-label"><FiCalendar /> Fecha de Creación</div>
          <div className="modal-box">{formatDate(createdAtFormatted)}</div>
        </div>
      </div>
    </div>
  );
}

export default ViewProductInfoModal;