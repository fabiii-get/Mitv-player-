const fsBtn = document.getElementById("fsBtn");

fsBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Atajos de teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    alert("Canal anterior (falta asignar URLs)");
  }
  if (e.key === "ArrowRight") {
    alert("Canal siguiente (falta asignar URLs)");
  }
  if (e.key.toLowerCase() === "f") {
    fsBtn.click();
  }
});
