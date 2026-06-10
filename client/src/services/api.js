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
    create: async (productData) => {
        const token = localStorage.getItem('raani_token');
        const res = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData),
        });
        if (!res.ok) throw new Error('Failed to create product');
        return res.json();
    },
    update: async (id, productData) => {
        const token = localStorage.getItem('raani_token');
        const res = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData),
        });
        if (!res.ok) throw new Error('Failed to update product');
        return res.json();
    },
    delete: async (id) => {
        const token = localStorage.getItem('raani_token');
        const res = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'DELETE',
            headers: { 
                'Authorization': `Bearer ${token}`
            },
        });
        if (!res.ok) throw new Error('Failed to delete product');
        return res.json();
    }
};

// Orders API
export const ordersAPI = {
    create: async (orderData) => {
        const res = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });
        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.message || 'Failed to place order');
        }
        return res.json();
    },
    getAll: async () => {
        const token = localStorage.getItem('raani_token');
        const res = await fetch(`${API_BASE_URL}/orders`, {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${token}` 
            },
        });
        if (!res.ok) throw new Error('Failed to fetch orders');
        return res.json();
    },
    getMyOrders: async () => {
        const token = localStorage.getItem('raani_token');
        const res = await fetch(`${API_BASE_URL}/orders/my`, {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${token}` 
            },
        });
        if (!res.ok) throw new Error('Failed to fetch your orders');
        return res.json();
    },
    updateStatus: async (id, statusData) => {
        const token = localStorage.getItem('raani_token');
        const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(statusData),
        });
        if (!res.ok) throw new Error('Failed to update order status');
        return res.json();
    }
};

// Contact API
export const contactAPI = {
    send: async (formData) => {
        const token = localStorage.getItem('raani_token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers,
            body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed to send message');
        return res.json();
    },
    getMy: async () => {
        const token = localStorage.getItem('raani_token');
        const res = await fetch(`${API_BASE_URL}/contact/my`, {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${token}` 
            },
        });
        if (!res.ok) throw new Error('Failed to fetch your inquiries');
        return res.json();
    },
    getAll: async () => {
        const token = localStorage.getItem('raani_token');
        const res = await fetch(`${API_BASE_URL}/contact`, {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${token}` 
            },
        });
        if (!res.ok) throw new Error('Failed to fetch contact messages');
        return res.json();
    },
    markRead: async (id) => {
        const token = localStorage.getItem('raani_token');
        const res = await fetch(`${API_BASE_URL}/contact/${id}/read`, {
            method: 'PUT',
            headers: { 
                'Authorization': `Bearer ${token}` 
            },
        });
        if (!res.ok) throw new Error('Failed to update message status');
        return res.json();
    },
    reply: async (id, replyText) => {
        const token = localStorage.getItem('raani_token');
        const res = await fetch(`${API_BASE_URL}/contact/${id}/reply`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ reply: replyText }),
        });
        if (!res.ok) throw new Error('Failed to send reply');
        return res.json();
    }
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
    },
    updateMe: async (userData) => {
        const token = localStorage.getItem('raani_token');
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(userData),
        });
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || 'Profile update failed');
        }
        return res.json();
    },
    getAllUsers: async () => {
        const token = localStorage.getItem('raani_token');
        const res = await fetch(`${API_BASE_URL}/auth/users`, {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${token}` 
            },
        });
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
    },
    forgotPassword: async (email) => {
        const res = await fetch(`${API_BASE_URL}/auth/forgotpassword`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        if (!res.ok) {
            const errData = await res.json();
            if (errData.devResetUrl) {
                return { devResetUrl: errData.devResetUrl, message: errData.message };
            }
            throw new Error(errData.message || 'Request failed');
        }
        return res.json();
    },
    resetPassword: async (token, password) => {
        const res = await fetch(`${API_BASE_URL}/auth/resetpassword/${token}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || 'Reset failed');
        }
        return res.json();
    }
};

