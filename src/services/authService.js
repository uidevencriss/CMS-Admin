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
