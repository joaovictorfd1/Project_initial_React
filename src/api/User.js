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
}

export default User;