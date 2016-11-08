import Action from "../lib/Action";

export default class ScrollDownAction extends Action {
  run() {
    window.scrollBy(0, 100);
  }
}
