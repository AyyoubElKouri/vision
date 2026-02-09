/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import { useEffect, useState } from "react";

import type { IdeaDto } from "../contracts/idea.contract";
import { PlusIcon } from "./components/icons";
import { Idea } from "./components/idea";

// TODO: To be implemented later
const toast = (message: string) => {
	alert(message);
};

/**
 * @internal helper to determine the position of an idea in the list for styling purposes.
 */
function getPosition(index: number, length: number) {
	if (index === 0) return "start";
	if (index === length - 1) return "end";
	return "middle";
}

/**
 * Main page component for the Idea app. It fetches and renders the list of ideas,
 * and handles all interactions (swap, delete, update) by calling the appropriate API methods
 * and refreshing the list.
 */
export function IdeaPage() {
	const [ideas, setIdeas] = useState<IdeaDto[]>([]);

	// Loads the list of ideas from the main process and updates the state.
	const loadIdeas = async () => {
		try {
			const data = await window.api.ideas.getAll();
			setIdeas(data);
		} catch (err) {
			toast(err instanceof Error ? err.message : "Failed to load ideas");
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <load ideas only on mount one time>
	useEffect(() => {
		void loadIdeas();
	}, []);

	// Handler for creating a new idea. It calls the create API and then reloads the list.
	const onCreate = async () => {
		try {
			await window.api.ideas.create({});
			await loadIdeas();
		} catch (err) {
			toast(err instanceof Error ? err.message : "Failed to create idea");
		}
	};

	// Handler for swapping an idea up or down. It calls the swap API and then reloads the list.
	const onSwap = async (id: number, to: "up" | "down") => {
		try {
			await window.api.ideas.swap({ id, to });
			await loadIdeas();
		} catch (err) {
			toast(err instanceof Error ? err.message : "Failed to swap idea");
		}
	};

	// Handler for deleting an idea. It calls the delete API and then reloads the list.
	const onDelete = async (id: number) => {
		try {
			await window.api.ideas.delete(id);
			await loadIdeas();
		} catch (err) {
			toast(err instanceof Error ? err.message : "Failed to delete idea");
		}
	};

	// Handler for updating the title of an idea. It calls the update API and then reloads the list.
	const onUpdateTitle = async (id: number, newTitle: string) => {
		try {
			await window.api.ideas.update({ id, title: newTitle });
			await loadIdeas();
		} catch (err) {
			toast(err instanceof Error ? err.message : "Failed to update title");
		}
	};

	// Handler for updating the description of an idea. It calls the update API and then reloads.
	const onUpdateDescription = async (id: number, newDescription: string) => {
		try {
			await window.api.ideas.update({ id, description: newDescription });
			await loadIdeas();
		} catch (err) {
			toast(
				err instanceof Error ? err.message : "Failed to update description",
			);
		}
	};

	return (
		<div className="w-full h-full text-white p-6 flex flex-col gap-6 overflow-auto">
			{/* --- Title and description --- */}
			<header>
				<h1 className="text-2xl font-semibold text-white/80">Ideas</h1>
				<p className="text-sm font-medium text-white/50 mb-2">
					Write down your brilliant ideas, your vision, your dreams, or anything
					you want to remember, and make your future self proud.
				</p>
				<div className="w-full h-px bg-white/20" />
			</header>

			{/* --- List of Ideas --- */}
			<div className="flex flex-col overflow-auto hide-scrollbar">
				{ideas.map((idea, index) => (
					<Idea
						key={idea.id}
						number={idea.number}
						title={idea.title}
						description={idea.description}
						position={getPosition(index, ideas.length)}
						colorToggle={index % 2 === 0}
						up={() => onSwap(idea.id, "up")}
						down={() => onSwap(idea.id, "down")}
						delete={() => onDelete(idea.id)}
						updateTitle={(newTitle) => onUpdateTitle(idea.id, newTitle)}
						updateDescription={(newDescription) =>
							onUpdateDescription(idea.id, newDescription)
						}
					/>
				))}
			</div>

			{/* --- Button to add a new idea --- */}
			<button
				type="button"
				className="w-full h-6.5 min-h-6.5 bg-[#0D0D0D] border-[0.5px] border-[#363636] flex justify-center items-center hover:bg-[#0A0A0A] rounded text-[#2A2A2A] transition-colors"
				onClick={onCreate}
			>
				<PlusIcon />
			</button>
		</div>
	);
}
