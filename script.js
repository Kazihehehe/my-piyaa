// Add this at the beginning of your existing script
document.addEventListener('DOMContentLoaded', () => {
  // Intro animation
  setTimeout(() => {
    document.querySelector('.intro-overlay').style.display = 'none';
  }, 8000);

  // Scroll animations
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

 
});
document.addEventListener('DOMContentLoaded', () => {
  // Intro typing animation
  const introText = document.querySelector('.intro-text');
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

  // Create floating petals
  function createPetals() {
    const petalImages = ['🌸', '🌺', '🌷', '🌼', '🏵️'];
    const container = document.querySelector('.floating-elements-container');
    
    for (let i = 0; i < 15; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal floating-emoji';
      petal.textContent = petalImages[Math.floor(Math.random() * petalImages.length)];
      petal.style.left = Math.random() * 100 + 'vw';
      petal.style.fontSize = (Math.random() * 20 + 15) + 'px';
      petal.style.animationDuration = (Math.random() * 10 + 10) + 's';
      petal.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(petal);
    }
  }
  
  createPetals();

  // Lightbox functionality
  const memoryEntries = document.querySelectorAll('.memory-entry');
  const lightbox = document.querySelector('.lightbox');
  const lightboxContent = document.querySelector('.lightbox-content');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const closeBtn = document.querySelector('.close-lightbox');
  
  memoryEntries.forEach(entry => {
    entry.addEventListener('click', () => {
      const imgSrc = entry.querySelector('img').src;
      const caption = entry.querySelector('.memory-year').textContent;
      
      lightboxContent.innerHTML = `
        <img src="${imgSrc}" style="max-width:100%; max-height:80vh; display:block;">
        <div class="lightbox-caption">${caption}</div>
        <button class="favorite-btn">❤️</button>
        <span class="close-lightbox">&times;</span>
      `;
      
      lightbox.style.display = 'flex';
    });
  });
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('close-lightbox')) {
      lightbox.style.display = 'none';
    }
  });

  // Scroll animations
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

});
document.addEventListener('DOMContentLoaded', () => {
  // Audio toggle
  const audio = document.getElementById('birthday-audio');
  const toggleButton = document.getElementById('audio-toggle');

  toggleButton.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      toggleButton.textContent = "Pause Music";
    } else {
      audio.pause();
      toggleButton.textContent = "Play Music";
    }
  });

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

  // Floating emojis
  const emojis = ["🌷", "🍜", "🥹", "🍰", "🎉"];
  function spawnEmoji() {
    const emoji = document.createElement("div");
    emoji.className = "floating-emoji";
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = `${Math.random() * 100}%`;
    emoji.style.top = "100%";
    document.querySelector(".floating-elements-container").appendChild(emoji);
    setTimeout(() => emoji.remove(), 10000);
  }
  setInterval(spawnEmoji, 800);

  // Crying emoji game
  window.catchEmoji = function() {
    const emoji = document.getElementById("emoji");
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

    const flower = document.createElement("div");
    flower.textContent = "🌸";
    flower.style.position = "absolute";
    flower.style.left = `${e.pageX + 20}px`;
    flower.style.top = `${e.pageY - 20}px`;
    flower.style.fontSize = "28px";
    flower.style.animation = "float 2s ease-out";
    document.body.appendChild(flower);
    setTimeout(() => flower.remove(), 2000);
  });

  // Scroll animations
  const observerOptions = {
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-bottom');
  elements.forEach(el => observer.observe(el));
});

// Login form handling
document.getElementById('login-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Simple validation - replace with your actual credentials
  if (email === "piyaa@example.com" && password === "18party") {
    window.location.href = "home.html";
  } else {
    alert("Invalid credentials. Try again.");
  }

});
// In your script.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

