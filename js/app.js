document.addEventListener("DOMContentLoaded", () => {
  // 1. Efeito Dinâmico na Navbar
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 2. Lógica do Menu Hambúrguer (Mobile)
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link, .mobile-btn");

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    if (mobileMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuBtn.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // 3. Animação de Surgimento (Reveal)
  const revealElements = document.querySelectorAll(".reveal");

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach((el) => {
    revealOnScroll.observe(el);
  });
});
// 4. Lógica de Envio do Formulário (Sem redirecionar a página)
const formContato = document.getElementById("form-contato");
const formStatus = document.getElementById("form-status");
const btnEnviar = document.getElementById("btn-enviar");

if (formContato) {
  formContato.addEventListener("submit", async function (e) {
    e.preventDefault(); // Impede que a página recarregue ou redirecione

    // 1. Muda o estado do botão para dar feedback visual de carregamento
    const textoOriginal = btnEnviar.innerText;
    btnEnviar.innerText = "Enviando...";
    btnEnviar.disabled = true;
    btnEnviar.style.opacity = "0.7";
    formStatus.innerHTML = ""; // Limpa mensagens anteriores

    // 2. Coleta os dados digitados usando a API FormData
    const formData = new FormData(formContato);

    try {
      // 3. Faz o envio por baixo dos panos (Coloque seu email correto aqui)
      const response = await fetch("https://formsubmit.co/ajax/gustavolucena559@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      // 4. Trata a resposta
      if (response.ok) {
        // Sucesso: Texto verde padrão da sua paleta e limpa o formulário
        formStatus.innerHTML = '<span style="color: #10b981;">Mensagem enviada com sucesso! Retorno em breve.</span>';
        formContato.reset();
      } else {
        // Erro do lado do servidor
        formStatus.innerHTML = '<span style="color: #ff007a;">Ops! Ocorreu um erro ao enviar. Tente novamente.</span>';
      }
    } catch (error) {
      // Erro de rede (ex: usuário sem internet)
      formStatus.innerHTML = '<span style="color: #ff007a;">Erro de conexão. Tente me chamar no WhatsApp!</span>';
    } finally {
      // 5. Restaura o botão ao estado original, independentemente de dar certo ou errado
      btnEnviar.innerText = textoOriginal;
      btnEnviar.disabled = false;
      btnEnviar.style.opacity = "1";

      // Opcional: Apaga a mensagem de sucesso depois de 6 segundos
      setTimeout(() => {
        formStatus.innerHTML = "";
      }, 6000);
    }
  });
}
