const LIGHT_THEME = 'solarized-light';
const DARK_THEME = 'solarized-dark';
const THEME_KEY = 'theme';

const toggle = document.getElementById('theme-toggle');
const system = matchMedia('(prefers-color-scheme: dark)');
const apply = (dark) => {
  document.documentElement.dataset.theme = dark ? DARK_THEME : LIGHT_THEME;
  toggle.checked = dark;
};
const followSystem = (e) => apply(e.matches);
let stored = null;
try {
  stored = localStorage.getItem(THEME_KEY);
} catch {
  /* storage blocked */
}
apply(stored ? stored === DARK_THEME : system.matches);
if (!stored) system.addEventListener('change', followSystem);
let themingTimer;
toggle.addEventListener('change', () => {
  system.removeEventListener('change', followSystem);
  document.documentElement.classList.add('theming');
  clearTimeout(themingTimer);
  themingTimer = setTimeout(() => document.documentElement.classList.remove('theming'), 150);
  apply(toggle.checked);
  try {
    localStorage.setItem(THEME_KEY, toggle.checked ? DARK_THEME : LIGHT_THEME);
  } catch {
    /* storage blocked */
  }
});

const pops = document.querySelectorAll('details[name="pop"]');
const clamp = (pop) => {
  const panel = pop.querySelector('.pop-panel');
  panel.style.left = '0px';
  const overflow = panel.getBoundingClientRect().right - pop.closest('ul').getBoundingClientRect().right;
  if (overflow > 0) panel.style.left = `${-overflow}px`;
};
const clampOpen = () => pops.forEach((pop) => pop.open && clamp(pop));
pops.forEach((pop) => pop.addEventListener('toggle', () => pop.open && clamp(pop)));
addEventListener('resize', clampOpen);
addEventListener('pointerdown', (e) => {
  pops.forEach((pop) => {
    if (pop.open && !pop.contains(e.target)) pop.open = false;
  });
});

const KEYWORDS = [
  ['Synergy & ownership! 💪', 'winner'],
  ['Thought leadership! 🧠', 'winner'],
  ['Disruptive growth mindset! 🚀', 'winner'],
  ['Rockstar ninja! 🎸🥷', 'winner'],
  ["I'm humbled to announce! 🙏", 'steve'],
  ["What's the projected ROI?", 'steve'],
  ['Do more with less!', 'steve'],
  ['Leveraging core competencies to drive scalable impact in cross functional environments! 🤡', 'steve'],
  ["You've appeared in 12 searches this week!", 'anne'],
  ['Do you have 100 years of Rust?', 'anne'],
  ["We've got great benefits! 🍕", 'anne'],
  ['Competitive compensation between 300k & 10k!', 'anne'],
  ['We went with an internal candidate after round 8th!', 'anne'],
];

let bag = [];
let last;
const nextKeyword = () => {
  if (!bag.length) {
    bag = [...KEYWORDS];
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
    const end = bag.length - 1;
    if (bag[end] === last) [bag[0], bag[end]] = [bag[end], bag[0]];
  }
  last = bag.pop();
  return last;
};

const CERT_REAL = [
  'Certified Blablala Practitioner',
  'Expert MS Paint Administrator',
  'Master Solutions Architect, Associate',
  'Keep going?',
];
const CERT_RANKS = ['Certified', 'Accredited', 'Advanced', 'Global', 'Platinum', 'Executive', 'Level 4', 'Chief'];
const CERT_TOPICS = [
  'Agile',
  'DevOps',
  'Serverless',
  'Microservices',
  'Blockchain',
  'Web3',
  'GenAI',
  'Prompt',
  'Zero Trust',
  'Data Mesh',
  'Quantum',
  'Digital Transformation',
  'Lean Six Sigma',
  'Synergy',
  'Platform Engineering',
  'Regional',
];
const CERT_ROLES = [
  'Practitioner',
  'Evangelist',
  'Ninja',
  'Champion',
  'Architect',
  'Coach',
  'Guru',
  'Whisperer',
  'Director',
];
const CERT_OVERFLOW = 'Maximum Call Stack Certification!';
const CERT_DEEP = [
  'Keep going?',
  'Certified Certifier',
  'Certification Auditor',
  'Auditor of Certification Auditors',
  'Certified Trainer of Certified Trainers',
  'Certification Renewal Certification',
  'Certified Certification Renewal Certifier',
  'Keep going?',
  CERT_OVERFLOW,
];

const pick = (array) => array[Math.floor(Math.random() * array.length)];
let lastCert;
const nextCert = (depth) => {
  if (depth <= CERT_REAL.length) return CERT_REAL[depth - 1];
  if (depth > 10) return CERT_DEEP[(depth - 11) % CERT_DEEP.length];
  let cert;
  do {
    cert = `${pick(CERT_RANKS)} ${pick(CERT_TOPICS)} ${pick(CERT_ROLES)}`;
  } while (cert === lastCert);
  lastCert = cert;
  return cert;
};

const grow = (cert, depth) =>
  cert.addEventListener('toggle', () => {
    if (!cert.open) {
      cert.querySelectorAll('details').forEach((child) => (child.open = false));
      return;
    }
    if (cert.querySelector('span').textContent === CERT_OVERFLOW) {
      unwind();
      return;
    }
    if (cert.querySelector('details')) return;
    const nested = document.createElement('div');
    nested.className = 'border-base-300 mt-1.5 ms-2 w-max border-s ps-2';
    nested.innerHTML = '<details><summary class="badge badge-ghost badge-sm"><span></span></summary></details>';
    nested.querySelector('span').textContent = nextCert(depth + 1);
    cert.append(nested);
    grow(nested.querySelector('details'), depth + 1);
  });
const certRoot = document.getElementById('cert');
const unwind = () => {
  certRoot.open = false;
  certRoot.querySelectorAll(':scope > div').forEach((node) => node.remove());
};
grow(certRoot, 0);

const toaster = document.getElementById('toaster');
let timer;
document.getElementById('linkedin-bait').addEventListener('click', () => {
  clearTimeout(timer);
  const [message, avatar] = nextKeyword();
  const toast = document.createElement('div');
  toast.className = 'chat chat-start w-full';
  toast.innerHTML = `<div class="chat-image avatar"><div class="w-10 rounded-full"><img alt="" decoding="async" height="192" width="192" src="${avatar}.png"></div></div><div class="chat-bubble min-h-0 max-w-full rounded-2xl rounded-es-none shadow-lg"></div>`;
  toast.querySelector('.chat-bubble').textContent = message;
  toaster.replaceChildren(toast);
  timer = setTimeout(() => {
    toast.classList.add('leaving');
    setTimeout(() => toast.remove(), 200);
  }, 4000);
});
