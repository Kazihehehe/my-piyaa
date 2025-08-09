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

  // Rest of your existing code...
});
