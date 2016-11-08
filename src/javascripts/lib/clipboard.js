export function copyToClipboard (string) {
  const textarea = document.createElement("textarea");
  textarea.style.cssText = "position: absolute; left: -100%";
  document.body.appendChild(textarea);
  textarea.value = string;
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
