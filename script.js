/**
 * Piyaa's Birthday Website - Enhanced Main JavaScript File
 * Combines all functionality with proper page-specific execution
 */

document.addEventListener('DOMContentLoaded', () => {
  // Common initialization
  initScrollAnimations();
  initButtonEffects();
  initAudioPlayer();
  initCountdown();
  initCryGame();
  initSurpriseButton();
  initClickSparkles();
  initLightbox();
  
  // Page-specific initialization
  if (document.getElementById('login-form')) {
    initLoginPage();
  } else if (document.querySelector('.intro-overlay')) {
    initHomePage();
  }
});

// ===== CORE FUNCTIONALITY =====

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-scroll]').forEach(el => {
    observer.observe(el);
  });
}

function initButtonEffects() {
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
      this.classList.add('animate__animated', 'animate__rubberBand');
      setTimeout(() => {
        this.classList.remove('animate__animated', 'animate__rubberBand');
      }, 1000);
    });
  });
}

function initAudioPlayer() {
  const audio = document.getElementById('birthday-audio');
  const toggleButton = document.getElementById('audio-toggle');
  
  if (toggleButton && audio) {
    // Try to autoplay (will fail in most browsers without user interaction)
    const playPromise = audio.play().catch(e => {
      console.log("Autoplay prevented:", e);
      toggleButton.textContent = "Play Music";
    });
    
    toggleButton.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(e => console.log("Audio play failed:", e));
        toggleButton.textContent = "Pause Music";
      } else {
        audio.pause();
        toggleButton.textContent = "Play Music";
      }
    });
  }
}

