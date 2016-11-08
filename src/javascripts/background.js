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

chrome.runtime.onInstalled.addListener(() => {
  const defaultSettings = {
    actionDefinitions: {
      "Ctrl+L": {
        template: "${title} ${url}",
        type: "CopyToClipboardAction",
      },
      "Ctrl+M": {
        template: "[${title}](${url})",
        type: "CopyToClipboardAction",
      },
    },
  };
  chrome.storage.sync.get("settings", ({ settings }) => {
    if (!settings) {
      chrome.storage.sync.set({ settings: defaultSettings });
    }
  });
});
