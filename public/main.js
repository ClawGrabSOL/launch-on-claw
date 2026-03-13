// ── HERO TERMINAL TYPEWRITER ──────────────────────────────────────
const heroLines = [
  { text: 'C:\\Users\\You> ', type: 'prompt', delay: 400 },
  { text: 'launchonclaw install', type: 'cmd', delay: 400 },
  { text: '', type: 'blank', delay: 300 },
  { text: 'Connecting to pump.fun...', type: 'out', delay: 300 },
  { text: '✓ Ready. 0% fees. Full control.', type: 'ok', delay: 500 },
  { text: '', type: 'blank', delay: 200 },
  { text: 'C:\\Users\\You\\LaunchOnClaw> ', type: 'prompt', delay: 300 },
  { text: 'launch --ticker FREE --name FreeToken --vanity FREE', type: 'cmd', delay: 300 },
  { text: '', type: 'blank', delay: 200 },
  { text: '✓ Vanity CA: FREEkF9x...rQ3t', type: 'ok', delay: 400 },
  { text: '✓ Untraced wallet spun up', type: 'ok', delay: 300 },
  { text: '✓ 0-block snipe armed', type: 'ok', delay: 300 },
  { text: '✓ Deployed: pump.fun/coin/FREEkF9x', type: 'ok', delay: 400 },
  { text: '', type: 'blank', delay: 100 },
  { text: 'Fees charged: $0.00', type: 'green', delay: 200 },
  { text: '', type: 'blank', delay: 100 },
  { text: 'C:\\Users\\You\\LaunchOnClaw> ', type: 'prompt', delay: 100 },
  { text: '', type: 'cursor', delay: 0 },
];

const heroTerminal = document.getElementById('heroTerminal');
let lineIndex = 0;
let charIndex = 0;
let currentDiv = null;

function typeNext() {
  if (lineIndex >= heroLines.length) return;
  const line = heroLines[lineIndex];

  if (!currentDiv) {
    currentDiv = document.createElement('div');
    currentDiv.className = 'tl';

    if (line.type === 'prompt') {
      const span = document.createElement('span');
      span.className = 'tp';
      span.textContent = line.text;
      currentDiv.appendChild(span);
      heroTerminal.appendChild(currentDiv);
      lineIndex++;
      currentDiv = null;
      setTimeout(typeNext, line.delay);
      return;
    }
    if (line.type === 'blank') {
      currentDiv.innerHTML = '&nbsp;';
      heroTerminal.appendChild(currentDiv);
      lineIndex++;
      currentDiv = null;
      setTimeout(typeNext, line.delay);
      return;
    }
    if (line.type === 'cursor') {
      currentDiv.innerHTML = '<span class="cursor-blink"></span>';
      heroTerminal.appendChild(currentDiv);
      return;
    }

    const colorClass = { cmd: 'tc', out: 'to', ok: 'ok', green: 'green-t' }[line.type] || '';
    const span = document.createElement('span');
    span.className = colorClass;
    currentDiv._span = span;
    currentDiv.appendChild(span);
    heroTerminal.appendChild(currentDiv);
  }

  if (charIndex < line.text.length) {
    currentDiv._span.textContent += line.text[charIndex];
    charIndex++;
    heroTerminal.scrollTop = heroTerminal.scrollHeight;
    setTimeout(typeNext, 18 + Math.random() * 10);
  } else {
    charIndex = 0;
    lineIndex++;
    currentDiv = null;
    setTimeout(typeNext, heroLines[lineIndex - 1].delay);
  }
}

setTimeout(typeNext, 600);

// ── COPY TERMINAL COMMANDS ────────────────────────────────────────
document.querySelectorAll('.copy-line').forEach(el => {
  el.title = 'Click to copy';
  el.addEventListener('click', () => {
    navigator.clipboard.writeText(el.dataset.copy).then(() => {
      const orig = el.textContent;
      el.textContent = '✓ Copied!';
      el.style.color = 'var(--green)';
      setTimeout(() => {
        el.textContent = orig;
        el.style.color = '';
      }, 1500);
    });
  });
});

// ── SMOOTH SCROLL ─────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const el = document.querySelector(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
  });
});
