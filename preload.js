const { ipcRenderer, clipboard } = require("electron");

// window.ipcRenderer = ipcRenderer;
// window.clipboard = clipboard;
// // All the Node.js APIs are available in the preload process.
// // It has the same sandbox as a Chrome extension.

// ipcRenderer.on('key-released', (event, key) => {
//   console.log('Received key press event in renderer process:', key);
//   translateTextAndSpeak(key);
// });
const timeoutId = null;
let previousClipboardText = "";
ipcRenderer.on("ctrl-t-pressed", (key) => {
  console.log("用户按下了 ctrl-t-pressed");
  const clipboardText = clipboard.readText();
  console.log("Clipboard content:", clipboardText);
  clearTimeout(timeoutId);
  if (previousClipboardText != clipboardText) {
    previousClipboardText = clipboardText;
    translateTextAndSpeak(clipboardText);
  } else {
    timeoutId = setTimeout(() => {
      const _clipboard = clipboard.readText();
      previousClipboardText = _clipboard;
      translateTextAndSpeak(_clipboard);
    }, 300);
  }

  // const clipboard_writeText =clipboard.writeText('Example String', 'selection');
  // const clipboard_readText =clipboard.readText('selection');
  // console.log(clipboard_writeText,clipboard_readText)
});

function translateTextAndSpeak(text) {
  console.log(`enter translateTextAndSpeak ${text}`);
  //const utterance_input = new SpeechSynthesisUtterance('測試中文');
  const utterance_input = new SpeechSynthesisUtterance(text);
  //const utterance_input = new SpeechSynthesisUtterance(`You pressed ${text}`);
  utterance_input.volume = 1;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance_input);
}

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
