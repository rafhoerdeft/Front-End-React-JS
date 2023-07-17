import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [name, setName] = useState("");
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("");
    const [expired, setExpired] = useState("");
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await axios.delete('http://localhost:8000/logout');
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const refreshToken = async () => {
        try {
            const res = await axios.get('http://localhost:8000/token');
            setToken(res.data.accessToken);
            const decoded = jwt_decode(res.data.accessToken);
            setExpired(decoded.exp);
            setName(decoded.name);
            setUserId(decoded.userId);
            // console.log(decoded);
        } catch (error) {
            if (error.response) {
                console.log('Error', error.response.statusText);
                navigate('/');
            }
        }
    }

    const axiosJWT = axios.create(); // semua nanti yang membutuhkan token, akan menggunakan ini utk mengaksesnya

    // agar otomatis refresh token
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expired * 1000 < currentDate.getTime()) { // (expired * 1000) krn satuan masih dalam milisecond
            const res = await axios.get('http://localhost:8000/token');
            config.headers.Authorization = `Bearer ${res.data.accessToken}`;
            setToken(res.data.accessToken);
            const decoded = jwt_decode(res.data.accessToken);
            setExpired(decoded.exp);
            setName(decoded.name);
            setUserId(decoded.userId);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    return (
        <AuthContext.Provider value={
            {
                token,
                name,
                userId,
                refreshToken,
                axiosJWT,
                logout
            }
        }> {children} </AuthContext.Provider>
    )
}