const getLocalAccessToken = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.accessToken;
};

const updateLocalAccessToken = (token: string) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.accessToken = token;
    localStorage.setItem('user', JSON.stringify(user));
};

const getUser = () => JSON.parse(localStorage.getItem('user') || '{}');

const setUser = (user: string) => {
    localStorage.setItem('user', JSON.stringify(user));
};

const removeUser = () => {
    localStorage.removeItem('user');
};

const TokenService = {
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser,
};

export default TokenService;
