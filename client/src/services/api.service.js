export const API_URL = 'http://localhost:8000';

export const signout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    return true;
};

// Przykładowe żądanie z wykorzystaniem axios'a. Bloki try catch powinny być w pages, aby informować użytkownika o błędach.
// const fetchSchedule = async (id) => {
//     const response = await axios.get(`${API_URL}/schedule/fetch/${id}`);
//     return response.data;
// };

