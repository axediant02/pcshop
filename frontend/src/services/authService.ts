import axiosURL from "@/lib/axioInstance";

export const signup = async (data: { name: string; password: string }) => {
    const response = await axiosURL.post('/register', data);
    return response.data;
};

export const login = async (data: { email: string; password: string }) => {
    const response = await axiosURL.post('/login', data);
    return response.data;
};

export const logout = ()=>{
    localStorage.removeItem('token');
};

export const getUser = async () => {
    const response = await axiosURL.get('/user');
    return response.data;
}