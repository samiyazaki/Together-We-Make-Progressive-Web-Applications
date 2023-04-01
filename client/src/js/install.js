const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add an event listener for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('hit')
    console.log("event" + event)
    event.preventDefault();
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// A listener for the button to install the PWA
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
});

// A listener for the appinstalled event
window.addEventListener('appinstalled', (event) => {
    console.log('App installed');
    window.deferredPrompt = null;
});
