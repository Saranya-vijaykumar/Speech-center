/**
 * SpeakBloom - Speech & Language Therapy Center
 * Master Interactive JavaScript & Animation Suite
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initMobileMenu();
  initScrollReveal();
  initMilestoneChecker();
  initAccordions();
  initAssessmentWizard();
  initFilterSystem();
  initStatsCounter();
  initGlobalModal();
  initPricingToggle();
  initBackToTop();
  initFormHandlers();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle-btn, #themeToggle');
  const savedTheme = localStorage.getItem('speakbloom_theme');
  
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('speakbloom_theme', isDark ? 'dark' : 'light');
      updateThemeIcons();
    });
  });

  updateThemeIcons();
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  document.querySelectorAll('.theme-icon-light').forEach(el => {
    el.style.display = isDark ? 'none' : 'inline-block';
  });
  document.querySelectorAll('.theme-icon-dark').forEach(el => {
    el.style.display = isDark ? 'inline-block' : 'none';
  });
}

/* ==========================================================================
   2. RTL Toggle (Right-to-Left / Left-to-Right)
   ========================================================================== */
function initRTL() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle-btn, #rtlToggle');
  const savedDir = localStorage.getItem('speakbloom_direction') || 'ltr';
  
  document.documentElement.setAttribute('dir', savedDir);
  updateRTLButtons(savedDir);

  rtlToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('speakbloom_direction', newDir);
      updateRTLButtons(newDir);
    });
  });
}

function updateRTLButtons(dir) {
  document.querySelectorAll('.rtl-text-indicator').forEach(el => {
    el.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
  });
}

/* ==========================================================================
   3. Mobile Navigation Menu Drawer
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('close-drawer-btn');
  const backdrop = document.getElementById('mobile-backdrop');

  if (!menuBtn || !mobileDrawer) return;

  function toggleDrawer(open) {
    if (open) {
      mobileDrawer.classList.remove('translate-x-full', '-translate-x-full');
      if (backdrop) backdrop.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    } else {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      mobileDrawer.classList.add(isRtl ? '-translate-x-full' : 'translate-x-full');
      if (backdrop) backdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  }

  menuBtn.addEventListener('click', () => toggleDrawer(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleDrawer(false));
  if (backdrop) backdrop.addEventListener('click', () => toggleDrawer(false));

  // Escape key closes mobile drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleDrawer(false);
  });
}

/* ==========================================================================
   4. Scroll Reveal Animations (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  document.querySelectorAll('section > div, .interactive-card, .service-card, .therapist-card, .faq-item').forEach((el, index) => {
    if (!el.classList.contains('reveal-item')) {
      el.classList.add('reveal-item');
      const delay = (index % 4) * 100;
      if (delay > 0) el.classList.add(`delay-${delay}`);
    }
  });

  const reveals = document.querySelectorAll('.reveal-item');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   5. Milestone Screener Interactive Data
   ========================================================================== */
