document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('birthday-audio');
  const button = document.getElementById('audio-toggle');
  const timerElement = document.getElementById('timer');

  // 🎶 Audio toggle logic
  button.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      button.textContent = 'Pause Music';
    } else {
      audio.pause();
      button.textContent = 'Play Music';
    }
  });

  // ⏳ Countdown timer logic
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

  

  // 🌸 Floating Emoji Spawner
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

  // 🎮 Crying Emoji Game
  window.catchEmoji = function () {
    const emoji = document.getElementById("emoji");
    emoji.style.transform = "scale(1.5)";
    emoji.style.transition = "transform 0.3s ease";
    setTimeout(() => {
      emoji.style.transform = "scale(1)";
      alert("heheheheeheheheheheh...I just love you");
    }, 300);
  };

  // 🎁 Surprise Button
  const surpriseButton = document.getElementById("surpriseButton");
  surpriseButton.addEventListener("click", () => {
    alert("🌟 SURPRISE: You’re officially unforgettable. Welcome to the journey through 17, Piyaa!");
    document.body.style.background = "linear-gradient(to right, #ffe0f0, #e0f7fa)";
  });

  // ✨ Click sparkles & flowers
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
});
// 📜 Scroll Entry Observer
document.addEventListener('DOMContentLoaded', () => {
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

function checkLogin() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const error = document.getElementById('errorMsg');

  const correctUser = "piyaa"; // 🌸 your preset username
  const correctPass = "18party"; // 🎉 your preset password

  if (user === correctUser && pass === correctPass) {
    window.location.href = "home.html"; // ⬅️ redirects to your actual site
  } else {
    error.textContent = "❌ Invalid username or password.";
  }
}


const canvas = document.getElementById("leaves-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const leaves = [];
const leafImg = new Image();
leafImg.src = "https://i.imgur.com/YG6sXgN.png"; // 🍁 A leaf image (transparent background)

function Leaf() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.speed = 1 + Math.random() * 3;
  this.size = 20 + Math.random() * 30;
  this.angle = Math.random() * 360;
  this.spin = 0.02 + Math.random() * 0.05;

  this.draw = () => {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(leafImg, -this.size/2, -this.size/2, this.size, this.size);
    ctx.restore();
  };

  this.update = () => {
    this.y += this.speed;
    this.angle += this.spin;
    if (this.y > canvas.height) {
      this.y = -this.size;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  };
}

function initLeaves() {
  for (let i = 0; i < 30; i++) {
    leaves.push(new Leaf());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  leaves.forEach(leaf => leaf.update());
  requestAnimationFrame(animate);
}

leafImg.onload = () => {
  initLeaves();
  animate();
};

gtag('event', 'login_attempt', {
  'event_category': 'login',
  'event_label': 'login_page',
  'value': 1
});


