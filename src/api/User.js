import API from './config';

const User = {
    registerUser: async (params) => {
        try {
            let response = await API().post(`/user`, params);
            return response;
        } catch (e) {
            return { status: 'error', message: e?.response?.data?.message };
        }
    },
    login: async (email, password) => {
        try {
            let response = await API().get(`/user?email=${email}&password=${password}`);
            return response;
        } catch (e) {
            return { status: 'error', message: e?.response?.data?.message };
        }
    },
}

export default User;