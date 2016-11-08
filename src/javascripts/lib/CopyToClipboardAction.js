import { copyToClipboard } from "../lib/clipboard";
import { format } from "../lib/template";
import Action from "../lib/Action";

export default class CopyToClipboardAction extends Action {
  constructor({ template }) {
    super();
    this.template = template;
  }

  run() {
    copyToClipboard(
      format(
        this.template,
        {
          title: document.title,
          url: location.href,
        }
      )
    );
  }
}
