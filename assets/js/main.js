/**
 * SpeakBloom - Speech & Language Therapy Center
 * Master Interactive JavaScript Suite
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initMobileMenu();
  initMilestoneChecker();
  initAccordions();
  initAssessmentWizard();
  initFilterSystem();
  initStatsCounter();
  initGlobalModal();
  initPricingToggle();
  initDashboardTracker();
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
}

/* ==========================================================================
   4. Milestone Screener Interactive Data
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
    serviceLink: 'service-details.html'
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
    serviceLink: 'service-details.html'
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
    serviceLink: 'service-details.html'
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
    serviceLink: 'service-details.html'
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
    serviceLink: 'service-details.html'
  }
};

function initMilestoneChecker() {
  const container = document.getElementById('milestone-dynamic-content');
  const buttons = document.querySelectorAll('.milestone-age-btn');
  if (!container || !buttons.length) return;

  function renderMilestone(ageKey) {
    const data = milestoneData[ageKey] || milestoneData['24m'];
    
    container.innerHTML = '<div class="space-y-6">' +
      '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EFE7DE] dark:border-slate-800 pb-4">' +
        '<div>' +
          '<span class="text-xs font-bold text-[#C85A32] uppercase tracking-wider">Clinical Developmental Milestone</span>' +
          '<h3 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading mt-0.5">' + data.title + '</h3>' +
        '</div>' +
        '<a href="' + data.serviceLink + '" class="inline-flex items-center space-x-1 text-xs font-bold text-[#C85A32] hover:underline">' +
          '<span>Recommended Program &rarr;</span>' +
        '</a>' +
      '</div>' +
      '<p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">' + data.description + '</p>' +
      '<div class="space-y-3">' +
        '<h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Key Developmental Benchmarks:</h4>' +
        '<div class="grid sm:grid-cols-2 gap-3">' +
          data.benchmarks.map(item => {
            const cls = item.redFlag ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200' : 'bg-white dark:bg-[#182C23] border border-[#EFE7DE] dark:border-slate-800 text-slate-700 dark:text-slate-300';
            const iconCls = item.redFlag ? 'fa-triangle-exclamation text-rose-500' : 'fa-circle-check text-emerald-500';
            return '<div class="p-3.5 rounded-2xl ' + cls + ' flex items-start space-x-2.5">' +
              '<i class="fa-solid ' + iconCls + ' mt-0.5 shrink-0 text-sm"></i>' +
              '<span class="text-xs leading-relaxed font-semibold">' + item.text + '</span>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>' +
      '<div class="p-5 rounded-2xl bg-[#1E3D2F] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">' +
        '<div>' +
          '<p class="text-xs font-bold uppercase tracking-wider text-[#A7D7BC]">Concerned about your child\'s milestones?</p>' +
          '<p class="text-sm font-bold font-heading">Book a 60-Minute Comprehensive Play Assessment with Our Clinicians</p>' +
        '</div>' +
        '<a href="contact.html" class="px-5 py-2.5 rounded-full bg-[#C85A32] hover:bg-[#B04B26] text-white text-xs font-bold shadow transition whitespace-nowrap">' +
          'Schedule Intake &rarr;' +
        '</a>' +
      '</div>' +
    '</div>';
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('bg-[#C85A32]', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'dark:bg-[#182C23]', 'text-slate-700', 'dark:text-slate-300', 'border-[#EFE7DE]');
      });
      btn.classList.add('bg-[#C85A32]', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'dark:bg-[#182C23]', 'text-slate-700', 'dark:text-slate-300', 'border-[#EFE7DE]');
      
      renderMilestone(btn.dataset.age);
    });
  });

  renderMilestone('24m');
}

/* ==========================================================================
   5. Accordion FAQs
   ========================================================================== */
function initAccordions() {
  const accordions = document.querySelectorAll('.accordion-header, .faq-trigger');
  accordions.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('.accordion-icon, .fa-chevron-down');
      const isHidden = content.classList.contains('hidden');

      // Close other accordions in the same container if needed
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
   6. Multi-Step Assessment Booking Wizard (Forms on contact / modals)
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
          circle.className = 'step-circle w-8 h-8 rounded-full bg-[#C85A32] text-white font-bold text-xs flex items-center justify-center ring-4 ring-[#FDF0E6]';
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
        nextBtn.textContent = 'Continue &rarr;';
        nextBtn.classList.remove('hidden');
      }
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStep < totalSteps) {
        currentStep++;
        updateWizard();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateWizard();
      }
    });
  }

  updateWizard();
}

/* ==========================================================================
   7. Filter System (Services, Therapists, FAQs)
   ========================================================================== */
function initFilterSystem() {
  const filterBtns = document.querySelectorAll('.filter-btn, .filter-pill');
  const filterItems = document.querySelectorAll('.service-card, .therapist-card, .resource-card');
  const searchInput = document.getElementById('search-filter-input');

  if (filterBtns.length && filterItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active', 'bg-[#C07534]', 'text-white', 'shadow-sm');
          b.classList.add('bg-white', 'dark:bg-[#0D222E]', 'text-slate-600', 'dark:text-slate-300');
        });
        btn.classList.add('active', 'bg-[#C07534]', 'text-white', 'shadow-sm');
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
   8. Stats Counter Animation
   ========================================================================== */
function initStatsCounter() {
  const counters = document.querySelectorAll('.counter-value');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target || '0');
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            entry.target.textContent = target.toLocaleString() + (entry.target.dataset.suffix || '');
            clearInterval(timer);
          } else {
            entry.target.textContent = current.toLocaleString() + (entry.target.dataset.suffix || '');
          }
        }, 30);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(c => observer.observe(c));
}

/* ==========================================================================
   9. Global Assessment Booking Modal Controller
   ========================================================================== */
function initGlobalModal() {
  // Modal Open Trigger
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

  // Modal Close Trigger
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

  // Close when clicking modal backdrop
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
   10. Pricing Plan Switcher (Monthly vs Annual with 20% savings)
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
   11. Parent Dashboard Practice Tracker (dashboard.html)
   ========================================================================== */
function initDashboardTracker() {
  const logBtn = document.getElementById('log-practice-btn');
  const streakCount = document.getElementById('practice-streak-count');

  if (logBtn && streakCount) {
    logBtn.addEventListener('click', () => {
      let current = parseInt(streakCount.textContent || '7');
      current += 1;
      streakCount.textContent = current + ' Days';
      logBtn.textContent = '✓ Today Logged!';
      logBtn.disabled = true;
      logBtn.className = 'bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full cursor-default';
    });
  }
}

/* ==========================================================================
   12. Form Submission Handlers with Confirmation Alerts
   ========================================================================== */
function initFormHandlers() {
  const contactForm = document.getElementById('main-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Inquiry Received! We will call in 2h';
        submitBtn.className = 'bg-emerald-600 text-white font-bold text-xs px-6 py-3.5 rounded-full';
        submitBtn.disabled = true;
      }
    });
  }
}
