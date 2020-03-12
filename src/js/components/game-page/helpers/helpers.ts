import { TableCellsMap, CellMode, CellProps } from "../../../consts";
import { getStorageKey, StorageKeys } from "../../../utils/localStorage";

/**
 * Assigns new game values to corresponding cells.
 */
export const getNewCellProps = (values: number[]) => {
  const cellProps: TableCellsMap = {};
  values.forEach((value, key) => {
    const isReadOnlyCell = value !== 0;

    cellProps[key] = {
      value,
      withHighlight: false,
      withError: false,
      mode: isReadOnlyCell ? CellMode.ReadOnly : CellMode.Pencil,
    };
  });
  return cellProps;
};

/**
 * Assigns end game values to corresponding cells.
 */
export const getEndgameCellProps = (
  values: number[],
  currentCellProps: TableCellsMap
) => {
  const cellProps: TableCellsMap = {};
  values.forEach((value, key) => {
    const isReadOnlyCell =
      currentCellProps[key] && currentCellProps[key].mode === CellMode.ReadOnly;

    cellProps[key] = {
      value,
      withHighlight: false,
      withError: false,
      mode: isReadOnlyCell ? CellMode.ReadOnly : CellMode.Pencil,
    };
  });
  return cellProps;
};

/**
 * Resets highlights and updates errors if enabled in settings
 */
export const resetCellStatus = (
  cellProps: TableCellsMap,
  duplicates: number[]
) => {
  const newCellProps: TableCellsMap = {};
  const disableInGameError = getStorageKey(StorageKeys.DisableInGameError);
  const disableHighlighting = getStorageKey(StorageKeys.DisableHighlighting);

  if (disableHighlighting && disableInGameError) {
    return undefined;
  }

  for (const key in cellProps) {
    if (cellProps.hasOwnProperty(key)) {
      const pos = +key;
      newCellProps[pos] = {
        ...cellProps[pos],
        withHighlight: false,
        withError: disableInGameError ? false : duplicates.includes(pos),
      };
    }
  }

  return newCellProps;
};

export const updateCellsCellMode = (
  cellProps: TableCellsMap,
  cellMode: CellMode
) => {
  const newCellProps: TableCellsMap = {};
  for (const key in cellProps) {
    if (cellProps.hasOwnProperty(key)) {
      const props = cellProps[key];
      newCellProps[key] = props.value ? props : { ...props, mode: cellMode };
    }
  }

  return newCellProps;
};

/**
 * Checks if there are empty cells or in notes mode
 */
export const hasInvalidEndgameCells = (cellProps: TableCellsMap) => {
  for (const key in cellProps) {
    if (
      (cellProps.hasOwnProperty(key) &&
        cellProps[key].mode === CellMode.Notes) ||
      !cellProps[key].value
    ) {
      return true;
    }
  }
  return false;
};

export const isCellHighlightable = (cell: CellProps) => {
  return !!cell.value && cell.mode !== CellMode.Notes;
};

export const canAutomaticallyUpdateNotesCells = ({
  cellMode,
  selectedCell,
}: {
  cellMode: CellMode;
  selectedCell: CellProps;
}) => {
  const disableAutoNotesRemoval = getStorageKey(
    StorageKeys.DisableAutoNotesRemoval
  );
  return (
    cellMode === CellMode.Pencil &&
    selectedCell.mode === CellMode.Pencil &&
    selectedCell.value &&
    !disableAutoNotesRemoval
  );
};

/**
 * Highlights pencil cells that have same value
 */
export const updateCellsHighlight = (
  cellProps: TableCellsMap,
  selectedCell: CellProps
) => {
  const newCellProps: TableCellsMap = {};

  for (const key in cellProps) {
    if (cellProps.hasOwnProperty(key)) {
      const matchesValue =
        cellProps[key].mode !== CellMode.Notes &&
        selectedCell.value === cellProps[key].value;
      newCellProps[key] = {
        ...cellProps[key],
        withHighlight: isCellHighlightable(selectedCell) && matchesValue,
      };
    }
  }

  return newCellProps;
};
