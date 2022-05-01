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
}

export default Products;