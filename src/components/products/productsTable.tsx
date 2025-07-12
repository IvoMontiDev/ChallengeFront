import React from 'react';
import { BsEye, BsFunnel, BsPlus, BsSearch } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import type { Product } from '../../pages/dashboardPage';
import Pagination from './pagination';
import './productStyles/productsTable.css';

interface Props {
  products: Product[];
  loading: boolean;
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onView: (product: Product) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function ProductsTable({
  products,
  loading,
  search,
  onSearchChange,
  onView,
  onDelete,
  onCreate,
  page,
  totalPages,
  onPageChange
}: Props) {
  const filteredProducts = products.filter(
    p =>
      (p.name?.toLowerCase().includes(search.toLowerCase()) || '') ||
      (p.description?.toLowerCase().includes(search.toLowerCase()) || '')
  );

  return (
    <>
      <section className="dashboard-actions">
        <div className="search-container">
          <BsSearch className="search-icon" />
          <input
            className="dashboard-search"
            type="text"
            placeholder="Buscar productos por nombre o descripción..."
            value={search}
            onChange={onSearchChange}
          />
        </div>
        <button className="create-btn" onClick={onCreate}>
          <BsPlus /> Crear Producto
        </button>
      </section>

      <section className="dashboard-table-section">
        <h2 className="dashboard-table-title">
          <span role="img" aria-label="filtro"><BsFunnel className="blue" /></span> Productos ({filteredProducts.length})
        </h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4}>Cargando...</td></tr>
            ) : filteredProducts.length === 0 ? (
              <tr><td colSpan={4}>No hay productos</td></tr>
            ) : (
              filteredProducts.map(product => (
                <tr key={product.id}>
                  <td className="blue">{product.name}</td>
                  <td>{product.description}</td>
                  <td className="blue">${product.price.toFixed(2)}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => onView(product)}
                    >
                      <BsEye />
                    </button>
                    <button className="delete-btn" onClick={() => onDelete(product.id)}><RiDeleteBinLine /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}

export default ProductsTable;