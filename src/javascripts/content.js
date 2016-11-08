import { detectKeyString } from "key-string";

const format = (string) => {
  const variablesObject = getVariablesObject();
  return Object.keys(variablesObject).reduce((result, variableName) => {
    return result.replace("${" + variableName  + "}", variablesObject[variableName])
  }, string);
};

const getVariablesObject = () => {
  return {
    title: getTitle(),
    url: getUrl(),
  };
};

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
  const keyString = detectKeyString(event);
  if (keyString === "Ctrl+M") {
    sendMessage({
      string: format("[${title}](${url})"),
    });
  } else if (keyString === "Ctrl+L") {
    sendMessage({
      string: format("${title} ${url}"),
    });
  }
});
