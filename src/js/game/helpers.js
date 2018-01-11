export const isEmptyCell = (cell) => {
	return cell.value === cell.defaultValue;
};

export const isReadOnlyCell = (cell) => {
	return cell.readOnly;
};

export const isNotesCell = (cell) => {
	return cell.maxLength === 9;
};

export const isPencilCell = (cell) => {
	return cell.maxLength === 1;
};

export const isPencilModeSelected = () => {
	return document.querySelector("input[value=Pencil]")
		.classList.contains("selected");
};
