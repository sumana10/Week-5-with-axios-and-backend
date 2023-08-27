
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

export const signup = async (email, password, isChecked) => {
    try {
        let route = '/user/signup';
        if(isChecked)
        route = '/admin/signup';
        const response = await axios.post(`${apiUrl}${route}`, {
          username: email,
          password: password,
        });
        const data = response.data;
        return data;
      } catch (error) {
        console.error('Error during signup:', error.response.data.message);
        //throw error;
        return error.response.data.message;
      }
}

export const signin = async (config, isChecked) => {
    try {
        let route = '/user/login';
        if(isChecked)
        route = '/admin/login';
        const response = await axios.post(`${apiUrl}${route}`, {}, config);
        const data = response.data;
        return data;
      } catch (error) {
        console.error('Error during signup:', error);
        return error.response.data.message;
      //  throw error;
      }
}