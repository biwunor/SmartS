document.addEventListener('DOMContentLoaded', function () {
  // ===================================
  // Hamburger Menu Toggle
  // ===================================
  const hamburger = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      hamburger.classList.toggle('open');
    });
  }

  // ===================================
  // Click/Tap Effect on Cards & Icons
  // ===================================
  document.querySelectorAll(".feature-card").forEach(card => {
    card.addEventListener("click", function () {
      document.querySelectorAll(".feature-card").forEach(c => c.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // ===================================
  // Buttons Alert for "Feature Coming Soon"
  // ===================================
  document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent bubbling
      alert("Feature Coming Soon!");
    });
  });

  // ===================================
  // Swiper Slider Initialization
  // ===================================
  if (document.querySelector('.swiper')) {
    new Swiper(".swiper", {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      speed: 800,
      slidesPerView: "auto",
      centeredSlides: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      }
    });
  }

  // ===================================
  // Particle Animation (Canvas)
  // ===================================
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let cursorParticles = [];

    class Particle {
      constructor(x, y, size, speedX, speedY, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.98;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    document.addEventListener('mousemove', (e) => {
      createCursorParticle(e.clientX, e.clientY);
    });

    function createCursorParticle(x, y) {
      cursorParticles.push(new Particle(
        x, y, Math.random() * 3 + 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        `hsl(${Math.random() * 360}, 100%, 60%)`
      ));
    }

    function animateCursorParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cursorParticles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.size < 0.5) {
          cursorParticles.splice(index, 1);
        }
      });
      requestAnimationFrame(animateCursorParticles);
    }

    animateCursorParticles();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cursorParticles = []; // Clear particles on resize
    });
  }

  // ===================================
  // Back-to-Top Button
  // ===================================
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.classList.toggle('show-back-to-top', window.scrollY > 300);
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
