import { detectKeyString } from "key-string";

const getTitle = () => {
  return document.title;
};

const getUrl = () => {
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
  sendMessage({
    keyString: detectKeyString(event),
    title: getTitle(),
    url: getUrl(),
  });
});
