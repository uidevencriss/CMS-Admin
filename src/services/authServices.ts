import axios from "axios";

const API_URL = "https://o6cto7u0pc.execute-api.ap-south-1.amazonaws.com/Stage";

export interface MyRequestBody {
  website: string;
}
export interface MyBody {
  blogUrl: string;
}

export const apiCall = async (body: MyRequestBody): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/get-blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body), // Convert body to JSON
    });
    return response; // Return the response data
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be handled elsewhere
  }
};

export const linkapi = async (body: MyBody) => {
  const response = await axios.get(`${body}`);
  return response;
};
