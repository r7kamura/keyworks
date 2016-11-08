import { copyToClipboard } from "../lib/clipboard.js";
import { format } from "../lib/template.js";
import Action from "../lib/Action.js";

export default class CopyToClipboardAction extends Action {
  constructor({ template }) {
    super();
    this.template = template;
  }

  run({ title, url }) {
    copyToClipboard(
      format(
        this.template,
        {
          title,
          url,
        }
      )
    );
  }
}
