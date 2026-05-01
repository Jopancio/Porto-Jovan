// ── Splash screen ──
(function() {
  const splash = document.getElementById('splash');
  const splashCard = document.getElementById('splash-card');
  const splashEyebrow = document.getElementById('splash-eyebrow');
  const splashTitle = document.getElementById('splash-title');
  const splashSub = document.getElementById('splash-sub');
  const splashPulse = document.getElementById('splash-pulse');
  const splashMeta = document.getElementById('splash-meta');
  const splashRail = document.querySelector('.splash-rail');
  const splashSide = document.querySelector('.splash-side');
  const splashLoader = document.querySelector('.splash-loader');
  let entered = false;

  splashEyebrow.innerHTML = '<span class="splash-live-dot"></span>identity loaded';

  // Fade in the command-center intro from frame to identity to action.
  anime.timeline({ easing: 'easeOutCubic' })
    .add({
      targets: splashCard,
      opacity: [0, 1],
      translateY: [18, 0],
      scale: [0.98, 1],
      duration: 720,
      delay: 180
    })
    .add({
      targets: splashRail,
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 420
    }, 260)
    .add({
      targets: splashEyebrow,
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 420
    }, 500)
    .add({
      targets: splashTitle,
      opacity: [0, 1],
      translateY: [18, 0],
      scale: [0.98, 1],
      duration: 760
    }, 620)
    .add({
      targets: splashSub,
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 520
    }, 1040)
    .add({
      targets: splashSide,
      opacity: [0, 1],
      translateX: [16, 0],
      duration: 560
    }, 960)
    .add({
      targets: splashLoader,
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 460
    }, 1180)
    .add({
      targets: splashMeta,
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 520
    }, 1260);

  anime({
    targets: '.splash-corner',
    opacity: [0.35, 1],
    duration: 1300,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
    delay: (el, i) => i * 90
  });

  anime({
    targets: '#splash-meta span',
    translateY: [0, -4, 0],
    duration: 2600,
    delay: (el, i) => 1450 + i * 160,
    loop: true,
    easing: 'easeInOutSine'
  });

  anime({
    targets: splashCard,
    boxShadow: [
      '0 30px 100px rgba(0,0,0,0.62), inset 0 0 70px rgba(88,101,242,0.04)',
      '0 30px 100px rgba(0,0,0,0.62), inset 0 0 86px rgba(113,242,162,0.075)',
      '0 30px 100px rgba(0,0,0,0.62), inset 0 0 70px rgba(88,101,242,0.04)'
    ],
    duration: 3200,
    loop: true,
    easing: 'easeInOutSine'
  });

  // Pulse loop on the dot
  anime({
    targets: splashPulse,
    scale: [1, 1.8],
    opacity: [1, 0],
    duration: 1200,
    delay: 1800,
    loop: true,
    easing: 'easeOutSine'
  });

  function enter() {
    if (entered) return;
    entered = true;

    // Fade out text elements sequentially
    anime.timeline({ easing: 'easeInCubic' })
      .add({
        targets: [splashSub, splashPulse, splashMeta, splashEyebrow],
        opacity: [1, 0],
        translateY: [0, -8],
        duration: 300
      })
      .add({
        targets: splashTitle,
        opacity: [1, 0],
        translateY: [0, -14],
        duration: 400
      }, 100)
      .add({
        targets: splashCard,
        opacity: [1, 0],
        translateY: [0, -18],
        scale: [1, 0.98],
        duration: 460
      }, 180)
      .add({
        targets: splash,
        opacity: [1, 0],
        duration: 600,
        easing: 'easeInOutCubic',
        complete: () => {
          splash.style.display = 'none';
          document.body.style.overflow = '';
        }
      }, 280);
  }

  // Lock scroll during splash
  document.body.style.overflow = 'hidden';
  splash.addEventListener('click', enter);
  document.addEventListener('keydown', e => {
    if (!entered) enter();
  });
})();

// ── Clock ──
function updateClock() {
  const now = new Date();
  const gmt7 = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  let h = gmt7.getHours();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  const m = String(gmt7.getMinutes()).padStart(2, '0');
  const s = String(gmt7.getSeconds()).padStart(2, '0');
  document.getElementById('clock').textContent =
    `${String(h).padStart(2, '0')}:${m}:${s} ${ampm} GMT+7`;
}
updateClock();
setInterval(updateClock, 1000);

