import CopyToClipboardAction from "./actions/CopyToClipboardAction";
import GoBackAction from "./actions/GoBackAction";
import GoForwardAction from "./actions/GoForwardAction";
import OpenUrlAction from "./actions/OpenUrlAction";
import OpenUrlInNewTabAction from "./actions/OpenUrlInNewTabAction";
import ScrollDownAction from "./actions/ScrollDownAction";
import ScrollUpAction from "./actions/ScrollUpAction";

const actions = {
  CopyToClipboard: CopyToClipboardAction,
  GoBack: GoBackAction,
  GoForward: GoForwardAction,
  OpenUrl: OpenUrlAction,
  OpenUrlInNewTab: OpenUrlInNewTabAction,
  ScrollDown: ScrollDownAction,
  ScrollUp: ScrollUpAction,
};

export default actions;