const milestoneData = {
  '6m': {
    title: '6 to 12 Months: Babbling & Sound Exploration',
    description: 'During this critical phase, infants transition from reflexive vocalizations to intentional canonical babbling ("ba-ba", "da-da") and communicative gestures.',
    benchmarks: [
      { text: 'Strings consonant-vowel combinations together (e.g. "ba-ba", "ma-ma", "da-da")', redFlag: false },
      { text: 'Responds with head turns and smiling to own name and familiar voices', redFlag: false },
      { text: 'Uses early non-verbal gestures (waving "bye-bye", reaching to be held, shaking head "no")', redFlag: false },
      { text: 'Red Flag: Absence of babbling, lack of joint eye attention, or unresponsive to environmental sounds', redFlag: true }
    ],
    recommendedService: 'Infant Early Communication Coaching',
    serviceLink: 'service-toddler-delay.html'
  },
  '18m': {
    title: '12 to 18 Months: First Words & Pointing',
    description: 'Toddlers develop intentional symbolic language, using isolated single words alongside pointing to request or draw parental attention.',
    benchmarks: [
      { text: 'Uses at least 10 to 20 functional spoken words consistently', redFlag: false },
      { text: 'Points with index finger to show interest or request out-of-reach toys', redFlag: false },
      { text: 'Imitates animal sounds and environment noises during playful games ("moo", "beep")', redFlag: false },
      { text: 'Red Flag: Fewer than 6 words, loss of previously acquired words, or no response to simple 1-step requests', redFlag: true }
    ],
    recommendedService: 'Late Talker Toddler Play Program',
    serviceLink: 'service-toddler-delay.html'
  },
  '24m': {
    title: '2 Years (24 Months): Word Combinations & Vocabulary Explosion',
    description: 'The golden window of toddler language explosion where vocabulary typically reaches 50+ words and early two-word combinations emerge.',
    benchmarks: [
      { text: 'Spoken vocabulary of 50+ distinct single words', redFlag: false },
      { text: 'Spontaneously joins 2 words together (e.g. "more juice", "big truck", "bye daddy")', redFlag: false },
      { text: 'Understood by familiar caregivers at least 50% of the time', redFlag: false },
      { text: 'Red Flag: No 2-word spontaneous phrases, repetitive echolalia only, or extreme frustration communicating', redFlag: true }
    ],
    recommendedService: 'Child Speech & Language Delay Program',
    serviceLink: 'service-toddler-delay.html'
  },
  '3y': {
    title: '3 Years Old: Sentences & Conversational Curiosity',
    description: 'Children construct 3-to-4 word grammatically structured sentences, ask frequent questions ("Why?", "What\'s that?"), and converse with peers.',
    benchmarks: [
      { text: 'Uses 3 to 5-word complete sentences to express thoughts and describe actions', redFlag: false },
      { text: 'Understood by unfamiliar listeners 75% of the time', redFlag: false },
      { text: 'Understands spatial concepts (in, on, under) and follows 2-step related directions', redFlag: false },
      { text: 'Red Flag: Persistent sound repetition (stuttering blocks), unclear speech to strangers, or difficulty following simple directions', redFlag: true }
    ],
    recommendedService: 'Preschool Articulation & Fluency Program',
    serviceLink: 'service-articulation.html'
  },
  '5y': {
    title: '4 to 5+ Years: Storytelling & School Articulation Readiness',
    description: 'Preschoolers narrate sequential stories, master complex grammatical structures, and refine tricky consonant blends in preparation for reading.',
    benchmarks: [
      { text: 'Understood 90% to 100% of the time by strangers in everyday conversation', redFlag: false },
      { text: 'Narrates simple multi-sentence stories with a beginning, middle, and end', redFlag: false },
      { text: 'Masters most speech sounds (/k/, /g/, /f/, /v/, /l/, /s/) with phonological clarity', redFlag: false },
      { text: 'Red Flag: Noticeable lisp, sound substitutions (/w/ for /r/), inability to tell a coherent story, or social withdrawal in groups', redFlag: true }
    ],
    recommendedService: 'School Readiness & Speech Articulation Therapy',
    serviceLink: 'service-school-readiness.html'
  }
};

function initMilestoneChecker() {
  const container = document.getElementById('milestone-dynamic-content');
  const buttons = document.querySelectorAll('.milestone-age-btn');
  if (!container || !buttons.length) return;

  function renderMilestone(ageKey) {
    const data = milestoneData[ageKey] || milestoneData['24m'];
    
    container.innerHTML = '<div class="space-y-6 animate-fadeIn">' +
      '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2EBF0] dark:border-slate-800 pb-4">' +
        '<div>' +
          '<span class="text-xs font-bold text-[#FF7A59] uppercase tracking-wider">Clinical Developmental Milestone</span>' +
          '<h3 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading mt-0.5">' + data.title + '</h3>' +
        '</div>' +
        '<a href="' + data.serviceLink + '" class="inline-flex items-center space-x-1 text-xs font-bold text-[#FF7A59] hover:underline">' +
          '<span>Recommended Program &rarr;</span>' +
        '</a>' +
      '</div>' +
      '<p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">' + data.description + '</p>' +
      '<div class="space-y-3">' +
        '<h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Key Developmental Benchmarks:</h4>' +
        '<div class="grid sm:grid-cols-2 gap-3">' +
          data.benchmarks.map(item => {
            const cls = item.redFlag ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200' : 'bg-white dark:bg-[#0D222E] border border-[#E2EBF0] dark:border-slate-800 text-slate-700 dark:text-slate-300';
            const iconCls = item.redFlag ? 'fa-triangle-exclamation text-rose-500' : 'fa-circle-check text-emerald-500';
            return '<div class="p-3.5 rounded-2xl ' + cls + ' flex items-start space-x-2.5 shadow-sm">' +
              '<i class="fa-solid ' + iconCls + ' mt-0.5 shrink-0 text-sm"></i>' +
              '<span class="text-xs leading-relaxed font-semibold">' + item.text + '</span>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>' +
      '<div class="p-5 rounded-2xl bg-[#0A4D68] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">' +
        '<div>' +
          '<p class="text-xs font-bold uppercase tracking-wider text-[#EBF4F6]">Concerned about your child\'s speech progress?</p>' +
          '<p class="text-sm font-bold font-heading">Book a 60-Minute Comprehensive Play Assessment with Our Clinicians</p>' +
        '</div>' +
        '<a href="contact.html" class="btn-peach text-xs font-bold shadow-lg transition whitespace-nowrap">' +
          'Schedule Intake &rarr;' +
        '</a>' +
      '</div>' +
    '</div>';
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('bg-[#FF7A59]', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'dark:bg-[#0D222E]', 'text-slate-700', 'dark:text-slate-300', 'border-[#E2EBF0]');
      });
      btn.classList.add('bg-[#FF7A59]', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'dark:bg-[#0D222E]', 'text-slate-700', 'dark:text-slate-300', 'border-[#E2EBF0]');
      
      renderMilestone(btn.dataset.age);
    });
  });

  renderMilestone('24m');
}

