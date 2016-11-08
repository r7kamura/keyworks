import Action from "../actions/Action";

export default class GoBackAction extends Action {
  run() {
    history.back();
  }
}
