import Action from "../actions/Action";

export default class GoForwardAction extends Action {
  run() {
    history.forward();
  }
}
