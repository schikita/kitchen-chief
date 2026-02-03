lucide.createIcons();

// Генерация пара для loader'а
function createSteam() {
  const container = document.getElementById("steam-container");
  if (!container) return;

  for (let i = 0; i < 5; i++) {
    const particle = document.createElement("div");
    particle.className = "steam-particle";
    particle.style.width = Math.random() * 60 + 40 + "px";
    particle.style.height = particle.style.width;
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 50 + 50 + "%";
    particle.style.animationDelay = Math.random() * 0.5 + "s";
    container.appendChild(particle);
  }
}

// Запускаем создание пара сразу
createSteam();

// Измените тайминг скрытия loader'а на 4.5 секунд (вместо старых 2 секунд)
setTimeout(() => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    setTimeout(() => {
      loader.style.display = "none";
      // Вызываем вашу существующую функцию инициализации анимаций
      if (typeof initAnimations === "function") {
        initAnimations();
      }
    }, 800);
  }
}, 4500);

// Three.js Background
function initThreeJS() {
  const canvas = document.getElementById("webgl-canvas");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Create floating particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 100;
  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3),
  );

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0xd4af37,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  camera.position.z = 3;

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    particlesMesh.rotation.x += 0.001;
    particlesMesh.rotation.y += 0.001;

    particlesMesh.rotation.x += mouseY * 0.001;
    particlesMesh.rotation.y += mouseX * 0.001;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

initThreeJS();

// GSAP Animations
function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Navbar animation
  gsap.to("#navbar", {
    y: 0,
    duration: 0.8,
    ease: "power3.out",
  });

  // Hero animations
  const heroTl = gsap.timeline();

  heroTl
    .to("#hero-subtitle", {
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .to(
      "#hero-title-1",
      {
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.4",
    )
    .to(
      "#hero-title-2",
      {
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.6",
    )
    .to(
      "#hero-text",
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4",
    )
    .to(
      "#hero-buttons",
      {
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4",
    )
    .to(
      "#chef-container",
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      },
      "-=0.8",
    );

  // Parallax effect on scroll
  gsap.utils.toArray(".parallax-layer").forEach((layer) => {
    const speed = layer.dataset.speed || 0.5;
    gsap.to(layer, {
      yPercent: 50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: layer.parentElement,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // About section reveals
  gsap.utils.toArray(".about-reveal").forEach((elem, i) => {
    gsap.from(elem, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: elem,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // Interview section
  gsap.utils.toArray(".interview-reveal").forEach((elem, i) => {
    gsap.from(elem, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: elem,
        start: "top 85%",
      },
    });
  });

  // Video section
  gsap.utils.toArray(".video-reveal").forEach((elem, i) => {
    gsap.from(elem, {
      x: -30,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: elem,
        start: "top 85%",
      },
    });
  });

  // Gallery columns parallax
  gsap.to(".gallery-col-1", {
    y: -100,
    ease: "none",
    scrollTrigger: {
      trigger: "#gallery",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(".gallery-col-3", {
    y: -150,
    ease: "none",
    scrollTrigger: {
      trigger: "#gallery",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.utils.toArray(".gallery-reveal").forEach((elem, i) => {
    gsap.from(elem, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: elem,
        start: "top 85%",
      },
    });
  });

  // CTA section
  gsap.utils.toArray(".cta-reveal").forEach((elem, i) => {
    gsap.from(elem, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: elem,
        start: "top 85%",
      },
    });
  });
}

// Swiper Initialization
const swiper = new Swiper(".interview-swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next-custom",
    prevEl: ".swiper-button-prev-custom",
  },
  pagination: {
    el: ".swiper-pagination-custom",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = mobileMenuBtn.querySelector(".menu-icon");
const closeIcon = mobileMenuBtn.querySelector(".close-icon");
const mobileLinks = document.querySelectorAll(".mobile-link");
let isMenuOpen = false;

function toggleMenu() {
  isMenuOpen = !isMenuOpen;

  if (isMenuOpen) {
    // Открываем меню
    mobileMenu.classList.remove("translate-x-full");
    // Меняем иконку на крестик
    menuIcon.classList.add("hidden");
    closeIcon.classList.remove("hidden");
    // Добавляем эффект поворота для красоты
    gsap.to(closeIcon, { rotation: 90, duration: 0.3 });
  } else {
    // Закрываем меню
    mobileMenu.classList.add("translate-x-full");
    // Возвращаем иконку меню
    closeIcon.classList.add("hidden");
    menuIcon.classList.remove("hidden");
  }
}

// Клик по кнопке (открыть/закрыть)
mobileMenuBtn.addEventListener("click", toggleMenu);

// Клик по пунктам меню (закрыть)
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (isMenuOpen) toggleMenu();
  });
});

// Закрытие при клике вне меню (опционально)
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu && isMenuOpen) {
    toggleMenu();
  }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: target,
          offsetY: 80,
        },
        ease: "power3.inOut",
      });
    }
  });
});

// 3D Card Tilt Effect
document.querySelectorAll(".card-3d").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    const inner = card.querySelector(".card-3d-inner");
    if (inner) {
      inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    }
  });

  card.addEventListener("mouseleave", () => {
    const inner = card.querySelector(".card-3d-inner");
    if (inner) {
      inner.style.transform = "rotateX(0) rotateY(0) translateZ(0)";
    }
  });
});

// GSAP ScrollTo Plugin (simplified version)
gsap.registerPlugin({
  name: "scrollTo",
  init(target, value) {
    this.target = target;
    this.y = typeof value === "object" ? value.y : value;
    this.offsetY = value.offsetY || 0;
  },
  render(ratio) {
    const targetY =
      typeof this.y === "string"
        ? document.querySelector(this.y).offsetTop - this.offsetY
        : this.y;
    window.scrollTo(0, targetY * ratio);
  },
});

const scrollBtn = document.getElementById("scrollToTop");

function toggleScrollBtn() {
  if (window.pageYOffset > 300) {
    scrollBtn.classList.add("visible");
  } else {
    scrollBtn.classList.remove("visible");
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

window.addEventListener("scroll", toggleScrollBtn);
scrollBtn.addEventListener("click", scrollToTop);

toggleScrollBtn();


 (function () {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("imageModalImg");
    var closeBtn = document.getElementById("imageModalCloseBtn");
    var backdrop = modal.querySelector("[data-modal-backdrop]");

    // Критично: модалка должна быть в body, иначе Swiper/transform может "сломать" fixed/z-index
    if (modal && modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }

    function openModal(src, alt) {
      if (!src) return;

      modalImg.src = src;
      modalImg.alt = alt || "";

      modal.classList.remove("hidden");
      modal.classList.add("flex");
      modal.setAttribute("aria-hidden", "false");

      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      modal.setAttribute("aria-hidden", "true");

      modalImg.src = "";
      modalImg.alt = "";

      document.body.style.overflow = "";
    }

    document.addEventListener("click", function (e) {
      var img = e.target && e.target.closest && e.target.closest("img[data-modal-img]");
      if (!img) return;

      openModal(img.getAttribute("src"), img.getAttribute("alt"));
    });

    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      closeModal();
    });

    backdrop.addEventListener("click", function () {
      closeModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
      }
    });

    window.closeModal = closeModal;
  })();