// ── Typing effect ──
const phrases = [
  'an experienced Luau developer building security tools',
  'a passionate reverse engineer and researcher',
  'building the next generation of anti-cheat systems',
  'exploring low-level systems programming'
];
let phraseIdx = 0;
let charIdx = 0;
let deleting = false;
const typedEl = document.getElementById('typed-text');

function typeStep() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      setTimeout(() => { deleting = true; typeStep(); }, 2200);
      return;
    }
    setTimeout(typeStep, 45);
  } else {
    typedEl.textContent = current.substring(0, charIdx);
    charIdx--;
    if (charIdx < 0) {
      deleting = false;
      charIdx = 0;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(typeStep, 400);
      return;
    }
    setTimeout(typeStep, 25);
  }
}
typeStep();

// ── Role badge letter animation ──
const roles = [
  'a security enthusiast',
  'a reverse engineer',
  'a Luau developer',
  'a tool builder',
  'a researcher'
];
let roleIdx = 0;
const badgeEl = document.getElementById('role-badge');

function animateBadge() {
  badgeEl.textContent = roles[roleIdx];
  badgeEl.innerHTML = badgeEl.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  anime.timeline({ loop: false })
    .add({
      targets: '#role-badge .letter',
      translateY: [100, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1400,
      delay: (el, i) => 300 + 30 * i
    })
    .add({
      targets: '#role-badge .letter',
      translateY: [0, -100],
      opacity: [1, 0],
      easing: 'easeInExpo',
      duration: 1200,
      delay: (el, i) => 100 + 30 * i,
      complete: function() {
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(animateBadge, 400);
      }
    });
}
animateBadge();

// ── Player animate minimize/expand (anime.js) ──
const playerEl = document.getElementById('music-player');
const playerBody = playerEl.querySelector('.player-body');
const miniBar = playerEl.querySelector('.player-mini-bar');
const btnMinimize = document.getElementById('btn-minimize');
const btnExpand = document.getElementById('btn-expand');

const EXPANDED_W = 320;
const MINI_W = 220;
let isMinimized = true;
let animating = false;
const playerDetails = Array.from(playerBody.querySelectorAll('.player-content, .progress-row, .player-controls'));

function getPlayerWidths() {
  const maxWidth = Math.max(180, window.innerWidth - 20);
  return {
    mini: Math.min(MINI_W, maxWidth),
    expanded: Math.min(EXPANDED_W, maxWidth)
  };
}

function getBodyHeight() {
  const previousHeight = playerBody.style.height;
  const previousOpacity = playerBody.style.opacity;
  playerBody.style.height = 'auto';
  playerBody.style.opacity = '1';
  const height = playerBody.scrollHeight;
  playerBody.style.height = previousHeight;
  playerBody.style.opacity = previousOpacity;
  return height;
}

function stopPlayerMotion() {
  anime.remove([playerEl, playerBody, miniBar, btnExpand, btnMinimize, ...playerDetails]);
}

playerBody.style.overflow = 'hidden';

// Set initial minimized state instantly (anime.set not available in v2)
playerEl.style.width = getPlayerWidths().mini + 'px';
playerBody.style.height = '0px';
playerBody.style.opacity = '0';
playerBody.style.transform = 'translateY(10px)';
playerDetails.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(8px)';
});
miniBar.style.opacity = '1';
miniBar.style.transform = 'translateY(0px)';
miniBar.style.pointerEvents = 'auto';
btnExpand.style.display = 'flex';
btnMinimize.style.display = 'none';

