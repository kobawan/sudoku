import { ActionWithPayload } from "../../../consts";
import { PopupProps, PopupText } from "../../popup/Popup";
import { Action, Dispatch } from "redux";
import { GameButtonSize } from "../../buttons/Button";
import { checkSvg } from "../../svg/Icons";
import { updateGameState, toggleSideMenu } from "../../game-page/ducks/actions";
import { GameState } from "../../game-page/ducks/reducer";

export const SHOW_POPUP = "@popup/SHOW_POPUP";
export const HIDE_POPUP = "@popup/HIDE_POPUP";

export type ShowPopupAction = ActionWithPayload<typeof SHOW_POPUP, Omit<PopupProps, "hidden">>;
export const showPopup = (payload: Omit<PopupProps, "hidden">): ShowPopupAction => ({
  type: SHOW_POPUP,
  payload,
});

export type HidePopupAction = Action<typeof HIDE_POPUP>;
export const hidePopup = (): HidePopupAction => ({
  type: HIDE_POPUP,
});

export const showWinPopup = (dispatch: Dispatch) => {
  dispatch(showPopup({
    text: PopupText.Win,
    buttons: [{
      size: GameButtonSize.Small,
      icon: checkSvg,
      onClick: () => dispatch(hidePopup()),
    }],
  }));
};

export const showCheckPopup = (dispatch: Dispatch, hasDuplicates: boolean) => {
  dispatch(showPopup({
    text: hasDuplicates ? PopupText.Duplicates : PopupText.Check,
    buttons: [{
      size: GameButtonSize.Small,
      icon: checkSvg,
      onClick: () => dispatch(hidePopup()),
    }],
  }));
};

export const showResetPopup = (dispatch: Dispatch<any>) => {
  dispatch(toggleSideMenu());
  dispatch(showPopup({
    text: PopupText.Reset,
    buttons: [
      {
        size: GameButtonSize.Small,
        value: "Yes",
        onClick: () => dispatch(updateGameState(GameState.New)),
      },
      {
        size: GameButtonSize.Small,
        value: "No",
        onClick: () => dispatch(hidePopup()),
      },
    ],
  }));
};

export const showSolvePopup = (dispatch: Dispatch<any>) => {
  dispatch(toggleSideMenu());
  dispatch(showPopup({
    text: PopupText.Solve,
    buttons: [
      {
        size: GameButtonSize.Small,
        value: "Yes",
        onClick: () => dispatch(updateGameState(GameState.GameOver)),
      },
      {
        size: GameButtonSize.Small,
        value: "No",
        onClick: () => dispatch(hidePopup()),
      },
    ],
  }));
};
