import Action from "../actions/Action";

export default class ScrollDownAction extends Action {
  run() {
    window.scrollBy(0, 100);
  }
}