function expandPlayer() {
  if (animating || !isMinimized) return;
  animating = true;
  isMinimized = false;
  stopPlayerMotion();

  const widths = getPlayerWidths();
  const bodyHeight = getBodyHeight();
  playerBody.style.height = '0px';
  playerBody.style.opacity = '0';
  playerBody.style.transform = 'translateY(12px)';
  playerDetails.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
  });
  btnExpand.style.display = 'none';
  btnMinimize.style.display = 'flex';
  miniBar.style.pointerEvents = 'none';
  btnMinimize.style.opacity = '0';
  btnMinimize.style.transform = 'scale(0.82) rotate(-20deg)';

  anime.timeline({
    easing: 'easeOutCubic',
    complete: () => {
      playerBody.style.height = 'auto';
      miniBar.style.pointerEvents = 'none';
      animating = false;
    }
  })
    .add({
      targets: miniBar,
      opacity: [1, 0],
      translateY: [0, -10],
      scale: [1, 0.96],
      duration: 210,
      easing: 'easeInCubic'
    })
    .add({
      targets: playerEl,
      width: [widths.mini, widths.expanded],
      translateY: [0, -3, 0],
      scale: [1, 1.012, 1],
      duration: 560,
      easing: 'easeInOutCubic'
    }, 60)
    .add({
      targets: playerBody,
      height: [0, bodyHeight],
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 520,
      easing: 'easeOutQuart'
    }, 180)
    .add({
      targets: playerDetails,
      opacity: [0, 1],
      translateY: [10, 0],
      delay: (el, i) => i * 55,
      duration: 360,
      easing: 'easeOutCubic'
    }, 285)
    .add({
      targets: btnMinimize,
      opacity: [0, 1],
      scale: [0.82, 1],
      rotate: [-20, 0],
      duration: 300,
      easing: 'easeOutBack'
    }, 300);
}

function minimizePlayer() {
  if (animating || isMinimized) return;
  animating = true;
  isMinimized = true;
  stopPlayerMotion();

  const widths = getPlayerWidths();
  btnMinimize.style.display = 'none';
  btnExpand.style.display = 'flex';
  btnExpand.style.opacity = '0';
  btnExpand.style.transform = 'scale(0.82) rotate(18deg)';

  const lockedH = playerBody.offsetHeight;
  playerBody.style.height = lockedH + 'px';
  miniBar.style.pointerEvents = 'none';
  miniBar.style.opacity = '0';
  miniBar.style.transform = 'translateY(12px) scale(0.96)';

  anime.timeline({
    complete: () => {
      playerBody.style.height = '0px';
      playerBody.style.opacity = '0';
      playerBody.style.transform = 'translateY(10px)';
      playerDetails.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(8px)';
      });
      miniBar.style.pointerEvents = 'auto';
      animating = false;
    }
  })
    .add({
      targets: playerDetails.slice().reverse(),
      opacity: [1, 0],
      translateY: [0, 8],
      delay: (el, i) => i * 35,
      duration: 190,
      easing: 'easeInCubic'
    })
    .add({
      targets: playerBody,
      height: [lockedH, 0],
      opacity: [1, 0],
      translateY: [0, 10],
      duration: 460,
      easing: 'easeInOutCubic'
    }, 90)
    .add({
      targets: playerEl,
      width: [widths.expanded, widths.mini],
      translateY: [0, 4, 0],
      scale: [1, 0.99, 1],
      duration: 520,
      easing: 'easeInOutCubic'
    }, 165)
    .add({
      targets: miniBar,
      opacity: [0, 1],
      translateY: [12, 0],
      scale: [0.96, 1],
      duration: 360,
      easing: 'easeOutCubic'
    }, 460)
    .add({
      targets: btnExpand,
      opacity: [0, 1],
      scale: [0.82, 1],
      rotate: [18, 0],
      duration: 290,
      easing: 'easeOutBack'
    }, 475);
}

btnExpand.addEventListener('click', expandPlayer);
btnMinimize.addEventListener('click', minimizePlayer);
window.addEventListener('resize', () => {
  if (animating) return;
  const widths = getPlayerWidths();
  playerEl.style.width = (isMinimized ? widths.mini : widths.expanded) + 'px';
});

