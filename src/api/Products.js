import API from './config';

const Products = {
    getAll: async () => {
        try {
            let response = await API().get(`/produto`);
            return response.data;
        } catch (e) {
            return { status: 'error', message: e?.response?.data?.message };
        }
    },
    createProduct: async () => {
        try {
            let response = await API().post(`/produto`);
            return response.data;
        } catch (e) {
            return { status: 'error', message: e?.response?.data?.message };
        }
    },
    update: async (id, params) => {
        try {
            let response = await API().put(`/produto/${id}`, params);
            return response.data;
        } catch (e) {
            return { status: 'error', message: e?.response?.data?.message };
        }
    },
    delete: async (id) => {
        try {
            let response = await API().delete(`/produto/${id}`);
            return response.data;
        } catch (e) {
            return { status: 'error', message: e?.response?.data?.message };
        }
    },
}

export default Products;