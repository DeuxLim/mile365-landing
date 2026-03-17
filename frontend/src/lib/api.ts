import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
	baseURL: `${baseURL}/api`,
	withCredentials: true,
	withXSRFToken: true,
	xsrfCookieName: "XSRF-TOKEN",
	xsrfHeaderName: "X-XSRF-TOKEN",
	headers: {
		Accept: "application/json",
		"X-Requested-With": "XMLHttpRequest",
	},
});

export const sanctum = axios.create({
	baseURL,
	withCredentials: true,
	xsrfCookieName: "XSRF-TOKEN",
	xsrfHeaderName: "X-XSRF-TOKEN",
	headers: {
		Accept: "application/json",
		"X-Requested-With": "XMLHttpRequest",
	},
});

export async function ensureCsrf() {
	await sanctum.get("/sanctum/csrf-cookie");
	const res = await api.get<{ csrfToken: string }>("/csrf-token");
	api.defaults.headers.common["X-CSRF-TOKEN"] = res.data.csrfToken;
	return res.data.csrfToken;
}
