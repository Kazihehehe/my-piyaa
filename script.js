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

async function logVisit(ip, location, device, time) {
  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdcYPKyjEps70MN2Qx0l8Z-NxMMLBFTIt-8niPCg8yxZIHaUQ/formResponse';

  const formData = new FormData();
  formData.append('entry.453679306', ip);
  formData.append('entry.1666507460', location);
  formData.append('entry.1006184519', device);
  formData.append('entry.334390720', time);

  try {
    await fetch(formUrl, {
      method: 'POST',
      mode: 'no-cors', // Important to bypass CORS restrictions
      body: formData,
    });

    console.log("✅ Visitor logged to Google Form.");
  } catch (error) {
    console.error("❌ Visitor tracking failed:", error);
  }
}
