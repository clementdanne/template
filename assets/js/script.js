// Gestion de l'envoi des infos à Brevo

document.getElementById('subscription-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        "updateEnabled": true,
        "email": document.querySelector('input[name="email"]').value,
        "listIds": [10]
    };

    fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': 'API_KEY_HERE'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        alert('Merci pour votre abonnement. Nous sommes ravis de vous compter parmi nos abonnés.');
        document.getElementById('subscription-form').reset();
      } else {
        throw new Error('Une erreur est survenue, veuillez réessayer.');
      }
    }) // <-- Ajout de l'accolade manquante ici
    .catch(error => {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
    });
})


// Gestion de la soumission du formulaire de contact

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const recaptchaResponse = grecaptcha.getResponse();
      const responseMessage = document.getElementById('response-message');

      if (!recaptchaResponse) {
        responseMessage.textContent = "Please complete the reCAPTCHA verification";
        responseMessage.className = 'error';
        return;
      }

      const formData = new FormData(this);
      fetch('sendmail.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          responseMessage.textContent = "Thank you for your message! I'll get back to you soon!";
          responseMessage.className = 'success';
          this.reset();
          grecaptcha.reset();
        } else {
          responseMessage.textContent = data.message;
          responseMessage.className = 'error';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        responseMessage.textContent = "An error occurred. Please try again.";
        responseMessage.className = 'error';
      });
    });
  }
});
