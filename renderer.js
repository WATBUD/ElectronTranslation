function handleKeyPress(event) {
  // You can put code here to handle the keypress.
  document.getElementById("last-keypress").innerText = event.key;
  //alert(`You pressed ${event.key}`);
  console.log(`You pressed ${event.key}`);

  // if (event.ctrlKey&& event.key == 'c') {
  //   // Get text from clipboard
  //   const clipboardText = window.clipboard.readText();
  //   console.log(`clipboardText ${clipboardText}`);
  //   // navigator.clipboard.readText()
  //   //   .then(text => {
  //   //     // Translate the text here

  //   //     console.log(`navigator.clipboard ${text}`);
  //   //     translateTextAndSpeak(text);
  //   //   })
  //   //   .catch(err => {
  //   //     console.error('Failed to read clipboard:', err);
  //   //   });
  // }


  //translateTextAndSpeak(event.key);
}












window.addEventListener("keyup", handleKeyPress, true);
