const { ipcRenderer, clipboard } = require('electron');

// window.ipcRenderer = ipcRenderer;
// window.clipboard = clipboard;
// // All the Node.js APIs are available in the preload process.
// // It has the same sandbox as a Chrome extension.

ipcRenderer.on('key-released', (event, key) => {
  console.log('Received key press event in renderer process:', key);
  translateTextAndSpeak(key);
});

function translateTextAndSpeak(text) {
  console.log(`enter translateTextAndSpeak ${text}`);
  //const utterance_input = new SpeechSynthesisUtterance('測試中文');
  const utterance_input = new SpeechSynthesisUtterance(text);
  //const utterance_input = new SpeechSynthesisUtterance(`You pressed ${text}`);
  utterance_input.volume =1;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance_input);
}

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })