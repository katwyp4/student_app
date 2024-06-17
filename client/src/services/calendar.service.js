import { API_URL } from "./api.service";
import axios from 'axios';

export const fetchEvent = async () => {
    const response = await axios.get(`${API_URL}/calendar`);
    return response.data;
};

export const addEvent = async (event) => {
    await axios.post(`${API_URL}/calendar`, event);
    return true;
};

export const deleteEvent = async (keyToDelete) => {
    await axios.delete(`${API_URL}/calendar/${keyToDelete}`);
    return true;
};