export const TOKEN_KEY = "@user-token";
export const USER_TYPE = "@user-type";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
}
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.clear();
}
export const userType = (type) => { localStorage.setItem(USER_TYPE, type) };
export const getUserType = () => {
    return localStorage.getItem(USER_TYPE);
}

