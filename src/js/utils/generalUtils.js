/**
 * Get all table cell elements from game
 */
const getInputElements = () => {
	const inputElements = [];
	for (let i=1; i<=81; i++) {
		inputElements[i-1] = document.getElementById("input" + i);
	}
	return inputElements;
};

/**
 * Array of cell elements
 */
export const inputEl = getInputElements();

/**
 * Reset cell elements to default state
 */
export const resetCells = () => {
	inputEl.forEach( el => {
		el.value = el.defaultValue;
		el.readOnly = false;
		el.classList = "";
	});
};

export const compose = (...fns) => fns.reduce(
	(f, g) => (...args) => f(g(...args))
);

export const removeDuplicates = (arr) => {
	if (arr.length !== 1) {
		for (let pos = 0; pos < arr.length; pos++) {
			for (let next = 1; next < arr.length - pos; next++) {
				if (arr[pos] == arr[pos+next]) {
					arr.splice(pos + next, 1);
				}
			}
		}
	}
	return arr;
};
