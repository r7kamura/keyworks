import { detectKeyString } from "key-string";
import CopyToClipboardAction from "./lib/CopyToClipboardAction";
import ScrollDownAction from "./lib/ScrollDownAction";
import ScrollUpAction from "./lib/ScrollUpAction";

const getSettings = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get("settings", ({ settings }) => {
      resolve(settings);
    });
  });
};

getSettings().then((settings) => {
  window.addEventListener("keydown", (event) => {
    const keyString = detectKeyString(event);
    const actionDefinition = settings.actionDefinitions[keyString];
    if (actionDefinition) {
      switch (actionDefinition.type) {
      case "CopyToClipboard":
        new CopyToClipboardAction(actionDefinition).run();
        break;
      case "ScrollDown":
        new ScrollDownAction(actionDefinition).run();
        break;
      case "ScrollUp":
        new ScrollUpAction(actionDefinition).run();
        break;
      }
    }
  });
});
