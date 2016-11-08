import { detectKeyString } from "key-string";

const formatWithVariables = (string) => {
  const variablesObject = getVariablesObject();
  return Object.keys(variablesObject).reduce((result, variableName) => {
    return result.replace("${" + variableName  + "}", variablesObject[variableName])
  }, string);
};

const getVariablesObject = () => {
  return {
    title: getPageTitle(),
    url: getPageUrl(),
  };
};

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
      string: formatWithVariables("[${title}](${url})"),
    });
  } else if (keyString === "Ctrl+L") {
    sendMessage({
      string: formatWithVariables("${title} ${url}"),
    });
  }
});
