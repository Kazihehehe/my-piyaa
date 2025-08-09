document.addEventListener('DOMContentLoaded', () => {
  // Intro typing animation
  const introText = document.querySelector('.intro-text');
  if (introText) {
    const fullText = "Once upon a time, a boy named Kazi created this for your 17th birthday\nTo make you smile today and remember him in your golden years...";
    let i = 0;
    
    function typeWriter() {
      if (i < fullText.length) {
        introText.innerHTML = fullText.substring(0, i+1) + '<span class="blinking-cursor">|</span>';
        i++;
        setTimeout(typeWriter, 100);
      } else {
        introText.innerHTML = fullText;
        setTimeout(() => {
          document.querySelector('.intro-overlay').style.opacity = '0';
          setTimeout(() => {
            document.querySelector('.intro-overlay').style.display = 'none';
          }, 1000);
        }, 4000);
      }
    }
    typeWriter();
  }

  // Create floating elements
  function createFloatingElements() {
    const container = document.querySelector('.floating-elements-container') || 
                      document.querySelector('.floating-hearts') || 
                      document.querySelector('.floating-elements');
    
    if (!container) return;
    
    const elements = ['🌸', '🌷', '🎀', '✨', '🎂', '💖', '🎈', '🥳', '❤️', '🧡', '💛', '💚', '💙', '💜'];
    
    for (let i = 0; i < 20; i++) {
      const element = document.createElement('div');
      element.className = container.classList.contains('floating-hearts') ? 'heart' : 'floating-element';
      element.textContent = elements[Math.floor(Math.random() * elements.length)];
      element.style.left = Math.random() * 100 + 'vw';
      element.style.fontSize = (Math.random() * 20 + 15) + 'px';
      element.style.animationDuration = (Math.random() * 10 + 10) + 's';
      element.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(element);
    }
  }

  // Initialize scroll animations
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

  // Audio toggle
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

  // Countdown timer
  const timerElement = document.getElementById('timer');
  if (timerElement) {
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

  // Crying emoji game
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

  // Surprise button
  const surpriseButton = document.getElementById("surpriseButton");
  if (surpriseButton) {
    surpriseButton.addEventListener("click", () => {
      alert("🌟 SURPRISE: You're officially unforgettable. Welcome to the journey through 17, Piyaa!");
      document.body.style.background = "linear-gradient(to right, #ffe0f0, #e0f7fa)";
    });
  }

  // Click sparkles
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

  // Button click effects
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
      this.classList.add('animate__animated', 'animate__rubberBand');
      setTimeout(() => {
        this.classList.remove('animate__animated', 'animate__rubberBand');
      }, 1000);
    });
  });

  // Initialize everything
  createFloatingElements();
  initScrollAnimations();
});

// Service Worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
