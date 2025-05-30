document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulaire");
  const paiementChamp = document.getElementById("paiementEffectue");
  const loader = document.getElementById("loader");
  const alertBox = document.getElementById("alertBox");

  const lienWave = document.querySelector('a[href*="pay.wave.com"]');
  if (lienWave) {
    lienWave.addEventListener("click", () => {
      setTimeout(() => {
        alert("✅ Paiement Wave simulé avec succès !");
        paiementChamp.value = "true";
      }, 3000);
    });
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (paiementChamp.value !== "true") {
      alert("⚠️ Veuillez effectuer le paiement via Wave avant de valider l’inscription.");
      return;
    }

    loader.style.display = "block";
    alertBox.innerText = "";

    const formData = new FormData(form);

    try {
      const response = await fetch('/inscription', {
        method: 'POST',
        body: formData
      });

      loader.style.display = "none";

      if (response.ok) {
        alertBox.innerText = "✅ Inscription réussie ! Redirection en cours...";
        alertBox.style.color = "green";
        setTimeout(() => {
          window.location.href = "/dashboard.html";
        }, 2000);
      } else {
        const errorText = await response.text();
        alertBox.innerText = "❌ Erreur serveur : " + errorText;
        alertBox.style.color = "red";
      }

    } catch (error) {
      loader.style.display = "none";
      console.error("Erreur lors de l’envoi du formulaire :", error);
      alertBox.innerText = "❌ Une erreur est survenue lors de l’envoi du formulaire.";
      alertBox.style.color = "red";
    }
  });
});
