import { AppMiddleware } from "../../consts";
import { isNetworkError } from "../../utils/server";
import { showPopup, hidePopup } from "../../components/popup/ducks/actions";
import { removeError, SET_ERROR } from "../../components/app/ducks/actions";
import { PopupText } from "../../components/popup/Popup";
import { GameButtonSize } from "../../components/buttons/Button";
import { checkSvg } from "../../components/svg/Icons";

export const network: AppMiddleware = ({ dispatch }) => next => action => {
  if (action.type === SET_ERROR && isNetworkError(action.payload.message)) {
    dispatch(
      showPopup({
        text: PopupText.NetworkError,
        buttons: [
          {
            size: GameButtonSize.Small,
            icon: checkSvg,
            onClick: () => {
              dispatch(hidePopup());
              dispatch(removeError({ message: action.payload.message }));
            },
          },
        ],
      })
    );
  }

  return next(action);
};
