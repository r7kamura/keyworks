import Action from "../actions/Action";

export default class OpenUrlInNewTabAction extends Action {
  static hasValue = true;

  run() {
    window.open(this.value, "_blank");
  }
}
