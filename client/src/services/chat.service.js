import { API_URL } from "./api.service";
import axios from 'axios';

export const fetchPost = async () => {
    const response = await axios.get(`${API_URL}/chat`);
    return response.data;
};

export const addPost = async (message) => {
    const author = localStorage.getItem('name') + ' ' + localStorage.getItem('surname');
    const timestamp = new Date().toLocaleString();
    const response = await axios.post(`${API_URL}/chat`, { author, timestamp, message });
    return true;
};