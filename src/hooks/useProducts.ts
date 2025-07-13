import { useState, useEffect } from 'react';
import api from '../api/auth';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  created_at_formatted: string;
  userIds?: number[];
}

export function useProducts(initialLimit = 10) {
  const [products, setProducts]     = useState<Product[]>([]);
  const [loading, setLoading]       = useState(true);
  const [page, setPage]             = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = initialLimit;

  const fetchProducts = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/products?page=${pageNum}&limit=${limit}`);
      const mapped = res.data.products.map((p: any) => ({
        id: String(p.p_id),
        name: p.p_name,
        description: p.p_description,
        price: Number(p.p_price),
        created_at_formatted: p.created_at_formatted,
        userIds: p.userIds || [],
      }));
      setProducts(mapped);

      // totalPages
      if (res.data.pagination?.total) {
        setTotalPages(Math.ceil(res.data.pagination.total / limit));
      } else {
        setTotalPages(res.data.products.length === limit ? pageNum + 1 : pageNum);
      }
    } finally {
      setLoading(false);
    }
  };

  // reload on changes
  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  // delete
  const deleteProduct = async (id: string) => {
    await api.delete(`/products/${id}`);
    // reload on page 1 to see the changes
    fetchProducts(1);
    setPage(1);
  };

  // create
  interface CreateForm { name: string; description: string; price: string; userIds: number[]; }
  const createProduct = async (form: CreateForm) => {
    await api.post('/products', form);
    setPage(1);
    fetchProducts(1);
  };
  

  return {
    products,
    loading,
    page,
    totalPages,
    setPage,
    fetchProducts,
    deleteProduct,
    createProduct,
  };
}
