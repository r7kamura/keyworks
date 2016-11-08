import Action from "../lib/Action";

export default class GoForwardAction extends Action {
  run() {
    history.forward();
  }
}
