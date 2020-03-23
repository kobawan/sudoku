import debounce from "lodash.debounce";
import { AppThunkMiddleware } from "../../consts";
import {
  TOGGLE_CELL_MODE,
  HIGHLIGHT_CELLS,
  SET_CELL_VALUE,
  SET_GAME_PHASE,
  SET_CELL_PROPS,
  RESET_GAME_TOOLS,
  SET_GAME_STATE,
} from "../../components/game-page/ducks/actions";
import { SET_CURRENT_GAME, save } from "../../components/app/ducks/actions";

const shouldSaveOnActions = [
  TOGGLE_CELL_MODE,
  HIGHLIGHT_CELLS,
  SET_CELL_VALUE,
  SET_GAME_PHASE,
  SET_CELL_PROPS,
  RESET_GAME_TOOLS,
  SET_GAME_STATE,
  SET_CURRENT_GAME,
];

const withDebounce = debounce(func => func(), 1000, {
  leading: false,
  trailing: true,
});

export const autoSave: AppThunkMiddleware = ({
  dispatch,
}) => next => action => {
  if (shouldSaveOnActions.includes(action.type)) {
    withDebounce(() => dispatch(save()));
  }

  return next(action);
};
