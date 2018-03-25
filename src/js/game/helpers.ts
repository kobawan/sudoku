export const isEmptyCell = (cell: HTMLTextAreaElement) => {
    return cell.value === cell.defaultValue;
};

export const isReadOnlyCell = (cell: HTMLTextAreaElement) => {
    return cell.readOnly;
};

export const isNotesCell = (cell: HTMLTextAreaElement) => {
    return cell.maxLength === 9;
};

export const isPencilCell = (cell: HTMLTextAreaElement) => {
    return cell.maxLength === 1;
};
