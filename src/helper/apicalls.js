
import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const getData = async () => {
    try {
        const response = await axios.get(`${apiUrl}/admin/me`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        return response.data;
    } catch (error) {

        console.error("Axios error:", error);
        throw error;
    }
};