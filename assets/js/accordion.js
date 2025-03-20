// Fonctionnement accordéon

document.addEventListener("DOMContentLoaded", function() {
  const accordionButtons = document.querySelectorAll(".accordion-button");

  accordionButtons.forEach(button => {
    button.addEventListener("click", function() {
      const accordionItem = button.closest(".accordion-item");
      const iconContainer = button.querySelector(".icon-container");
      const panel = accordionItem.querySelector(".panel");

      // Toggle la classe active sur le bouton, l'item et l'icône
      button.classList.toggle("active");
      accordionItem.classList.toggle("active");
      iconContainer.classList.toggle("active");

      // Gestion de l'ouverture/fermeture du panneau avec animation
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
});




