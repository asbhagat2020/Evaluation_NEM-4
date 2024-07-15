import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchBooks = async (page, limit) => {
  try {
    const response = await api.get(`/books?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error; // Optionally rethrow the error to propagate it further
  }
};

export const fetchBookById = async (id) => {
  try {
    const response = await api.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    throw error; // Optionally rethrow the error to propagate it further
  }
};

export const fetchReviewsByBook = async (bookId) => {
  try {
    const response = await api.get(`/reviews/${bookId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews for book with ID ${bookId}:`, error);
    throw error; // Optionally rethrow the error to propagate it further
  }
};

export const registerUser = async (data) => {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // Optionally rethrow the error to propagate it further
  }
};

export const loginUser = async (data) => {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error; // Optionally rethrow the error to propagate it further
  }
};

export default api;
