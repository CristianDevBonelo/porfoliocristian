// logica de contacto y validacion de correo 

document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); 

  const form = event.target;
  const formData = new FormData(form);
  const formMessage = document.getElementById("formMessage");

  fetch("https://formspree.io/f/xjkolojl", {
    method: "POST",
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if (response.ok) {
      formMessage.textContent = "✅ ¡Gracias! Tu mensaje ha sido enviado.";
      formMessage.style.color = "green";
      form.reset();
    } else {
      formMessage.textContent = "❌ Ocurrió un error al enviar el mensaje.";
      formMessage.style.color = "red";
    }
  })
  .catch(() => {
    formMessage.textContent = "❌ No se pudo enviar el mensaje. Revisa tu conexión.";
    formMessage.style.color = "red";
  });
});
