// Central API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Products API
export const productsAPI = {
    getAll: async (params = {}) => {
        const query = new URLSearchParams(params).toString();
        const res = await fetch(`${API_BASE_URL}/products${query ? `?${query}` : ''}`);
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
    },
    getById: async (id) => {
        const res = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        return res.json();
    },
};

// Orders API
export const ordersAPI = {
    create: async (orderData) => {
        const res = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });
        if (!res.ok) throw new Error('Failed to place order');
        return res.json();
    },
};

// Contact API
export const contactAPI = {
    send: async (formData) => {
        const res = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed to send message');
        return res.json();
    },
};

// Auth API
export const authAPI = {
    register: async (userData) => {
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || 'Registration failed');
        }
        return res.json();
    },
    login: async (credentials) => {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || 'Login failed');
        }
        return res.json();
    },
    getMe: async (token) => {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${token}` 
            },
        });
        if (!res.ok) throw new Error('Failed to fetch user profiles');
        return res.json();
    }
};

