// ===== DOM Elements — ORIGINAL UNCHANGED =====
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const heroBg = document.getElementById('heroBg');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const scrollAnimateElements = document.querySelectorAll('.scroll-animate');

// ===== Custom Cursor — ORIGINAL UNCHANGED =====
const cursorDot = document.createElement('div');
const cursorRing = document.createElement('div');
cursorDot.classList.add('cursor-dot');
cursorRing.classList.add('cursor-ring');
document.body.appendChild(cursorDot);
document.body.appendChild(cursorRing);

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .service-card, .portfolio-card, .cta-button, .whatsapp-button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.classList.add('hovered');
    cursorRing.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    cursorDot.classList.remove('hovered');
    cursorRing.classList.remove('hovered');
  });
});

if ('ontouchstart' in window) {
  cursorDot.style.display = 'none';
  cursorRing.style.display = 'none';
}

// ===== Navbar Scroll Effect — ORIGINAL UNCHANGED =====
let lastScrollY = window.scrollY;

function handleNavbarScroll() {
  const currentScrollY = window.scrollY;
  if (currentScrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScrollY = currentScrollY;
}

window.addEventListener('scroll', handleNavbarScroll);

// ===== Mobile Menu Toggle — ORIGINAL UNCHANGED =====
function toggleMobileMenu() {
  mobileMenuBtn.classList.toggle('active');
  mobileMenu.classList.toggle('active');
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
});

// ===== Parallax Effect on Hero — ORIGINAL UNCHANGED =====
function handleParallax() {
  const scrollY = window.scrollY;
  const heroImage = heroBg.querySelector('.hero-image');
  if (heroImage && scrollY < window.innerHeight) {
    const parallaxOffset = scrollY * 0.4;
    heroImage.style.transform = `scale(1.1) translateY(${parallaxOffset}px)`;
  }
}

window.addEventListener('scroll', handleParallax);

// ===== Active Nav Link on Scroll — ORIGINAL UNCHANGED =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
      mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===== Scroll Reveal Animation — ORIGINAL UNCHANGED =====
function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.88;
  scrollAnimateElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < triggerBottom) {
      element.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== Smooth Scroll for Anchor Links — ORIGINAL UNCHANGED =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = targetElement.offsetTop - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// ===== Initialize on Load — ORIGINAL UNCHANGED =====
document.addEventListener('DOMContentLoaded', () => {
  handleNavbarScroll();
  revealOnScroll();
  updateActiveNavLink();
});

// ===== Resize Handler — ORIGINAL UNCHANGED =====
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth > 768) {
      mobileMenuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
    }
  }, 250);
});

// ===== NEW: Hero CTA Button — scroll to Contact Form instead of opening WhatsApp =====
const heroCtaBtn = document.getElementById('heroCtaBtn');
if (heroCtaBtn) {
  heroCtaBtn.addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = contactSection.offsetTop - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
}

// ===== NEW: WhatsApp number — from original project =====
const WHATSAPP_NUMBER = '972599552039';


// ===== NEW: Contact Form — WhatsApp submission =====
const submitFormBtn = document.getElementById('submitFormBtn');
if (submitFormBtn) {
  submitFormBtn.addEventListener('click', () => {
    const fullName    = document.getElementById('fullName').value.trim();
    const phone       = document.getElementById('phone').value.trim();
    const email       = document.getElementById('email').value.trim();
    const serviceType = document.getElementById('serviceType').value.trim();
    const message     = document.getElementById('message').value.trim();

    // Validate — highlight missing fields in red
    if (!fullName || !phone || !serviceType ) {
      [
        { id: 'fullName',    val: fullName    },
        { id: 'phone',       val: phone       },
        //{ id: 'email',       val: email       },
        { id: 'serviceType', val: serviceType }
        
      ].forEach(({ id, val }) => {
        const el = document.getElementById(id);
        if (!val) {
          el.style.borderColor = '#ff4d4d';
          el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
        }
      });
      return;
    }

    // Build formatted WhatsApp message
    const waMessage =
 `الاسم:
${fullName}
،
 رقم الهاتف: 
${phone}
 ،
${email ? `البريد الإلكتروني: ${email}` : ''}
 ،
 نوع الخدمة : 
${ serviceType}
 ،
${message ? `الرسالة: ${message}` : ''}
`;



    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}

// ===== NEW: Portfolio Videos — Click to Play =====
document.querySelectorAll('.portfolio-video-wrapper').forEach(wrapper => {
  const video   = wrapper.querySelector('.portfolio-video');
  const overlay = wrapper.querySelector('.portfolio-play-overlay');
  if (!video || !overlay) return;

  function startVideo() {
    wrapper.classList.add('playing');
    video.controls = true;
    video.play().catch(() => {});
  }

  // Click overlay or anywhere on wrapper before playing
  overlay.addEventListener('click', startVideo);
  wrapper.addEventListener('click', () => {
    if (!wrapper.classList.contains('playing')) startVideo();
  });

  // Video ends → reset to overlay
  video.addEventListener('ended', () => {
    wrapper.classList.remove('playing');
    video.controls = false;
    video.load();
  });

  // User pauses via native controls → show overlay again
  video.addEventListener('pause', () => {
    if (video.ended) return;
    wrapper.classList.remove('playing');
    video.controls = false;
  });

  // User resumes via native controls → keep overlay hidden
  video.addEventListener('play', () => {
    wrapper.classList.add('playing');
    video.controls = true;
  });
});