/* ==========================================================================
   6. Accordion FAQs
   ========================================================================== */
function initAccordions() {
  const accordions = document.querySelectorAll('.accordion-header, .faq-trigger');
  accordions.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('.accordion-icon, .fa-chevron-down');
      const isHidden = content.classList.contains('hidden');

      const parent = header.closest('#faq-accordion, .accordion-group');
      if (parent) {
        parent.querySelectorAll('.faq-content, .accordion-content').forEach(c => c.classList.add('hidden'));
        parent.querySelectorAll('.fa-chevron-down, .accordion-icon').forEach(i => i.classList.remove('rotate-180'));
      }

      if (isHidden) {
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      } else {
        content.classList.add('hidden');
        if (icon) icon.classList.remove('rotate-180');
      }
    });
  });
}

/* ==========================================================================
   7. Multi-Step Assessment Booking Wizard
   ========================================================================== */
function initAssessmentWizard() {
  const form = document.getElementById('assessment-wizard-form');
  const nextBtn = document.getElementById('wizard-next-btn');
  const prevBtn = document.getElementById('wizard-prev-btn');
  const stepPanes = document.querySelectorAll('.wizard-step-pane');
  const stepIndicators = document.querySelectorAll('.wizard-step-indicator');
  
  if (!form || !stepPanes.length) return;

  let currentStep = 1;
  const totalSteps = stepPanes.length;

  function updateWizard() {
    stepPanes.forEach(pane => {
      pane.classList.toggle('hidden', parseInt(pane.dataset.step) !== currentStep);
    });

    stepIndicators.forEach(ind => {
      const stepNum = parseInt(ind.dataset.step);
      const circle = ind.querySelector('.step-circle');
      if (circle) {
        if (stepNum === currentStep) {
          circle.className = 'step-circle w-8 h-8 rounded-full bg-[#FF7A59] text-white font-bold text-xs flex items-center justify-center ring-4 ring-[#FFE3DA]';
        } else if (stepNum < currentStep) {
          circle.className = 'step-circle w-8 h-8 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center';
        } else {
          circle.className = 'step-circle w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs flex items-center justify-center';
        }
      }
    });

    if (prevBtn) prevBtn.classList.toggle('hidden', currentStep === 1 || currentStep === totalSteps);
    if (nextBtn) {
      if (currentStep === totalSteps) {
        nextBtn.classList.add('hidden');
      } else if (currentStep === totalSteps - 1) {
        nextBtn.textContent = 'Submit Intake Form';
        nextBtn.classList.remove('hidden');
      } else {
        nextBtn.textContent = 'Continue →';
        nextBtn.classList.remove('hidden');
      }
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentStep === totalSteps - 1) {
        // Complete form
        currentStep = totalSteps;
        updateWizard();
      } else if (currentStep < totalSteps) {
        currentStep++;
        updateWizard();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentStep > 1) {
        currentStep--;
        updateWizard();
      }
    });
  }

  updateWizard();
}

/* ==========================================================================
   8. Filter System (Services, Therapists, FAQs, Resources)
   ========================================================================== */
