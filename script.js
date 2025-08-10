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
  // Create enhanced floating hearts
  const heartContainer = document.getElementById('hearts-container');
  const heartShapes = ['❤️', '🧡', '💛', '💚', '💙', '💜', '💝', '💖', '💗', '💘'];
  
  for (let i = 0; i < 40; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = heartShapes[Math.floor(Math.random() * heartShapes.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 15 + 15) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    heart.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
    heartContainer.appendChild(heart);
    
    // Add interactivity
    heart.addEventListener('mouseenter', () => {
      heart.style.transform = 'scale(1.5)';
      heart.style.opacity = '1';
    });
    
    heart.addEventListener('mouseleave', () => {
      heart.style.transform = 'scale(1)';
      heart.style.opacity = Math.random() * 0.5 + 0.3;
    });
  }

  // Enhanced input effects
  document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.querySelector('label').style.color = 'transparent';
      input.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.3)';
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.querySelector('label').style.color = 'rgba(255, 255, 255, 0.7)';
      }
      input.style.boxShadow = 'none';
    });
  });

  // Login form handling with enhanced feedback
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const form = document.getElementById('login-form');
    const button = form.querySelector('button');

    // Add loading state
    button.disabled = true;
    button.innerHTML = '<div class="spinner"></div> Loading...';
    button.style.opacity = '0.8';

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (email === "piyaa@example.com" && password === "18party") {
      // Success animation
      form.style.animation = 'none';
      form.style.transform = 'translate(-50%, -50%) scale(0.9)';
      form.style.opacity = '0.8';
      
      // Create celebration effect
      for (let i = 0; i < 50; i++) {
        setTimeout(() => {
          createFloatingElement(document.body, 
            ['✨', '🎉', '🎁', '🌟', '💖', '🥳'][Math.floor(Math.random() * 6)], 
            Math.random() * 20 + 20
          );
        }, i * 100);
      }
      
      // Success message
      const successMsg = document.createElement('div');
      successMsg.className = 'custom-alert animate__animated animate__zoomIn';
      successMsg.innerHTML = `
        <div class="alert-content">
          <p>Welcome back, Piyaa! Your magical journey awaits...</p>
        </div>
      `;
      document.body.appendChild(successMsg);
      
      // Redirect after delay
      setTimeout(() => {
        window.location.href = "home.html";
      }, 3000);
    } else {
      // Error animation
      button.disabled = false;
      button.innerHTML = 'Enter Wonderland';
      button.style.opacity = '1';
      
      form.classList.add('animate__animated', 'animate__headShake');
      setTimeout(() => {
        form.classList.remove('animate__animated', 'animate__headShake');
      }, 1000);
      
      // Highlight error fields with glow effect
      document.getElementById('email').style.boxShadow = '0 0 10px #ff6b6b';
      document.getElementById('password').style.boxShadow = '0 0 10px #ff6b6b';
      
      setTimeout(() => {
        document.getElementById('email').style.boxShadow = '';
        document.getElementById('password').style.boxShadow = '';
      }, 1500);
    }
  });
}
function initHomePage() {
  // Create enhanced floating elements
  createFloatingElements('floating-elements', 
    ['🌸', '🌷', '🎀', '✨', '🎂', '💖', '🎈', '🥳', '🍰', '🎊', '🎇', '💫']
  );

  // Enhanced typing animation for intro text
  const introText = document.querySelector('.intro-text');
  if (introText) {
    typeWriterEffect(introText, 
      "Once upon a time, a boy named Kazi created this for your 17th birthday\nTo make you smile today and remember him in your golden years...",
      50, // Faster typing speed
      () => {
        // Callback when typing is complete
        const cursor = introText.querySelector('.blinking-cursor');
        if (cursor) {
          cursor.style.animation = 'blink 1s step-end infinite';
        }
        
        // Remove intro overlay after delay
        setTimeout(() => {
          const introOverlay = document.querySelector('.intro-overlay');
          if (introOverlay) {
            introOverlay.style.opacity = '0';
            introOverlay.style.transform = 'scale(1.1)';
            introOverlay.style.backdropFilter = 'blur(0px)';
            setTimeout(() => introOverlay.remove(), 1000);
            
            // Show welcome popup
            showWelcomePopup();
          }
        }, 3000);
      }
    );
  }
  
  // Enhanced memory entries
  document.querySelectorAll('.memory-entry').forEach(entry => {
    entry.style.transition = 'all 0.3s ease';
    
    entry.addEventListener('mouseenter', () => {
      entry.style.transform = 'translateY(-10px) scale(1.05)';
      entry.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
    });
    
    entry.addEventListener('mouseleave', () => {
      entry.style.transform = '';
      entry.style.boxShadow = '';
    });
  });
}

function showWelcomePopup() {
  const popup = document.createElement('div');
  popup.className = 'custom-alert animate__animated animate__zoomIn';
  popup.innerHTML = `
    <div class="alert-content">
      <h3>Happy 17th Birthday, Piyaa! 🎉</h3>
      <p>May this year be filled with joy, laughter, and unforgettable moments. Explore your special day!</p>
    </div>
  `;
  document.body.appendChild(popup);
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    popup.classList.add('animate__animated', 'animate__zoomOut');
    setTimeout(() => popup.remove(), 500);
  }, 10000);
}

function typeWriterEffect(element, text, speed, callback) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      // Handle line breaks
      if (text.charAt(i) === '\n') {
        element.innerHTML = element.innerHTML + '<br><span class="blinking-cursor">|</span>';
      } else {
        element.innerHTML = text.substring(0, i+1) + '<span class="blinking-cursor">|</span>';
      }
      i++;
      setTimeout(type, speed);
    } else {
      element.innerHTML = text;
      if (callback) callback();
    }
  }
  
  type();
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
// For 404 errors
app.use((req, res) => {
  res.redirect('/');
});

// For 500 errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.redirect('/');
});
