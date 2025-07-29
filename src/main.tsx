import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/index.css";
import { GlobalDataProvider } from "./contexts/GlobalDataContext";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<GlobalDataProvider>
			<App />
		</GlobalDataProvider>
	</StrictMode>
);