function initFilterSystem() {
  const filterBtns = document.querySelectorAll('.filter-btn, .filter-pill');
  const filterItems = document.querySelectorAll('.service-card, .therapist-card, .resource-card, .blog-card');
  const searchInput = document.getElementById('search-filter-input');

  if (filterBtns.length && filterItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active', 'bg-[#FF7A59]', 'text-white', 'shadow-sm', 'bg-[#C07534]');
          b.classList.add('bg-white', 'dark:bg-[#0D222E]', 'text-slate-600', 'dark:text-slate-300');
        });
        btn.classList.add('active', 'bg-[#FF7A59]', 'text-white', 'shadow-sm');
        btn.classList.remove('bg-white', 'dark:bg-[#0D222E]', 'text-slate-600', 'dark:text-slate-300');

        const filterVal = btn.dataset.filter;
        filterItems.forEach(item => {
          if (filterVal === 'all' || item.dataset.category === filterVal || (item.dataset.specialty && item.dataset.specialty.includes(filterVal))) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  if (searchInput && filterItems.length) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      filterItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(q) ? 'flex' : 'none';
      });
    });
  }
}

/* ==========================================================================
   9. Stats Counter Animation
   ========================================================================== */
function initStatsCounter() {
  const counters = document.querySelectorAll('.counter-value');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target || '0');
        let current = 0;
        const step = Math.ceil(target / 45);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            entry.target.textContent = target.toLocaleString() + (entry.target.dataset.suffix || '');
            clearInterval(timer);
          } else {
            entry.target.textContent = current.toLocaleString() + (entry.target.dataset.suffix || '');
          }
        }, 25);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(c => observer.observe(c));
}

/* ==========================================================================
   10. Global Assessment Booking Modal Controller
   ========================================================================== */
function initGlobalModal() {
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      const targetModal = document.getElementById(modalId) || document.getElementById('assessment-wizard-modal') || document.getElementById('booking-modal');
      if (targetModal) {
        targetModal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      } else {
        window.location.href = 'contact.html';
      }
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = btn.closest('#assessment-wizard-modal, #booking-modal, .fixed');
      if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    });
  });

  document.querySelectorAll('#assessment-wizard-modal, #booking-modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    });
  });
}

/* ==========================================================================
   11. Pricing Plan Switcher
   ========================================================================== */
function initPricingToggle() {
  const billingToggle = document.getElementById('pricing-billing-toggle');
  const priceElements = document.querySelectorAll('.pricing-card-amount');
  const periodElements = document.querySelectorAll('.pricing-card-period');

  if (!billingToggle || !priceElements.length) return;

  billingToggle.addEventListener('change', (e) => {
    const isAnnual = e.target.checked;
    priceElements.forEach(el => {
      const monthlyPrice = parseInt(el.dataset.monthly || '0');
      const annualPrice = parseInt(el.dataset.annual || Math.round(monthlyPrice * 0.8));
      el.textContent = '₹' + (isAnnual ? annualPrice.toLocaleString() : monthlyPrice.toLocaleString());
    });
    periodElements.forEach(el => {
      el.textContent = isAnnual ? '/session (Billed Annually)' : '/session';
    });
  });
}

/* ==========================================================================
   12. Floating Back to Top Button
   ========================================================================== */
function initBackToTop() {
  let btn = document.getElementById('back-to-top-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'back-to-top-btn';
    btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    btn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(btn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('show-btn');
    } else {
      btn.classList.remove('show-btn');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   13. Form Submission Handlers
   ========================================================================== */
function initFormHandlers() {
  // Contact Form
  const contactForm = document.getElementById('main-contact-form') || document.querySelector('form[action="contact.html"]');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fa-solid fa-check mr-2"></i> Inquiry Received! We will call within 2 hours.';
        submitBtn.className = 'bg-emerald-600 text-white font-bold text-xs px-6 py-3.5 rounded-full w-full justify-center flex items-center shadow-lg';
        submitBtn.disabled = true;
      }
    });
  }

  // Login Form
  const loginForm = document.querySelector('form[action="login.html"]') || document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Logging In...';
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fa-solid fa-check mr-2"></i> Welcome Back! Redirecting...';
          submitBtn.className = 'bg-emerald-600 text-white font-bold text-xs py-3.5 rounded-full w-full justify-center flex items-center';
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 1200);
        }, 1000);
      }
    });
  }

  // Register Form
  const registerForm = document.querySelector('form[action="register.html"]') || document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = registerForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Creating Account...';
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fa-solid fa-check mr-2"></i> Account Created! Redirecting to Portal...';
          submitBtn.className = 'bg-emerald-600 text-white font-bold text-xs py-3.5 rounded-full w-full justify-center flex items-center';
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 1200);
        }, 1000);
      }
    });
  }
}