// ── Custom context menu ──
(function() {
  const menu = document.getElementById('ctx-menu');
  let menuVisible = false;
  let currentAnim = null;

  function clampPos(x, y) {
    const mw = 170, mh = 90;
    return {
      left: (x + mw > window.innerWidth)  ? x - mw : x,
      top:  (y + mh > window.innerHeight) ? y - mh : y
    };
  }

  function showMenu(x, y) {
    const { left, top } = clampPos(x, y);

    if (currentAnim) currentAnim.pause();

    if (menuVisible) {
      // Already open — smoothly slide to new position + quick pulse scale
      currentAnim = anime({
        targets: menu,
        left: left,
        top: top,
        scale: [1, 1.04, 1],
        duration: 320,
        easing: 'easeOutCubic'
      });
    } else {
      // First open — position instantly, then animate in
      menu.style.left = left + 'px';
      menu.style.top  = top  + 'px';
      menu.classList.add('visible');
      menuVisible = true;
      currentAnim = anime({
        targets: menu,
        opacity: [0, 1],
        scale: [0.94, 1],
        translateY: [-6, 0],
        duration: 220,
        easing: 'easeOutCubic'
      });
    }
  }

  function hideMenu(cb) {
    if (!menuVisible) { if (cb) cb(); return; }
    if (currentAnim) currentAnim.pause();
    menuVisible = false;
    currentAnim = anime({
      targets: menu,
      opacity: [1, 0],
      scale: [1, 0.94],
      translateY: [0, -4],
      duration: 150,
      easing: 'easeInCubic',
      complete: () => {
        menu.classList.remove('visible');
        if (cb) cb();
      }
    });
  }

  document.addEventListener('contextmenu', e => {
    e.preventDefault();
    showMenu(e.clientX, e.clientY);
  });

  document.addEventListener('click', e => {
    if (!menu.contains(e.target)) hideMenu();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') hideMenu();
  });

  document.getElementById('ctx-copy').addEventListener('click', () => {
    const sel = window.getSelection && window.getSelection().toString();
    if (sel) {
      navigator.clipboard.writeText(sel).catch(() => {});
    }
    hideMenu();
  });

  document.getElementById('ctx-paste').addEventListener('click', () => {
    hideMenu(() => {
      navigator.clipboard.readText().then(text => {
        const active = document.activeElement;
        if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
          const s = active.selectionStart, e2 = active.selectionEnd;
          active.value = active.value.slice(0, s) + text + active.value.slice(e2);
          active.selectionStart = active.selectionEnd = s + text.length;
        }
      }).catch(() => {});
    });
  });
})();

// ── About section scroll reveal ──
(function() {
  const aboutEl = document.getElementById('about');

  // Initial hidden state
  const revealEls = aboutEl.querySelectorAll('.about-shell, .about-terminal, .about-stat, .about-panel');
  revealEls.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      anime({
        targets: Array.from(revealEls),
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 650,
        delay: (el, i) => i * 80,
        easing: 'easeOutCubic'
      });
    });
  }, { threshold: 0.1 });

  observer.observe(aboutEl);

  // Activity timer — counts up seconds since page load
})();

// ── Projects section animation ──
(function() {
  const projects = document.getElementById('projects');
  if (!projects) return;

  const cards = Array.from(projects.querySelectorAll('.project-card'));
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();

    anime({
      targets: cards,
      opacity: [0, 1],
      translateY: [26, 0],
      scale: [0.98, 1],
      duration: 680,
      delay: (el, i) => i * 115,
      easing: 'easeOutCubic',
      begin: () => {
        cards.forEach((card, index) => {
          setTimeout(() => card.classList.add('visible'), index * 115);
        });
      }
    });
  }, { threshold: 0.16 });

  observer.observe(projects);
})();

// ── Experience section animation ──
(function() {
  const experience = document.getElementById('experience');
  if (!experience) return;

  const cards = Array.from(experience.querySelectorAll('.experience-card'));
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();

    anime({
      targets: cards,
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 620,
      delay: (el, i) => i * 120,
      easing: 'easeOutCubic',
      begin: () => {
        cards.forEach((card, index) => {
          setTimeout(() => card.classList.add('visible'), index * 120);
        });
      }
    });
  }, { threshold: 0.16 });

  observer.observe(experience);
})();

// ── About lower panels animation ──
(function() {
  const aboutLower = document.querySelector('.about-lower');
  if (!aboutLower) return;

  const panels = Array.from(aboutLower.querySelectorAll('.about-panel'));
  const focusItems = Array.from(aboutLower.querySelectorAll('.focus-item'));
  const skillTags = Array.from(aboutLower.querySelectorAll('.skill-tag'));
  let started = false;

  function startLowerAnimations() {
    if (started) return;
    started = true;

    panels.forEach((panel, index) => {
      setTimeout(() => panel.classList.add('panel-active'), index * 160);
    });

    focusItems.forEach((item, index) => {
      setTimeout(() => item.classList.add('visible'), 180 + index * 140);
    });

    skillTags.forEach((tag, index) => {
      setTimeout(() => tag.classList.add('visible'), 260 + index * 65);
    });

    let hotIndex = 0;
    setInterval(() => {
      skillTags.forEach(tag => tag.classList.remove('stack-hot'));
      if (skillTags[hotIndex]) skillTags[hotIndex].classList.add('stack-hot');
      hotIndex = (hotIndex + 1) % skillTags.length;
    }, 750);
  }

  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    startLowerAnimations();
  }, { threshold: 0.2 });

  observer.observe(aboutLower);
})();

