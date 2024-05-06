import { API_URL } from "./api.service";
import axios from 'axios';

export const signin = async (email, password) => {
    const response = await axios.post(`${API_URL}/log`, { email, password });
    localStorage.setItem('email', response.data.email);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('name', response.data.name);
    localStorage.setItem('surname', response.data.surname);
    return true;
};