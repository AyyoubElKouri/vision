/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

/**
 * Plans app icon for the sidebar.
 */
export function PlansIcon({
  selected,
  onClick,
  label,
}: {
  selected: boolean;
  onClick?: () => void;
  label?: string;
}) {
  return (
    <div className="relative group flex items-center">
      <button
        type="button"
        onClick={onClick}
        className="cursor-pointer hover:opacity-80 active:scale-95 transition-all"
      >
        <svg
          width="45"
          height="45"
          viewBox="0 0 45 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Plans Icon</title>
          <rect
            x="0.25"
            y="0.25"
            width="44.5"
            height="44.5"
            rx="3.75"
            fill="#1A1E19"
          />
          <rect
            x="0.25"
            y="0.25"
            width="44.5"
            height="44.5"
            rx="3.75"
            stroke={selected ? "#ffffffff" : "#363636"}
            strokeWidth="0.5"
          />
          {/* TODO: Replace with your own icon SVG path */}
          <text
            x="22.5"
            y="26"
            textAnchor="middle"
            fill="#687069"
            fontSize="16"
            fontWeight="bold"
          >
            P
          </text>
        </svg>
      </button>

      {label ? (
        <div className="pointer-events-none absolute left-13.5 top-1/2 -translate-y-1/2 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150">
          <span className="px-2 py-1 text-[11px] tracking-[0.2em] uppercase bg-[#111010] border border-[#363636] text-[#D4D4D4] rounded">
            {label}
          </span>
        </div>
      ) : null}
    </div>
  );
}