// ── About terminal animation ──
(function() {
  const terminal = document.getElementById('about-terminal-body');
  if (!terminal) return;

  const lines = Array.from(terminal.querySelectorAll('[data-terminal-line]'));
  const chips = Array.from(terminal.querySelectorAll('.terminal-chip'));
  const textParts = lines.flatMap(line => Array.from(line.querySelectorAll('[data-type-text]')));

  textParts.forEach(part => {
    part.dataset.fullText = part.textContent;
    part.textContent = '';
  });

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function typePart(part) {
    const fullText = part.dataset.fullText || '';
    for (let i = 0; i <= fullText.length; i++) {
      part.textContent = fullText.slice(0, i);
      await wait(18 + Math.random() * 18);
    }
  }

  async function runTerminalIntro() {
    for (const line of lines) {
      line.classList.add('visible', 'active');
      const parts = Array.from(line.querySelectorAll('[data-type-text]'));
      for (const part of parts) {
        await typePart(part);
      }
      await wait(130);
      line.classList.remove('active');
    }

    chips.forEach((chip, index) => {
      setTimeout(() => chip.classList.add('visible'), index * 120);
    });

    let hotIndex = 0;
    setInterval(() => {
      chips.forEach(chip => chip.classList.remove('hot'));
      if (chips[hotIndex]) chips[hotIndex].classList.add('hot');
      hotIndex = (hotIndex + 1) % chips.length;
    }, 900);
  }

  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    runTerminalIntro();
  }, { threshold: 0.35 });

  observer.observe(terminal);
})();

