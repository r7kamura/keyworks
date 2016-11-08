import { copyToClipboard } from "./lib/clipboard.js";
import { format } from "./lib/template.js";

const getActionDefinitionsTable = () => {
  return {
    "Ctrl+L": {
      template: "${title} ${url}",
      type: "CopyToClipboardAction",
    },
    "Ctrl+M": {
      template: "[${title}](${url})",
      type: "CopyToClipboardAction",
    },
  };
};

class Action {
  static create(definition) {
    switch (definition.type) {
    case "CopyToClipboardAction":
      return new CopyToClipboardAction(definition);
    }
  }

  run() {}
}

class CopyToClipboardAction extends Action {
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

chrome.runtime.onMessage.addListener(({ keyString, title, url }) => {
  const actionDefinitionsTable = getActionDefinitionsTable();
  const actionDefinition = actionDefinitionsTable[keyString];
  if (actionDefinition) {
    Action.create(actionDefinition).run({ title, url });
  }
});
