/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import { AnimatePresence, motion } from "framer-motion";

import "./app.css";

import { IdeaIcon } from "../apps/idea/renderer/idea.icon";

import { IdeaPage } from "../apps/idea/renderer/idea.page";
import { useNavStore } from "./navigation.store";

export function TestPage() {
  return (
    <div className="w-full h-full bg-red-950">
      Hello world
    </div>
  )
}

/**
 * Sidebar component that renders apps icons in a vertical layout.
 */
function Sidebar({ children }: { children?: React.ReactNode }) {
	return (
		<div className="w-18 h-full flex flex-col items-center gap-4 pt-4">
			{children}
		</div>
	);
}

/**
 * Main content area that displays the selected app's content.
 */
function MainContentArea({
	children,
	route,
}: {
	children?: React.ReactNode;
	route: string;
}) {
	return (
		<div className="w-full h-full overflow-hidden">
			<AnimatePresence mode="popLayout" initial={false}>
				<motion.div
					key={route}
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -50 }}
					transition={{
						type: "spring",
						stiffness: 260,
						damping: 24,
						mass: 0.6,
					}}
					className="w-full h-full"
				>
					<div className="w-full h-full bg-[#111010] border-x-[0.5px] border-[#363636]">
						{children}
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}

/**
 * Returns the content component for the given route.
 */
function getContentForRoute(route: string) {
	switch (route) {
		case "idea":
			return <IdeaPage />;
		default:
			return <div></div>;
	}
}

/**
 * Main application component that sets up the layout and navigation.
 */
export default function App() {
	const { route, setRoute } = useNavStore();

	return (
		<div className="w-full h-full bg-[#0A0A0A] flex">
			{/* --- Left sidebar --- */}
			<Sidebar>
				<IdeaIcon
					selected={route === "idea"}
					onClick={() => setRoute("idea")}
					label="Idea"
				/>
			</Sidebar>

			{/* --- Main content area --- */}
			<MainContentArea route={route}>
				{getContentForRoute(route)}
			</MainContentArea>

			{/* --- Right sidebar --- */}
			<Sidebar></Sidebar>
		</div>
	);
}
