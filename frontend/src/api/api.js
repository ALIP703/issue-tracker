import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000',
});
// Add an interceptor to attach the JWT token to all requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export const ApiServices = {
    login: (data) => {
        return api.post("/sign-in", data);
    },
    projects: () => {
        return api.get("/admin/projects");
    },
    projectsBySearch: (data) => {
        return api.post("/admin/projects", data);
    },
}