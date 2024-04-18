import { useState } from "react";

type stateType = {
	[key: string]: boolean;
};

type itemsType = string[];

export const useMultipleToggles = (items: itemsType) => {
	const [activeState, setActiveState] = useState<stateType>(
		Object.fromEntries(items.map((i) => [i, false]))
	);
	const toggleState = (key: itemsType[number]) => {
		setActiveState((prevState: stateType) => {
			const newState: Partial<stateType> = {};
			Object.keys(prevState).forEach((k) => {
				newState[k as keyof stateType] = k === key ? !prevState[k] : false;
			});
			return newState as stateType;
		});
	};
	return { activeState, toggleState };
};
