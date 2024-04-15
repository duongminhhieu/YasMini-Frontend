import i18n from 'i18next';
import axios from 'axios';
import TokenService from './token.axios';


// Headers
const JSON_HEADER = { 'Content-Type': 'application/json' };
const FORMDATA_HEADER = { 'Content-Type': 'multipart/form-data' };

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { ...JSON_HEADER },
});

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            if (config.data instanceof FormData) {
                // eslint-disable-next-line no-param-reassign
                config.headers['Content-Type'] = FORMDATA_HEADER['Content-Type'];
            }
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            // eslint-disable-next-line no-param-reassign
            delete config.headers.Authorization;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

let isExpired = false;
instance.interceptors.response.use(
    (res) => {
        isExpired = false;
        const { url } = res.config;
        if (url === '/users/login') {
            TokenService.setUser(res.data);
        }
        return res;
    },
    // eslint-disable-next-line consistent-return
    (err) => {
        if (
            (err?.response?.status === 401 && !isExpired) ||
            (err?.response?.status === 403 && !isExpired)
        ) {
            isExpired = true;
            if (TokenService.getUser()?.id) {
                // eslint-disable-next-line no-alert
                alert(i18n.t`error.401.message`);
            }
            TokenService.removeUser();
        } else return Promise.reject(err);
    }
);

export default instance;