// ── Lanyard Discord presence ──
(function() {
  const USER_ID = '1075701806841217066';
  const dot = document.getElementById('lanyard-status-dot');
  const statusText = document.getElementById('lanyard-status-text');
  const avatar = document.getElementById('lanyard-avatar');
  const username = document.getElementById('lanyard-username');
  const handle = document.getElementById('lanyard-handle');
  const splashDot = document.getElementById('splash-lanyard-dot');
  const splashStatus = document.getElementById('splash-lanyard-status');
  const splashActivity = document.getElementById('splash-lanyard-activity');
  const splashAvatar = document.getElementById('splash-lanyard-avatar');
  const activitySlots = [1, 2].map(i => ({
    root: document.getElementById('lanyard-activity-' + i),
    name: document.getElementById('lanyard-act-name-' + i),
    detailA: document.getElementById('lanyard-act-detail-' + i + 'a'),
    detailB: document.getElementById('lanyard-act-detail-' + i + 'b'),
    timer: document.getElementById('lanyard-act-elapsed-' + i),
    icon: document.getElementById('lanyard-act-icon-' + i),
    interval: null
  }));

  if (!dot || !activitySlots[0].root) return;

  const statusLabels = {
    online: 'online',
    idle: 'idle',
    dnd: 'do not disturb',
    offline: 'offline'
  };

  function fmtElapsed(ms) {
    const s = Math.floor(ms / 1000);
    if (s < 60) return s + 's';
    const m = Math.floor(s / 60), rs = s % 60;
    if (m < 60) return m + 'm ' + rs + 's';
    return Math.floor(m / 60) + 'h ' + (m % 60) + 'm';
  }

  function stopTimer(slot) {
    clearInterval(slot.interval);
    slot.interval = null;
  }

  function startTimer(slot, startMs) {
    stopTimer(slot);
    if (!slot.timer) return;
    slot.timer.textContent = fmtElapsed(Date.now() - startMs);
    slot.interval = setInterval(() => {
      slot.timer.textContent = fmtElapsed(Date.now() - startMs);
    }, 1000);
  }

  function setIcon(slot, url) {
    if (!slot.icon) return;
    if (url) {
      slot.icon.innerHTML = '<img src="' + url + '" alt="" />';
    } else {
      slot.icon.innerHTML = '<svg viewBox="0 0 100 100"><path d="M8.7 90L0 81.3l33-33L0 15.5 8.7 6.8 50.4 48.6zm41.6 0V81h41.7v9H50.3z"/></svg>';
    }
  }

  function applyPresence(data) {
    // Status dot + label
    const s = data.discord_status || 'offline';
    dot.className = 'dc-avatar-status ' + s;

    // Pick the most relevant activity
    const activities = (data.activities || []).filter(a => a.type !== 4); // exclude custom status
    const act = activities[0];

    clearInterval(timerInterval);

    if (act) {
      appEl.textContent = act.name || 'unknown';
      det1.textContent  = act.details || '';
      det2.textContent  = act.state   || '';

      // Timer
      if (act.timestamps && act.timestamps.start) {
        startTimer(act.timestamps.start);
      } else {
        if (timer) timer.textContent = '';
      }

      // Icon — try large_image first
      let iconUrl = null;
      if (act.assets && act.assets.large_image) {
        const img = act.assets.large_image;
        if (img.startsWith('mp:external/')) {
          iconUrl = 'https://media.discordapp.net/external/' + img.slice('mp:external/'.length);
        } else if (img.startsWith('https://')) {
          iconUrl = img;
        } else {
          iconUrl = 'https://cdn.discordapp.com/app-assets/' + act.application_id + '/' + img + '.png';
        }
      }
      setIcon(iconUrl);
    } else {
      appEl.textContent = s === 'offline' ? 'offline' : 'no activity';
      det1.textContent  = '';
      det2.textContent  = '';
      if (timer) timer.textContent = '';
      setIcon(null);
    }
  }

  function clearSlot(slot, hide) {
    stopTimer(slot);
    if (slot.name) slot.name.textContent = '';
    if (slot.detailA) slot.detailA.textContent = '';
    if (slot.detailB) slot.detailB.textContent = '';
    if (slot.timer) slot.timer.textContent = '';
    setIcon(slot, null);
    if (slot.root) slot.root.style.display = hide ? 'none' : '';
  }

  function renderActivity(slot, act) {
    if (!slot.root || !act) return;

    slot.root.style.display = '';
    slot.name.textContent = act.name || 'unknown';
    slot.detailA.textContent = act.details || '';
    slot.detailB.textContent = act.state || '';

    if (act.timestamps && act.timestamps.start) {
      startTimer(slot, act.timestamps.start);
    } else if (slot.timer) {
      stopTimer(slot);
      slot.timer.textContent = '';
    }

    let iconUrl = null;
    if (act.assets && act.assets.large_image) {
      const img = act.assets.large_image;
      if (img.startsWith('mp:external/')) {
        iconUrl = 'https://media.discordapp.net/external/' + img.slice('mp:external/'.length);
      } else if (img.startsWith('https://')) {
        iconUrl = img;
      } else {
        iconUrl = 'https://cdn.discordapp.com/app-assets/' + act.application_id + '/' + img + '.png';
      }
    }
    setIcon(slot, iconUrl);
  }

  function renderUser(discordUser) {
    if (!discordUser) return;

    const displayName = discordUser.global_name || discordUser.display_name || discordUser.username || 'jovan';
    const tag = discordUser.discriminator && discordUser.discriminator !== '0'
      ? discordUser.username + '#' + discordUser.discriminator
      : '@' + (discordUser.username || 'jovlab.xyz');

    if (username) username.textContent = displayName;
    if (handle) handle.textContent = tag;

    if (avatar && discordUser.avatar) {
      const ext = discordUser.avatar.startsWith('a_') ? 'gif' : 'png';
      const avatarUrl = 'https://cdn.discordapp.com/avatars/' + discordUser.id + '/' + discordUser.avatar + '.' + ext + '?size=128';
      avatar.src = avatarUrl;
      if (splashAvatar) splashAvatar.src = avatarUrl;
    }
  }

  function renderSplashPresence(status, activities) {
    if (splashDot) splashDot.className = 'presence-dot ' + status;
    if (splashStatus) splashStatus.textContent = statusLabels[status] || status;

    if (!splashActivity) return;
    const act = activities[0];
    if (act) {
      splashActivity.textContent = act.details || act.state || act.name || 'Active on Discord';
    } else {
      splashActivity.textContent = status === 'offline' ? 'The user is offline right now.' : 'No active game or app.';
    }
  }

  function applyPresence(data) {
    const s = data.discord_status || 'offline';
    dot.className = 'presence-dot ' + s;
    if (statusText) statusText.textContent = statusLabels[s] || s;
    renderUser(data.discord_user);

    const activities = (data.activities || []).filter(a => a.type !== 4).slice(0, activitySlots.length);
    renderSplashPresence(s, activities);

    if (activities.length) {
      activitySlots.forEach(slot => slot.root && slot.root.classList.remove('presence-empty'));
      activities.forEach((act, index) => renderActivity(activitySlots[index], act));
      for (let i = activities.length; i < activitySlots.length; i++) {
        clearSlot(activitySlots[i], true);
      }
    } else {
      clearSlot(activitySlots[0], false);
      if (activitySlots[0].root) activitySlots[0].root.classList.add('presence-empty');
      if (activitySlots[0].name) {
        activitySlots[0].name.textContent = s === 'offline' ? 'The user is offline right now.' : 'No active game or app.';
      }
      if (activitySlots[0].detailA) activitySlots[0].detailA.textContent = '';
      clearSlot(activitySlots[1], true);
    }
  }

  function connect() {
    const ws = new WebSocket('wss://api.lanyard.rest/socket');
    let heartbeatInterval = null;

    ws.addEventListener('open', () => {});

    ws.addEventListener('message', e => {
      let msg;
      try {
        msg = JSON.parse(e.data);
      } catch {
        return;
      }

      if (msg.op === 1) {
        // Hello — start heartbeat and subscribe
        heartbeatInterval = setInterval(() => {
          ws.readyState === WebSocket.OPEN && ws.send(JSON.stringify({ op: 3 }));
        }, msg.d.heartbeat_interval);

        ws.send(JSON.stringify({
          op: 2,
          d: { subscribe_to_id: USER_ID }
        }));
      }

      if (msg.op === 0) {
        if (msg.t === 'INIT_STATE' || msg.t === 'PRESENCE_UPDATE') {
          applyPresence(msg.d);
        }
      }
    });

    ws.addEventListener('close', () => {
      clearInterval(heartbeatInterval);
      if (statusText) statusText.textContent = 'reconnecting';
      setTimeout(connect, 3000);
    });

    ws.addEventListener('error', () => ws.close());
  }

  connect();
})();

