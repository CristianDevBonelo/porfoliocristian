// Lógica de contacto y validación de correo
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
      formMessage.textContent = "✅ ¡Gracias por contactarme! Tu mensaje fue enviado correctamente.";
      formMessage.style.color = "wheat"; 
      formMessage.style.display = "block"; 
      form.reset();

      setTimeout(() => { formMessage.style.display = "none"; }, 5000);
    } else {
      formMessage.textContent = "❌ Hubo un problema al enviar tu mensaje. Inténtalo nuevamente.";
      formMessage.style.color = "#dc2626"; 
      formMessage.style.display = "block";
    }
  })
  .catch(() => {
    formMessage.textContent = "❌ No se pudo enviar el mensaje. Verifica tu conexión.";
    formMessage.style.color = "#dc2626";
    formMessage.style.display = "block";
  });
});

document.getElementById("btnContacto").addEventListener("click", function () {
  const correo = "cristianbonelorios@hotmail.com";
  
  const subject = encodeURIComponent("Solicitud de contacto");
  const body = encodeURIComponent(
    "Hola Cristian,\n\nEstoy interesado en recibir más información sobre tus servicios.\n\n¡Gracias!"
  );

  window.location.href = `mailto:${correo}?subject=${subject}&body=${body}`;
});
