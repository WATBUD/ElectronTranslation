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
  translateTextAndSpeak(clipboardText);
  // clearTimeout(timeoutId);
  // if (previousClipboardText != clipboardText) {
  //   previousClipboardText = clipboardText;
  //   translateTextAndSpeak(clipboardText);
  // } else {
  //   timeoutId = setTimeout(() => {
  //     const _clipboard = clipboard.readText();
  //     previousClipboardText = _clipboard;
  //     translateTextAndSpeak(_clipboard);
  //   }, 300);
  // }

  // const clipboard_writeText =clipboard.writeText('Example String', 'selection');
  // const clipboard_readText =clipboard.readText('selection');
  // console.log(clipboard_writeText,clipboard_readText)
});

function translateTextAndSpeak(text) {
  console.log(`enter translateTextAndSpeak ${text}`);
  //const utterance_input = new SpeechSynthesisUtterance('測試中文');
  const utterance_input = new SpeechSynthesisUtterance(text);
  utterance_input.lang = "en-US";
  //const utterance_input = new SpeechSynthesisUtterance(`You pressed ${text}`);
  utterance_input.volume = 1;

  //const synth = window.speechSynthesis;
  let voices = speechSynthesis.getVoices();
  //console.log(`voices ${JSON.stringify(voices)}`);
  console.dir(voices);
  if(voices[2]){
    utterance_input.voice = voices[1];
  }
  // for(let index = 0; index < voices.length; index++) {
  //   /*
  //   "Google US English"
  //   "Google 日本語"
  //   "Google 普通话（中国大陆）"
  //   "Google 粤語（香港）"
  //   "Google 國語（臺灣）"
  //   */
  //   //console.log(voices[index].name);
  //   if(voices[index].name == "Microsoft HsiaoChen Online (Natural) - Chinese (Taiwan)"){ //HsiaoChen (Neural) - 曉臻 (MS Edge專用)
  //     utterance_input.voice = voices[index];
  //     break;
  //   }else if(voices[index].name == "Google 國語（臺灣）"){ //Chrome專用
  //     utterance_input.voice = voices[index];
  //     break;
  //   }else{
  //     //u.lang = 'zh-TW'; //這邊可能會有語音又被切回系統語音的問題
  //   }
    
  //   //當最後一個都還沒找到時才設u.lang
  //   if(index+1 === voices.length){
  //     utterance_input.lang = 'zh-TW';
  //   }
  // }
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
