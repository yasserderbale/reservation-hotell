// Script pour faire disparaître les flash messages après une seconde
document.addEventListener("DOMContentLoaded", (event) => {
  setTimeout(() => {
    let flashMessages = document.querySelectorAll(".flash-message");
    flashMessages.forEach((message) => {
      message.style.display = "none";
    });
  }, 2000); // 1000 millisecondes = 1 seconde
});
