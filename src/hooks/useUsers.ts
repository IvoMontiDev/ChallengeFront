import { useState, useEffect } from 'react';
import api from '../api/auth';

export function useUsers(open: boolean) {
  const [users, setUsers] = useState<{ u_id: number; u_name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    api.get('/auth/users')
      .then(res => {
        const list = res.data.map((u: any) => ({
          u_id: u.u_id,
          u_name: u.u_name,
        }));
        setUsers(list);
      })
      .finally(() => setLoading(false));
  }, [open]);

  return { users, loading };
}
