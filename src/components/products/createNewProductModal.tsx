import React, { useState } from 'react';
import { BsPlus } from "react-icons/bs";
import { RiDeleteBinLine, RiCloseFill } from "react-icons/ri";
import './productStyles/createNewProductModal.css';

interface User {
  u_id: number;
  u_name: string;
}

interface Props {
  show: boolean;
  onClose: () => void;
  onSubmit: (product: { 
    name: string; 
    description: string; 
    price: string; 
    userIds: number[] 
  }) => void;
  users: User[];
}

function CreateNewProductModal({ show, onClose, onSubmit, users }: Props) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    userIds: [] as number[],
  });
  const [userToAdd, setUserToAdd] = useState<number | ''>('');

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: '',
      description: '',
      price: '',
      userIds: [],
    });
    setUserToAdd('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <RiCloseFill />
        </button>
        <h2>
          <span className='modal-title'>Crear Nuevo Producto</span>
        </h2>
        <p className='modal-subtitle'>Completa la información del producto que deseas crear.</p>
        <form onSubmit={handleSubmit}>
          <label className='input-label'>Nombre del Producto</label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder='Ej: Laptop Gaming'
            required
          />
          <label className='input-label'>Descripción</label>
          <textarea
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            placeholder='Describe las características del producto...'
          />
          <label className='input-label'>Precio ($)</label>
          <input
            type="number"
            min="0"
            step={"0.01"}
            value={form.price}
            onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
            placeholder='0.00'
            required
          />
          <label className='input-label'>Usuarios Asignados</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <select
              value={userToAdd}
              onChange={e => setUserToAdd(Number(e.target.value))}
            >
              <option value="">Seleccionar usuario</option>
              {users.map(u => (
                <option key={u.u_id} value={u.u_id}>{u.u_name}</option>
              ))}
            </select>
            <button className='button-add-user'
              type="button"
              onClick={() => {
                if (userToAdd && !form.userIds.includes(userToAdd)) {
                  setForm(f => ({ ...f, userIds: [...f.userIds, userToAdd as number] }));
                  setUserToAdd('');
                }
              }}
            ><BsPlus /></button>
          </div>
          <div>
            {form.userIds.length === 0 && <small style={{ color: "#64748B" }}>Selecciona al menos un usuario para el producto</small>}
            {form.userIds.length > 0 && (
              <ul className='ul-list'>
                {form.userIds.map(uid => {
                  const user = users.find(u => u.u_id === uid);
                  return (
                    <li key={uid}>
                      {user?.u_name}
                      <button className='del-user-btn' type="button" onClick={() => setForm(f => ({ ...f, userIds: f.userIds.filter(id => id !== uid) }))}><RiDeleteBinLine /></button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
            <button className='button-cancel' type="button" onClick={onClose}>Cancelar</button>
            <button type="submit" disabled={form.userIds.length === 0}>Crear Producto</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNewProductModal;