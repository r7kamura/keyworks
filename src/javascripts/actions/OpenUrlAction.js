import Action from "../actions/Action";

export default class OpenUrlAction extends Action {
  static hasValue = true;

  run() {
    location.href = this.value;
  }
}
