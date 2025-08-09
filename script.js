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
  
  // Page-specific initialization
  if (document.getElementById('login-form')) {
    initLoginPage();
  } else if (document.querySelector('.intro-overlay')) {
    initHomePage();
  }

  // Service Worker Registration
  registerServiceWorker();
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
      alert("heheheheeheheheheheh...I just love you");
    }, 300);
  };
}

function initSurpriseButton() {
  const surpriseButton = document.getElementById("surpriseButton");
  if (surpriseButton) {
    surpriseButton.addEventListener("click", () => {
      alert("🌟 SURPRISE: You're officially unforgettable. Welcome to the journey through 17, Piyaa!");
      document.body.style.background = "linear-gradient(to right, #ffe0f0, #e0f7fa)";
    });
  }
}

function initClickSparkles() {
  document.body.addEventListener("click", (e) => {
    const sparkle = document.createElement("div");
    sparkle.textContent = "✨";
    sparkle.style.position = "absolute";
    sparkle.style.left = `${e.pageX}px`;
    sparkle.style.top = `${e.pageY}px`;
    sparkle.style.fontSize = "24px";
    sparkle.style.animation = "float 2s ease-out";
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2000);
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
      await new Promise(resolve => setTimeout(resolve, 800));
      window.location.href = "home.html";
    } else {
      // Shake animation for wrong credentials
      const form = document.getElementById('login-form');
      form.classList.add('animate__animated', 'animate__headShake');
      setTimeout(() => {
        form.classList.remove('animate__animated', 'animate__headShake');
      }, 1000);
      alert("Invalid credentials. Try again.");
    }
  });

  // Add burst animation CSS
  addBurstAnimationStyle();
}

function initHomePage() {
  // Create floating elements
  createFloatingElements('floating-elements', ['🌸', '🌷', '🎀', '✨', '🎂', '💖', '🎈', '🥳']);

  // Remove intro overlay after animation
  setTimeout(() => {
    const introOverlay = document.querySelector('.intro-overlay');
    if (introOverlay) {
      introOverlay.style.opacity = '0';
      setTimeout(() => introOverlay.remove(), 1000);
    }
  }, 4000);

  // Typing animation for intro text
  const introText = document.querySelector('.intro-text');
  if (introText) {
    typeWriterEffect(introText, 
      "Once upon a time, a boy named Kazi created this for your 17th birthday\nTo make you smile today and remember him in your golden years...",
      100
    );
  }
}

// ===== HELPER FUNCTIONS =====

function createFloatingElements(containerId, elements) {
  const container = document.getElementById(containerId);
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const element = document.createElement('div');
    element.className = containerId === 'hearts-container' ? 'heart' : 'floating-element';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.fontSize = (Math.random() * 20 + 15) + 'px';
    element.style.animationDuration = (Math.random() * 10 + 10) + 's';
    element.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(element);
  }
}

function addBurstAnimationStyle() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes burst {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
      100% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1.5); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
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

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
}
