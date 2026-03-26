// ⏳ LOADER GLOBAL (3 secondes obligatoire)
window.addEventListener("load", () => {

  setTimeout(() => {
    const loader = document.getElementById("loader");

    if (loader) {
      loader.style.opacity = "0";
      loader.style.transition = "0.5s";

      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }

  }, 3000);

});
