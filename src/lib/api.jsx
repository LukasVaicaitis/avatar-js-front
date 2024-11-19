import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Get list of photos
export const getPhotos = async () => {
    try {
        const accessToken = localStorage.getItem('access_token');

        const response = await axios.get(`${API_URL}/avatars/photos/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching photos:", error);
        return [];
    }
};

// Upload a new photo
export const uploadPhoto = async (formData) => {
    try {
        const accessToken = localStorage.getItem('access_token');

        
        const response = await axios.post(`${API_URL}/avatars/upload-photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
                'accept': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error uploading photo:", error);
        throw error;
    }
};

// Delete a photo
export const deletePhoto = async (photoId) => {
    try {
        const accessToken = localStorage.getItem('access_token');

        await axios.delete(`${API_URL}/avatars/photos/delete/${photoId}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        console.error("Error deleting photo:", error);
        throw error;
    }
};

//Login a user
//Returns: access and refresh tokens
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/avatars/api/token/`, {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        throw new Error('Login failed. Please check your credentials.');
    }
};

//register a user
export const registerUser = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/avatars/register/`, {
            username,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw new Error('Registration failed. Please try again.');
    }
};

//Save project
export const saveProject = async (projectData) => {
    try {
        const accessToken = localStorage.getItem('access_token');

        const response = await axios.post(`${API_URL}/avatars/save-project/`, projectData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error saving project:", error);
        throw error;
    }
};

//gets all projects for a user
export const getProjects = async () => {
    try {
        const accessToken = localStorage.getItem('access_token');

        const response = await axios.get(`${API_URL}/avatars/projects/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
};

//Get image by ID
export const fetchImageUrlById = async (photoId) => {
    try {
        const accessToken = localStorage.getItem('access_token');

        const response = await axios.get(`${API_URL}/avatars/get-image/${photoId}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.image_url || null;
    } catch (error) {
        console.error('Error fetching image URL:', error);
        return null;
    }
};

//Remove users' tokens
export const logoutUser = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};