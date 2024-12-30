import axios from "axios";

const API_URL = "https://o6cto7u0pc.execute-api.ap-south-1.amazonaws.com/Stage";

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/user-login`, { email, password });
  console.log(response);
  return response.data; // Return response data (e.g., token, user details)
};

export const signup = async (body) => {
    return await axios.post(`${API_URL}/user-sign-up`, body);
  };
export const blogslisting = async (selectedValue) => {
  const response = await axios.post(`${API_URL}/get-blogs`, {selectedValue});
  return response.data;
}
export const createblogs = async (body) => {
  const isAuthenticated = localStorage.getItem('authToken');
  try {
    const response = await axios.post(`${API_URL}/create-blogs`, body, {
      headers: {
        Authorization: `Bearer ${isAuthenticated}`, // Adding Auth Token
      },
    });
    console.log("Success:", response.data);
    return response;
  } catch (error) {
    console.log("error",error);
    throw error;
  }
}
export const linkapi = async (body) => {
  
  const response = await axios.get(`${body}`);
  return response;
};
