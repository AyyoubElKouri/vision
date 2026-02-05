/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import { useState } from "react";

interface HandlerProps {
	callback?: () => void;
}

export function UpIcon({ callback }: HandlerProps) {
	const [hover, setHover] = useState<boolean>(false);

	return (
		<svg
			width="27"
			height="27"
			viewBox="0 0 27 27"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			onClick={callback}
			onKeyDown={() => {}}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<title>Up Icon</title>
			<mask id="path-1-inside-1_11_108" fill="white">
				<path d="M0 0H27V27H0V0Z" />
			</mask>
			<path d="M0 0H27V27H0V0Z" fill="#080808" />
			<path
				d="M0 27H-0.5V27.5H0V27ZM27 27V26.5H0V27V27.5H27V27ZM0 27H0.5V0H0H-0.5V27H0Z"
				fill="#363636"
				mask="url(#path-1-inside-1_11_108)"
			/>
			<path
				d="M21 13.5C21 14.86 20.665 16.115 19.995 17.265C19.325 18.415 18.415 19.325 17.265 19.995C16.115 20.665 14.86 21 13.5 21C12.14 21 10.885 20.665 9.735 19.995C8.585 19.325 7.675 18.415 7.005 17.265C6.335 16.115 6 14.86 6 13.5C6 12.14 6.335 10.885 7.005 9.735C7.675 8.585 8.585 7.675 9.735 7.005C10.885 6.335 12.14 6 13.5 6C14.86 6 16.115 6.335 17.265 7.005C18.415 7.675 19.325 8.585 19.995 9.735C20.665 10.885 21 12.14 21 13.5ZM15.5 15.5L16.98 15.5L16.98 14.205L13.5 10.71L10.02 14.205L10 15.5L11.5 15.5L13.5 13.5L15.5 15.5Z"
				fill={hover ? "#6592FC" : "#2A2A2A"}
			/>
		</svg>
	);
}

export function DeleteIcon({ callback }: HandlerProps) {
	const [hover, setHover] = useState<boolean>(false);

	return (
		<svg
			width="27"
			height="27"
			viewBox="0 0 27 27"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			onClick={callback}
			onKeyDown={() => {}}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<title>Delete Icon</title>
			<mask id="path-1-inside-1_11_111" fill="white">
				<path d="M0 0H27V27H0V0Z" />
			</mask>
			<path d="M0 0H27V27H0V0Z" fill="#080808" />
			<path
				d="M0 27H-0.5V27.5H0V27ZM27 27V26.5H0V27V27.5H27V27ZM0 27H0.5V0H0H-0.5V27H0Z"
				fill="#363636"
				mask="url(#path-1-inside-1_11_111)"
			/>
			<path
				d="M13.5 6C9.35455 6 6 9.35455 6 13.5C6 17.6455 9.35455 21 13.5 21C17.6455 21 21 17.6455 21 13.5C21 9.35455 17.6455 6 13.5 6ZM16.8273 15.6273C17.1545 15.9545 17.1545 16.5 16.8273 16.8273C16.6636 16.9909 16.4455 17.0727 16.2273 17.0727C16.0091 17.0727 15.7909 16.9909 15.6273 16.8273L13.5 14.7L11.3727 16.8273C11.2091 16.9909 10.9909 17.0727 10.7727 17.0727C10.5545 17.0727 10.3364 16.9909 10.1727 16.8273C10.0161 16.6668 9.92848 16.4515 9.92848 16.2273C9.92848 16.0031 10.0161 15.7877 10.1727 15.6273L12.3 13.5L10.1727 11.3727C9.84545 11.0455 9.84545 10.5 10.1727 10.1727C10.5 9.84545 11.0455 9.84545 11.3727 10.1727L13.5 12.3L15.6273 10.1727C15.9545 9.84545 16.5 9.84545 16.8273 10.1727C17.1545 10.5 17.1545 11.0455 16.8273 11.3727L14.7 13.5L16.8273 15.6273Z"
				fill={hover ? "#FC6565" : "#2A2A2A"}
			/>
		</svg>
	);
}

export function DownIcon({ callback }: HandlerProps) {
	const [hover, setHover] = useState<boolean>(false);

	return (
		<svg
			width="27"
			height="27"
			viewBox="0 0 27 27"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			onClick={callback}
			onKeyDown={() => {}}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<title>Down Icon</title>
			<mask id="path-1-inside-1_11_113" fill="white">
				<path d="M0 0H27V27H0V0Z" />
			</mask>
			<path d="M0 0H27V27H0V0Z" fill="#080808" />
			<path
				d="M0 27H0.5V0H0H-0.5V27H0Z"
				fill="#363636"
				mask="url(#path-1-inside-1_11_113)"
			/>
			<path
				d="M21 13.5C21 12.14 20.665 10.885 19.995 9.735C19.325 8.585 18.415 7.675 17.265 7.005C16.115 6.335 14.86 6 13.5 6C12.14 6 10.885 6.335 9.735 7.005C8.585 7.675 7.675 8.585 7.005 9.735C6.335 10.885 6 12.14 6 13.5C6 14.86 6.335 16.115 7.005 17.265C7.675 18.415 8.585 19.325 9.735 19.995C10.885 20.665 12.14 21 13.5 21C14.86 21 16.115 20.665 17.265 19.995C18.415 19.325 19.325 18.415 19.995 17.265C20.665 16.115 21 14.86 21 13.5ZM15.5 11.5L16.98 11.5L16.98 12.795L13.5 16.29L10.02 12.795L10 11.5L11.5 11.5L13.5 13.5L15.5 11.5Z"
				fill={hover ? "#68FC65" : "#2A2A2A"}
			/>
		</svg>
	);
}

export function PlusIcon({ callback }: HandlerProps) {
	const [hover, setHover] = useState<boolean>(false);

	return (
		<svg
			width="15"
			height="15"
			viewBox="0 0 15 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			onClick={callback}
			onKeyDown={() => {}}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<title>Add new idea</title>
			<path
				d="M9.14372 1.64104C9.14372 0.740079 8.40901 0 7.50268 0C6.59635 0 5.85627 0.740079 5.86164 1.64104V5.86164H1.64104C0.740079 5.86164 0 6.59635 0 7.50268C0 8.40365 0.740079 9.14372 1.64104 9.14372H5.86164V13.359C5.86164 14.2599 6.59635 15 7.50268 15C8.40365 15 9.14372 14.2653 9.14372 13.359V9.14372H13.359C14.2599 9.14372 15 8.40901 15 7.50268C15 6.60172 14.2653 5.86164 13.359 5.86164H9.14372V1.64104Z"
				fill={hover ? "#C27330" : "#2A2A2A"}
			/>
		</svg>
	);
}
