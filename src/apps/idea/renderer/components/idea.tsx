/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import { useEffect, useRef, useState } from "react";

import { DeleteIcon, DownIcon, UpIcon } from "./icons";

// Renders one idea row with inline editing for title/description.
interface IdeaProps {
  /**
   * Data to be rendered for this idea.
   */
	number: number;
	title: string;
	description: string;

  /**
   * Position and colorToggle for styling purposes (e.g., zebra background, rounded corners).
   */
	position: "start" | "middle" | "end";
	colorToggle: boolean;

  /**
   * Callbacks for the action buttons and inline edits.
   */
	up: () => void;
	down: () => void;
	delete: () => void;
	updateTitle: (newTitle: string) => void;
	updateDescription: (newDescription: string) => void;
}

export function Idea({
	number,
	title,
	description,
	position,
	colorToggle,
	up,
	down,
	delete: del,
	updateTitle,
	updateDescription,
}: IdeaProps) {
	// Inline edit state: which field is active and its draft value.
	const [editingField, setEditingField] = useState<
		"title" | "description" | null
	>(null);
	const [draft, setDraft] = useState("");
	const inputRef = useRef<HTMLInputElement | null>(null);

	// Autofocus the input when entering edit mode (without selecting text).
	useEffect(() => {
		if (editingField && inputRef.current) {
			inputRef.current.focus();
		}
	}, [editingField]);

	// Enter edit mode for a specific field with the current value.
	const startEdit = (field: "title" | "description") => {
		setEditingField(field);
		setDraft(field === "title" ? title : description);
	};

	// Commit the draft to the correct updater and exit edit mode.
	const commitEdit = () => {
		if (!editingField) return;
		const value = draft.trimEnd();

    // Value must not be empty.
    if (value.length === 0) {
      setEditingField(null);
      return;
    }

		if (editingField === "title") updateTitle(value);
		if (editingField === "description") updateDescription(value);
		setEditingField(null);
	};

	return (
		<div
			// Layout + zebra background + rounded corners for first/last rows.
			className={`w-full ${position === "end" ? "h-20.75 min-h-20.75" : "h-20.5 min-h-20.5"} overflow-hidden group flex ${colorToggle ? "bg-[#0A0A0A]" : "bg-[#0D0D0D]"} border-x-[0.5px] border-t-[0.5px] border-[#2A2A2A] ${position === "start" ? "rounded-t-lg" : position === "end" ? "rounded-b-lg" : ""} ${position === "end" && "border-b-[0.5px]"}`}
		>
			{/* --- The number --- */}
			<div className="w-11 min-w-11 h-full bg-[#080808] border-r-[0.5px] border-[#363636] flex items-center justify-center text-[28px] text-[#2A2A2A]">
				{number}
			</div>

			{/* --- The title and description --- */}
			<div className="w-full min-w-0 flex flex-col justify-center pl-3.75">
				{editingField ? (
					// Single input swaps in for either title or description.
					<input
						ref={inputRef}
						value={draft}
						onChange={(event) => setDraft(event.target.value)}
						onBlur={commitEdit}
						onKeyDown={(event) => {
							if (event.key === "Enter") commitEdit();
							if (event.key === "Escape") setEditingField(null);
						}}
						className="w-full bg-[#0E0E0E] border-[0.5px] border-[#2A2A2A] rounded px-2.5 py-1.5 text-[16px] text-[#B5B5B5] outline-none focus:border-[#3A3A3A] idea-inline-edit"
					/>
				) : (
					<>
						{/* Truncate long text to keep row height stable. */}
						<h2
							onDoubleClick={() => startEdit("title")}
							className="text-[18px] font-medium text-[#B5B5B5] cursor-text truncate w-full"
						>
							{title}
						</h2>
						<p
							onDoubleClick={() => startEdit("description")}
							className="text-[16px] font-normal text-[#A8A8A8] cursor-text truncate w-full"
						>
							{description}
						</p>
					</>
				)}
			</div>

			{/* --- The action buttons --- */}
			{/* Hidden until hover to keep the row clean. */}
			<div className="flex flex-col items-center opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 group-hover:pointer-events-auto">
				<UpIcon callback={up} />
				<DeleteIcon callback={del} />
				<DownIcon callback={down} />
			</div>
		</div>
	);
}
