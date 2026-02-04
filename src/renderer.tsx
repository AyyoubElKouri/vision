/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./shell/app";

// biome-ignore lint/style/noNonNullAssertion: <root element is guaranteed to exist>
createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
