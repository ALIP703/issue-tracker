import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
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
    registrationCheck: () => {
        return api.get("/reg-check");
    },
    login: (data) => {
        return api.post("/sign-in", data);
    },
    register: (data) => {
        return api.post("/sign-up", data);
    },
    projects: () => {
        return api.get("/admin/projects");
    },
    project: (id) => {
        return api.get(`/admin/project/${id}`);
    },
    projectsBySearch: (data) => {
        return api.post("/admin/projects", data);
    },
    createProject: (data) => {
        return api.post("/admin/project", data);
    },
    createIssue: (data) => {
        return api.post("/admin/issue", data);
    },
    updateProject: (id, data) => {
        return api.put(`/admin/project/${id}`, data);
    },
    updateIssue: (id, data) => {
        return api.put(`/admin/issue/${id}`, data);
    },
    issuesBySearch: (data) => {
        return api.post("/admin/issues", data);
    },
    getAllIssues: () => {
        return api.get("/admin/issues");
    },
    getIssue: (id) => {
        return api.get(`/admin/issue/${id}`);
    },
}