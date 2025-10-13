// ===== SCROLL SUAVE + MENU MOBILE + FUNÇÕES DINÂMICAS =====
document.addEventListener('DOMContentLoaded', function() {
  // ===== VARIÁVEIS =====
  const menuToggle = document.getElementById('menuToggle'); // Botão hamburguer do menu mobile
  const navList = document.getElementById('navList'); // Lista de navegação
  const navLinks = document.querySelectorAll('.nav-link'); // Todos os links do menu

  // ===== MENU MOBILE =====
  menuToggle.addEventListener('click', function() { // Evento de clique no botão hamburguer
    navList.classList.toggle('active'); // Alterna visibilidade do menu (abre/fecha)
    menuToggle.classList.toggle('active'); // Alterna animação do botão (hamburguer/X)
  });

  // ===== SCROLL SUAVE =====
  navLinks.forEach(link => { // Para cada link de navegação
    link.addEventListener('click', function(event) { // Evento de clique nos links
      event.preventDefault(); // Previne comportamento padrão de pular para âncora

      // Fechar menu mobile (se estiver aberto)
      navList.classList.remove('active'); // Esconde menu mobile
      menuToggle.classList.remove('active'); // Reseta animação do botão

      // Navegação suave para seção alvo
      const targetId = this.getAttribute('href'); // Obtém ID da seção (ex: #home)
      const targetSection = document.querySelector(targetId); // Encontra seção no DOM

      // Cálculo preciso considerando header fixo
      const headerHeight = document.querySelector('.header').offsetHeight; // Altura do header
      const targetPosition = targetSection.offsetTop - headerHeight; // Posição ajustada

      // Animação de scroll suave
      window.scrollTo({ // Executa scroll
        top: targetPosition, // Posição destino (ajustada para header fixo)
        behavior: 'smooth' // Comportamento suave (animação)
      });
    });
  });

  // ===== FECHAR MENU AO CLICAR FORA =====
  document.addEventListener('click', function(event) { // Evento de clique em qualquer lugar
    if (!event.target.closest('.nav-menu')) { // Verifica se clique NÃO foi no menu
      navList.classList.remove('active'); // Fecha menu se estiver aberto
      menuToggle.classList.remove('active'); // Reseta botão hamburguer
    }
  });

  // ===== DESTACAR LINK ATIVO NO MENU =====
  window.addEventListener('scroll', function() { // Evento de scroll na página
    const sections = document.querySelectorAll('section'); // Todas as seções
    const navLinks = document.querySelectorAll('.nav-link'); // Todos os links
    let currentSection = ''; // Variável para armazenar seção atual visível

    // Identificar qual seção está visível
    sections.forEach(section => { // Para cada seção
      const sectionTop = section.offsetTop; // Posição top da seção
      const sectionHeight = section.clientHeight; // Altura visível da seção
      const headerHeight = document.querySelector('.header').offsetHeight; // Altura do header

      // Verifica se scroll está dentro dos limites da seção (com margem de 100px)
      if (window.scrollY >= (sectionTop - headerHeight - 100)) {
        currentSection = section.getAttribute('id'); // Atualiza seção atual
      }
    });

    // Aplicar/remover classe 'active' nos links
    navLinks.forEach(link => { // Para cada link
      link.classList.remove('active'); // Remove classe active de todos
      if (link.getAttribute('href') === `#${currentSection}`) { // Se link corresponde à seção atual
        link.classList.add('active'); // Adiciona classe active
      }
    });
  });

  // ===== EXECUÇÃO DAS FUNÇÕES DINÂMICAS DO FOOTER =====
  // 🕒 ATUALIZAR HORA NO FOOTER
  document.getElementById('footer-hora').innerHTML = mostrarHoraAtual();
  
  // 📅 ATUALIZAR DATA NO FOOTER  
  document.getElementById('footer-data').innerHTML = mostrarDataAtual();
  
  // 👥 ATUALIZAR CONTADOR DE VISITAS NO FOOTER
  document.getElementById('footer-visitantes').innerHTML = contadorDeVisitantes();
});

// ===== FUNÇÕES AUXILIARES PARA DATA/HORA/VISITANTES =====

// FUNÇÃO: mostrarDataHoraCompleta - Retorna data e hora formatadas
function mostrarDataHoraCompleta() {
    const agora = new Date(); // Cria objeto Date com momento atual
    const data = agora.toLocaleDateString('pt-BR'); // Formata data no padrão BR (DD/MM/AAAA)
    const hora = agora.toLocaleTimeString('pt-BR'); // Formata hora no padrão BR (HH:MM:SS)
    return `📅 ${data} ⏰ ${hora}`; // Retorna string formatada com emojis
}

// FUNÇÃO: mostrarHoraAtual - Retorna apenas a hora formatada
function mostrarHoraAtual() {
    const agora = new Date(); // Cria objeto Date com momento atual
    const hora = agora.toLocaleTimeString('pt-BR'); // Formata hora no padrão BR (HH:MM:SS)
    return `⏰ ${hora}`; // Retorna hora formatada com emoji de relógio
}

// FUNÇÃO: mostrarDataAtual - Retorna apenas a data formatada
function mostrarDataAtual() {
    const agora = new Date(); // Cria objeto Date com momento atual
    const data = agora.toLocaleDateString('pt-BR'); // Formata data no padrão BR (DD/MM/AAAA)
    return `📅 ${data}`; // Retorna data formatada com emoji de calendário
}

// FUNÇÃO: contadorDeVisitantes - Gerencia contador persistente no localStorage
function contadorDeVisitantes() {
    const CHAVE_ARMAZENAMENTO = 'portfolioVisitasRonaldoSilva'; // Chave única para armazenamento
    
    let visitasAtuais = localStorage.getItem(CHAVE_ARMAZENAMENTO); // Obtém valor atual
    
    if (visitasAtuais === null) { // Se é primeira visita
        visitasAtuais = 1; // Inicializa contador
    } else { // Se já existe registro
        visitasAtuais = parseInt(visitasAtuais) + 1; // Incrementa contador
    }
    
    localStorage.setItem(CHAVE_ARMAZENAMENTO, visitasAtuais.toString()); // Salva novo valor
    
    const visitasFormatadas = visitasAtuais.toLocaleString('pt-BR'); // Formata número (ex: 1.234)
    return `👥 Visitantes: ${visitasFormatadas}`; // Retorna string formatada com emoji
}