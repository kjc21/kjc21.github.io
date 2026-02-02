const arrow = document.getElementById("arrow");

arrow.addEventListener("click", () => {
  document.querySelector(".info-grid").scrollIntoView({
    behavior: "smooth"
  });
});