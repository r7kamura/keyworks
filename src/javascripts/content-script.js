import { detectKeyString } from "key-string";

window.addEventListener("keydown", (event) => {
  const keyString = detectKeyString(event);
  console.log(keyString);
});
