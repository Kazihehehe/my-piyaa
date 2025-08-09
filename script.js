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

  // Rest of your existing code...
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
