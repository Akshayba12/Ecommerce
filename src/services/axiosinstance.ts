import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        "Content-Type": "application/json"
    }
})


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        window.location.href = '/login';
        alert('Session expired or unauthorized. Please log in again.');
      }
  
      // if (error.response) {
      //   const status = error.response.status;
      //   switch (status) {
      //     case 400:
      //       alert('Bad Request: Please check your input.');
      //       break;
      //     case 404:
      //       alert('Resource not found. Please check the URL or try again later.');
      //       break;
      //     case 500:
      //       alert('Server error. Please try again later.');
      //       break;
      //     default:
      //       alert(`Unexpected error occurred: ${status}`);
      //       break;
      //   }
      // } else if (error.request) {
      //   alert('Network error: Unable to reach the server. Please check your internet connection.');
      // } else {
      //   alert(`Error: ${error.message}`);
      // }
  
      return Promise.reject(error);
    }
  );

export default axiosInstance