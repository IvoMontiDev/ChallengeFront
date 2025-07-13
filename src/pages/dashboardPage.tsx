import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useUsers } from '../hooks/useUsers';
import { useProductUsers } from '../hooks/useProductUsers';
import ProductsTable from '../components/products/productsTable';
import Header from '../components/header/dashboardHeader';
import CreateNewProductModal from '../components/products/createNewProductModal';
import ViewProductInfoModal from '../components/products/viewProductInfoModal';
import './generalStyles/dashboardPage.css';


export default function DashboardPage() {
  const { products, loading, page, totalPages, setPage, deleteProduct, createProduct } =
    useProducts(10);

  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [showView, setShowView]     = useState(false);
  const [selected, setSelected]     = useState<string | null>(null);

  // Extraemos la carga de usuarios
  const { users, loading: loadingUsers } = useUsers(showCreate);

  // Extraemos la carga de userNames para el modal de view
  const { userNames, loading: loadingNames } = useProductUsers(selected, showView);

  return (
    <div className="dashboard-container">
      <Header />
      <ProductsTable
        products={products}
        loading={loading}
        search={search}
        onSearchChange={e => setSearch(e.target.value)}
        onView={p => { setSelected(p.id); setShowView(true); }}
        onDelete={deleteProduct}
        onCreate={() => setShowCreate(true)}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <CreateNewProductModal
        show={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={form => createProduct(form).then(() => setShowCreate(false))}
        users={users}
      />

      <ViewProductInfoModal
        show={showView}
        product={products.find(p => p.id === selected)!}
        onClose={() => setShowView(false)}
        users={userNames}
      />
    </div>
  );
}