function initCountdown() {
  const timerElement = document.getElementById('timer');
  if (!timerElement) return;

  function getNextBirthday() {
    const now = new Date();
    const thisYear = now.getFullYear();
    let birthday = new Date(thisYear, 6, 27); // July = 6 (0-based)
    if (now > birthday) {
      birthday = new Date(thisYear + 1, 6, 27);
    }
    return birthday;
  }

  function updateCountdown() {
    const now = new Date();
    const birthday = getNextBirthday();
    const diff = birthday - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    timerElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    
    // Special effect when close to birthday
    if (days <= 7) {
      timerElement.style.animation = 'pulse 1s infinite alternate';
      timerElement.style.color = '#ff6b6b';
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function initCryGame() {
  window.catchEmoji = function() {
    const emoji = document.getElementById("emoji");
    if (!emoji) return;
    
    emoji.style.transform = "scale(1.5)";
    emoji.style.transition = "transform 0.3s ease";
    setTimeout(() => {
      emoji.style.transform = "scale(1)";
      
      // Create floating hearts effect
      for (let i = 0; i < 10; i++) {
        createFloatingElement(document.body, '❤️', 30);
      }
      
      // Custom alert with animation
      const alertBox = document.createElement('div');
      alertBox.className = 'custom-alert animate__animated animate__bounceIn';
      alertBox.innerHTML = `
        <div class="alert-content">
          <p>heheheheeheheheheheh...I just love you</p>
          <button onclick="this.parentElement.parentElement.remove()">OK</button>
        </div>
      `;
      document.body.appendChild(alertBox);
    }, 300);
  };
}

function initSurpriseButton() {
  const surpriseButton = document.getElementById("surpriseButton");
  if (surpriseButton) {
    surpriseButton.addEventListener("click", () => {
      // Create confetti effect
      for (let i = 0; i < 50; i++) {
        createFloatingElement(document.body, ['✨', '🎉', '🎁', '🌟'][Math.floor(Math.random() * 4)], 20);
      }
      
      // Custom alert
      const alertBox = document.createElement('div');
      alertBox.className = 'custom-alert animate__animated animate__zoomIn';
      alertBox.innerHTML = `
        <div class="alert-content">
          <p>🌟 SURPRISE: You're officially unforgettable. Welcome to the journey through 17, Piyaa!</p>
          <button onclick="this.parentElement.parentElement.remove()">OK</button>
        </div>
      `;
      document.body.appendChild(alertBox);
      
      // Change background
      document.body.style.background = "linear-gradient(to right, #ffe0f0, #e0f7fa)";
    });
  }
}

function initClickSparkles() {
  document.body.addEventListener("click", (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    
    createFloatingElement(document.body, '✨', 24, e.pageX, e.pageY);
    createFloatingElement(document.body, '🌸', 28, e.pageX + 20, e.pageY - 20);
  });
}

function initLightbox() {
  const memoryEntries = document.querySelectorAll('.memory-entry');
  if (!memoryEntries.length) return;

  memoryEntries.forEach(entry => {
    entry.addEventListener('click', () => {
      const imgSrc = entry.querySelector('img').src;
      const caption = entry.querySelector('.memory-year').textContent;
      
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <img src="${imgSrc}" alt="Memory" style="max-width:100%; max-height:80vh; display:block;">
          <div class="lightbox-caption">${caption}</div>
          <button class="favorite-btn">❤️</button>
          <span class="close-lightbox">&times;</span>
        </div>
      `;
      
      document.body.appendChild(lightbox);
      
      // Add favorite button functionality
      lightbox.querySelector('.favorite-btn').addEventListener('click', function() {
        this.classList.toggle('active');
      });
    });
  });
  
  // Close lightbox when clicking outside
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('lightbox') || e.target.classList.contains('close-lightbox')) {
      e.target.closest('.lightbox').remove();
    }
  });
}

// ===== PAGE-SPECIFIC FUNCTIONALITY =====

function initLoginPage() {
  // Create floating hearts
  createFloatingElements('hearts-container', ['❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍']);

  // Input focus animations
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', () => {
      input.style.transform = 'translateY(-5px)';
      input.style.boxShadow = '0 6px 25px rgba(216, 27, 96, 0.4)';
    });
    
    input.addEventListener('blur', () => {
      input.style.transform = 'translateY(-2px)';
      input.style.boxShadow = '0 4px 20px rgba(216, 27, 96, 0.3)';
    });
  });

  // Login form handling
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === "piyaa@example.com" && password === "18party") {
      // Add transition effect before redirect
      document.querySelector('.login-box').classList.add('animate__animated', 'animate__zoomOut');
      
      // Create celebration effect
      for (let i = 0; i < 30; i++) {
        createFloatingElement(document.body, '❤️', 24);
      }
      
      await new Promise(resolve => setTimeout(resolve, 800));
      window.location.href = "home.html";
    } else {
      // Shake animation for wrong credentials
      const form = document.getElementById('login-form');
      form.classList.add('animate__animated', 'animate__headShake');
      setTimeout(() => {
        form.classList.remove('animate__animated', 'animate__headShake');
      }, 1000);
    }
  });
}

function initHomePage() {
  // Create floating elements
  createFloatingElements('floating-elements', ['🌸', '🌷', '🎀', '✨', '🎂', '💖', '🎈', '🥳']);

  // Typing animation for intro text
  const introText = document.querySelector('.intro-text');
  if (introText) {
    typeWriterEffect(introText, 
      "Once upon a time, a boy named Kazi created this for your 17th birthday\nTo make you smile today and remember him in your golden years...",
      100
    );
    
    // Remove intro overlay after animation
    setTimeout(() => {
      const introOverlay = document.querySelector('.intro-overlay');
      if (introOverlay) {
        introOverlay.style.opacity = '0';
        setTimeout(() => introOverlay.remove(), 1000);
      }
    }, 7000); // Matches typing duration + extra time
  }
}

// ===== HELPER FUNCTIONS =====

function createFloatingElements(containerId, elements) {
  const container = document.getElementById(containerId);
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    createFloatingElement(container, elements[Math.floor(Math.random() * elements.length)]);
  }
}

function createFloatingElement(container, content, size = 24, x = null, y = null) {
  const element = document.createElement('div');
  element.className = 'floating-element';
  element.textContent = content;
  element.style.left = x ? `${x}px` : `${Math.random() * 100}vw`;
  element.style.top = y ? `${y}px` : '100%';
  element.style.fontSize = `${size}px`;
  element.style.animationDuration = `${Math.random() * 10 + 10}s`;
  element.style.animationDelay = `${Math.random() * 5}s`;
  container.appendChild(element);
  
  // Remove element after animation completes
  setTimeout(() => {
    element.remove();
  }, 10000);
}

function typeWriterEffect(element, text, speed) {
  let i = 0;
  element.innerHTML = ''; // Clear existing content
  
  function type() {
    if (i < text.length) {
      element.innerHTML = text.substring(0, i+1) + '<span class="blinking-cursor">|</span>';
      i++;
      setTimeout(type, speed);
    } else {
      element.innerHTML = text;
    }
  }
  
  type();
}

// Service Worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
