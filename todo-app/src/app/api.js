import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5001'

const api = axios.create({
    baseURL: API_BASE_URL
})

// export = can be imported in other file
export const getTodos = async () => {
    try {
        const response = await api.get('/todos');
        return response.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

export const addTodo = async (title) => {
    try {
        const response = await api.post('/todos', {title, completed: false});
        // send as object auto conv json
        return response.data;
    } catch (error) {
        console.error('Error adding new todo:', error);
    }
}

export const updateTodo = async (id, data) => {
    try {
        const response = await api.put(`/todos/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating todo:', error);
    }
}

export const deleteTodo = async (id) => {
    try {
        await api.delete(`/todos/${id}`);
        // no capture response?
        // display success or not? (201)
    } catch (error) {
        console.error('Error deleting todo:', error)
    }
}

export default api