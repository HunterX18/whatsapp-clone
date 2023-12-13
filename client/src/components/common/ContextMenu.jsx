import React from "react";
import { useRef, useEffect } from "react";

function ContextMenu({ options, coordinates, contextMenu, setContextMenu }) {
	const contextMenuRef = useRef(null);

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (event.target.id !== "context-opener") {
				if (
					contextMenuRef.current &&
					!contextMenuRef.current.contains(event.target)
				) {
					setContextMenu(false);
				}
			}
		};
		document.addEventListener("click", handleOutsideClick);

		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	}, []);

	const handleClick = (e, callback) => {
		e.stopPropagation();
		setContextMenu(false);
		callback();
	};
	return (
		<div
			className={"bg-dropdown-background fixed py-2 z-[100] shadow-xl"}
			ref={contextMenuRef}
			style={{
				top: coordinates.y,
				left: coordinates.x,
			}}
		>
			<ul>
				{options.map((option) => {
					return (
						<li
							className="px-5 py-2 cursor-pointer hover:bg-background-default-hover text-white"
							key={option.name}
							onClick={(e) => handleClick(e, option.callback)}
						>
							{option.name}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default ContextMenu;
