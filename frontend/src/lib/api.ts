import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
	baseURL: `${baseURL}/api`,
	withCredentials: true,
	withXSRFToken: true,
	headers: {
		Accept: "application/json",
	},
});

export const sanctum = axios.create({
	baseURL,
	withCredentials: true,
});
