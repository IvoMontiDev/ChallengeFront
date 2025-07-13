import { useState, useEffect } from 'react';
import api from '../api/auth';

export function useProductUsers(productId: string | null, open: boolean) {
  const [userNames, setUserNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !productId) return;
    setLoading(true);
    api.get<{ userNames: string[] }>(`/products/${productId}/users`)
      .then(res => setUserNames(res.data.userNames))
      .finally(() => setLoading(false));
  }, [productId, open]);

  return { userNames, loading };
}
