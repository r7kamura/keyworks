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
    const string = this.format({ title, url });
    this.copyToClipboard(string);
  }

  copyToClipboard (string) {
    const textarea = document.createElement("textarea");
    textarea.style.cssText = "position: absolute; left: -100%";
    document.body.appendChild(textarea);
    textarea.value = string;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  format(variables) {
    return Object.keys(variables).reduce((result, variableName) => {
      return result.replace("${" + variableName  + "}", variables[variableName]);
    }, this.template);
  }
}

chrome.runtime.onMessage.addListener(({ keyString, title, url }) => {
  const actionDefinitionsTable = getActionDefinitionsTable();
  const actionDefinition = actionDefinitionsTable[keyString];
  if (actionDefinition) {
    Action.create(actionDefinition).run({ title, url });
  }
});
