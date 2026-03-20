import { createContext } from "react";

type ToastType = "success" | "error" | "info";

interface ToastOptions {
	type?: ToastType;
	duration?: number;
}

interface ToastContextValue {
	showToast: (message: string, options?: ToastOptions) => void;
	success: (message: string, options?: ToastOptions) => void;
	error: (message: string, options?: ToastOptions) => void;
	info: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export default ToastContext;
