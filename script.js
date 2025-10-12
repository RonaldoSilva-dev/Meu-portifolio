// ===== SCROLL SUAVE + MENU MOBILE =====
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const navList = document.getElementById('navList');
  const navLinks = document.querySelectorAll('.nav-link');

  // ===== MENU MOBILE =====
  // Abrir/fechar menu ao clicar no botão hamburguer
  menuToggle.addEventListener('click', function() {
    navList.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // ===== SCROLL SUAVE =====
  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault(); // Impede o comportamento padrão de pular

      // Fechar menu mobile (se estiver aberto)
      navList.classList.remove('active');
      menuToggle.classList.remove('active');

      // Pegar o ID da seção alvo (ex: #home, #about)
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      // Calcular a posição considerando o header fixo
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      // Animação de scroll suave
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth' // Isso que cria o efeito suave
      });
    });
  });

  // ===== FECHAR MENU AO CLICAR FORA =====
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.nav-menu')) {
      navList.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });

  // ===== DESTACAR LINK ATIVO NO MENU =====
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';

    // Verificar qual seção está visível na tela
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const headerHeight = document.querySelector('.header').offsetHeight;

      if (window.scrollY >= (sectionTop - headerHeight - 100)) {
        currentSection = section.getAttribute('id');
      }
    });

    // Adicionar/remover classe 'active' dos links
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
});