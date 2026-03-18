import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

// Only enable HTTPS if certs exist (local dev only)
const httpsConfig =
	fs.existsSync("./certs/mile365runclub.test+1-key.pem") &&
	fs.existsSync("./certs/mile365runclub.test+1.pem")
		? {
				key: fs.readFileSync("./certs/mile365runclub.test+1-key.pem"),
				cert: fs.readFileSync("./certs/mile365runclub.test+1.pem"),
			}
		: undefined;

export default defineConfig({
	plugins: [react(), tailwindcss()],

	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},

	server: {
		host: "mile365runclub.test",
		port: 5173,
		https: httpsConfig,
	},
});
