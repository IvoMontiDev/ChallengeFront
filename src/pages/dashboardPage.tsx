import { useEffect, useState } from 'react';
import api from '../api/auth';
import Header from '../components/header/dashboardHeader';
import ProductsTable from '../components/products/productsTable';
import CreateNewProductModal from '../components/products/createNewProductModal';
import ViewProductInfoModal from '../components/products/viewProductInfoModal';
import './generalStyles/dashboardPage.css'

export interface Product {
  created_at: any;
  id: string;
  name: string;
  description: string;
  price: number;
  created_at_formatted: string;
  userNames?: string[];
}

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [users, setUsers] = useState<{ u_id: number, u_name: string }[]>([]);


// method to populate ui prod table
const fetchProducts = async (page: number) => {
  setLoading(true);
  try {
    const res = await api.get(`/products?page=${page}&limit=${limit}`);
    const mappedProducts = res.data.products.map((p: any) => ({
      id: String(p.p_id),
      name: p.p_name,
      description: p.p_description,
      price: Number(p.p_price),
      created_at: p.created_at,
      created_at_formatted: p.created_at_formatted,
      userIds: p.userIds || [],
    }));
    setProducts(mappedProducts);
    localStorage.setItem('cachedProducts', JSON.stringify(mappedProducts));

    if (res.data.pagination?.total) {
      setTotalPages(Math.ceil(res.data.pagination.total / limit));
    } else {
      setTotalPages(res.data.products.length === limit ? page + 1 : page);
    }
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchProducts(page);
}, [page]);


  // Get users for modals
  useEffect(() => {
    if (showViewModal && selectedProduct) {
      api.get<{ userNames: string[] }>(`/products/${selectedProduct.id}/users`)
        .then(res => {
          setSelectedProduct(prev => prev && ({ ...prev, userNames: res.data.userNames }));
        });
    }
  }, [showViewModal, selectedProduct]);

  useEffect(() => {
  if (showModal) {
    api.get('/auth/users').then(res => {
      const userData = res.data.map((u: any) => ({
        u_id: u.u_id,
        u_name: u.u_name,
      }));
      setUsers(userData);
    });
  }
}, [showModal]);

// DEL
  const handleDelete = async (id: string) => {
    await api.delete(`/products/${id}`);
    setProducts(products => products.filter(p => p.id !== id));
    setPage(1);
  };

  // POST prod
  const handleCreateProduct = async (form: {
    name: string;
    description: string;
    price: string;
    userIds: number[]
  }) => {
    await api.post('/products', form);
    setShowModal(false);
    fetchProducts(1);
  };

  return (
    <div className="dashboard-container">
      <Header />

      <ProductsTable
        products={products}
        loading={loading}
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        onView={(product) => {
          localStorage.setItem('selectedProduct', JSON.stringify(product));
          setSelectedProduct(product);
          setShowViewModal(true);
        }}

        onDelete={handleDelete}
        onCreate={() => setShowModal(true)}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <CreateNewProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateProduct}
        users={users}
      />

      <ViewProductInfoModal
        show={showViewModal}
        product={selectedProduct}
        onClose={() => setShowViewModal(false)}
        users={users}      />
    </div>
  );
}