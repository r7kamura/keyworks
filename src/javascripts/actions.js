import CopyToClipboardAction from "./actions/CopyToClipboardAction";
import GoBackAction from "./actions/GoBackAction";
import GoForwardAction from "./actions/GoForwardAction";
import OpenUrlAction from "./actions/OpenUrlAction";
import ScrollDownAction from "./actions/ScrollDownAction";
import ScrollUpAction from "./actions/ScrollUpAction";

const actions = {
  CopyToClipboard: CopyToClipboardAction,
  GoBack: GoBackAction,
  GoForward: GoForwardAction,
  OpenUrl: OpenUrlAction,
  ScrollDown: ScrollDownAction,
  ScrollUp: ScrollUpAction,
};

export default actions;
