import axios from "axios";
import {
	clearAdminAuthToken,
	getAdminApiToken,
} from "@/lib/admin-auth-token";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const publicApi = axios.create({
	baseURL: `${baseURL}/api`,
	headers: {
		Accept: "application/json",
	},
});

export const adminApi = axios.create({
	baseURL: `${baseURL}/api`,
	headers: {
		Accept: "application/json",
	},
});

adminApi.interceptors.request.use((config) => {
	const token = getAdminApiToken();
	if (token) {
		config.headers = config.headers ?? {};
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

adminApi.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error?.response?.status === 401) {
			clearAdminAuthToken();
		}
		return Promise.reject(error);
	},
);
