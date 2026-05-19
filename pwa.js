let installPrompt = null;
const installButton = document.querySelector("#install");

// 1. Listen for the native prompt (will likely fail on Blogger, but good to have just in case)
window.addEventListener("beforeinstallprompt", (event) => {
  console.log("coolio!");
  event.preventDefault();
  installPrompt = event;
  installButton.removeAttribute("hidden"); 
});

// 2. A SINGLE click listener that handles both situations
installButton.addEventListener("click", async () => {
  
  if (installPrompt) {
    // SCENARIO A: The browser supports native install and passed the security checks
    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    disableInAppInstallPrompt();
    
  } else {
    // SCENARIO B: No native prompt available (This is what will run on Blogger)
    const isAndroid = /android/i.test(navigator.userAgent);
    
    if (isAndroid) {
      alert("To install this app: \n1. Tap the three dots (⋮) in the top right of your browser. \n2. Select 'Add to Home screen' or 'Install app'.");
    } else {
      alert("To install: Tap your browser's share or menu button, then select 'Add to Home Screen'.");
    }
  }
});
    
function disableInAppInstallPrompt() {
  installPrompt = null;
  installButton.setAttribute("hidden", "");
}
