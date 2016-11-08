import { detectKeyString } from "key-string";

const getPageTitle = () => {
  return document.title;
};

const getPageUrl = () => {
  return location.href;
};

const sendMessage = (message) => {
  chrome.runtime.sendMessage(
    chrome.runtime.id,
    message,
    {}
  );
};

window.addEventListener("keydown", (event) => {
  const keyString = detectKeyString(event);
  if (keyString === "Ctrl+M") {
    sendMessage({
      string: `[${getPageTitle()}](${getPageUrl()})`,
    });
  } else if (keyString === "Ctrl+L") {
    sendMessage({
      string: `${getPageTitle()} ${getPageUrl()}`,
    });
  }
});
