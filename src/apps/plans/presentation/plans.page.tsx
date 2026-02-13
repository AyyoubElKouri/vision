/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import { useEffect, useState } from "react";

/**
 * Main page component for the Plans app.
 */
export function PlansPage() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    window.api.plans
      .hello()
      .then(setMessage)
      .catch(() => setMessage("Failed to load"));
  }, []);

  return (
    <div className="w-full h-full text-white p-6 flex flex-col gap-6 overflow-auto">
      <header>
        <h1 className="text-2xl font-semibold text-white/80">Plans</h1>
        <p className="text-sm font-medium text-white/50 mb-2">
          {message || "Loading..."}
        </p>
        <div className="w-full h-px bg-white/20" />
      </header>
    </div>
  );
}
