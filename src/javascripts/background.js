const copyToClipboard = (string) => {
  const textarea = document.createElement("textarea");
  textarea.style.cssText = "position: absolute; left: -100%";
  document.body.appendChild(textarea);
  textarea.value = string;
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

chrome.runtime.onMessage.addListener(({ string }) => {
  copyToClipboard(string);
});
