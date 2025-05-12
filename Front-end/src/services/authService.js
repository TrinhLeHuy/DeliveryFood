const API_URL = 'http://localhost:3000/users';

export async function signup({ username, email, password }) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  if (!res.ok) throw new Error('Đăng ký thất bại');
  return res.json();
}

export async function login({ username, password }) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Đăng nhập thất bại');
  return res.json();
}

export async function getProducts() {
  const res = await fetch('http://localhost:3000/products');
  return res.json();
}

export async function createOrder(items) {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:3000/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items }),
  });
  return res.json();
}