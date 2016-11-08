import CopyToClipboardAction from "./lib/CopyToClipboardAction.js";

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

chrome.runtime.onMessage.addListener(({ keyString, title, url }) => {
  const actionDefinitionsTable = getActionDefinitionsTable();
  const actionDefinition = actionDefinitionsTable[keyString];
  switch (actionDefinition.type) {
  case "CopyToClipboardAction":
    new CopyToClipboardAction(actionDefinition).run({ title, url });
  }
});
