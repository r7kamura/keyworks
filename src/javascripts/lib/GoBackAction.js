import Action from "../lib/Action";

export default class GoBackAction extends Action {
  run() {
    history.back();
  }
}
