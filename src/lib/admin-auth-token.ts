const ADMIN_API_TOKEN_KEY = "admin_api_token";
const ADMIN_AUTH_CLEARED_EVENT = "admin-auth-cleared";

function canUseStorage() {
	return typeof window !== "undefined" && !!window.localStorage;
}

export function getAdminApiToken(): string | null {
	if (!canUseStorage()) return null;
	try {
		return window.localStorage.getItem(ADMIN_API_TOKEN_KEY);
	} catch {
		return null;
	}
}

export function setAdminApiToken(token: string) {
	if (!canUseStorage()) return;
	try {
		window.localStorage.setItem(ADMIN_API_TOKEN_KEY, token);
	} catch {
		// ignore storage failures
	}
}

export function clearAdminApiToken() {
	if (!canUseStorage()) return;
	try {
		window.localStorage.removeItem(ADMIN_API_TOKEN_KEY);
	} catch {
		// ignore storage failures
	}
}

export function clearAdminAuthToken() {
	clearAdminApiToken();
	if (typeof window !== "undefined") {
		window.dispatchEvent(new Event(ADMIN_AUTH_CLEARED_EVENT));
	}
}