// CoinSight project chooser
(function() {
  const trigger = document.getElementById('coinsight-open');
  const modal = document.getElementById('coinsight-modal');
  if (!trigger || !modal) return;

  const closeControls = modal.querySelectorAll('[data-coinsight-close]');

  function openModal() {
    modal.classList.add('visible');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('visible');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  trigger.addEventListener('click', e => {
    e.preventDefault();
    openModal();
  });

  closeControls.forEach(control => {
    control.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('visible')) closeModal();
  });
})();

// ── Animated wavy lines background (Canvas) ──
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const lineCount = 30;
const lines = [];
for (let i = 0; i < lineCount; i++) {
  lines.push({
    y: (H / lineCount) * i + Math.random() * 40 - 20,
    amplitude: 15 + Math.random() * 25,
    frequency: 0.002 + Math.random() * 0.003,
    speed: 0.3 + Math.random() * 0.6,
    phase: Math.random() * Math.PI * 2,
    opacity: 0.03 + Math.random() * 0.06,
    thickness: 1 + Math.random() * 1.5
  });
}

let time = 0;
function drawLines() {
  ctx.clearRect(0, 0, W, H);
  for (const l of lines) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 255, 255, ${l.opacity})`;
    ctx.lineWidth = l.thickness;
    for (let x = 0; x <= W; x += 4) {
      const y = l.y + Math.sin(x * l.frequency + time * l.speed + l.phase) * l.amplitude
                     + Math.sin(x * l.frequency * 0.5 + time * l.speed * 0.7) * l.amplitude * 0.5;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  time += 0.016;
  requestAnimationFrame(drawLines);
}
drawLines();
