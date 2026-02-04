import React from "react";
import { createRoot } from "react-dom/client";
import App from "./shell/app";

// biome-ignore lint/style/noNonNullAssertion: <root element is guaranteed to exist>
createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
