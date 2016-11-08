import { detectKeyString } from "key-string";

window.addEventListener("keydown", (event) => {
  const keyString = detectKeyString(event);
  if (keyString === "Ctrl+M") {
  }
});
