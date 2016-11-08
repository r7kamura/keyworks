import CopyToClipboardAction from "./lib/CopyToClipboardAction.js";

const getSettings = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get("settings", ({ settings }) => {
      resolve(settings);
    });
  });
};

chrome.runtime.onMessage.addListener(({ keyString, title, url }) => {
  getSettings().then((settings) => {
    const actionDefinition = settings.actionDefinitions[keyString];
    switch (actionDefinition.type) {
    case "CopyToClipboardAction":
      new CopyToClipboardAction(actionDefinition).run({ title, url });
    }
  });
});
