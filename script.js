/**
 * ABHAY RANA - VISUAL DEVOPS COMMAND DECK INTERACTION ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  initDeckTabs();
  initPipeline();
  initTerminal();
  initIAM();
  initMiniGame();
  initSkillsFilter();
  initClipboardAndToasts();
});

/* 1. Subtle Background Grid Particle Mesh */
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = Array.from({ length: 35 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    radius: Math.random() * 1.5 + 0.5,
    color: Math.random() > 0.5 ? '#00f0ff' : '#8b5cf6'
  }));

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#00f0ff';
          ctx.globalAlpha = (1 - dist / 110) * 0.1;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.25;
      ctx.fill();
    });

    requestAnimationFrame(render);
  }
  render();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

/* 2. Visual Project Deck Tabs */
function initDeckTabs() {
  const tabs = document.querySelectorAll('.deck-tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

/* 3. Serverless CI/CD Pipeline Simulator */
function initPipeline() {
  const btnTrigger = document.getElementById('btn-trigger-pipeline');
  const btnReset = document.getElementById('btn-reset-pipeline');
  const timer = document.getElementById('pipeline-timer');
  const logs = document.getElementById('pipeline-logs');
  const steps = [1, 2, 3, 4, 5, 6].map((n) => document.getElementById(`pipe-step-${n}`));

  let running = false;
  let timerId = null;

  const sequence = [
    { text: '[1/6] [GITHUB] Webhook event received from branch: main (commit 9d4f21a)', dur: 800 },
    { text: '[2/6] [JENKINS] Running automated tests: 42/42 tests passed in 0.8s.', dur: 900 },
    { text: '[3/6] [DOCKER] Multi-stage build completed. Trivy scan: 0 critical CVEs.', dur: 1000 },
    { text: '[4/6] [AWS ECR] Image pushed to 123456789.dkr.ecr.us-east-1.amazonaws.com/app:latest', dur: 800 },
    { text: '[5/6] [ECS FARGATE] Zero-downtime rolling update deployed to cluster.', dur: 1100 },
    { text: '[6/6] [CLOUDWATCH] Healthcheck: 200 OK. CPU < 12%. Pipeline PASSED (100% LIVE)!', dur: 700 }
  ];

  function reset() {
    clearInterval(timerId);
    running = false;
    steps.forEach((s) => s && s.classList.remove('active', 'done'));
    timer.textContent = 'Ready';
    logs.innerHTML = '<div class="log-entry text-muted">[READY] Click "Run Live Pipeline" to simulate end-to-end cloud deployment.</div>';
  }

  async function run() {
    if (running) return;
    running = true;
    reset();

    let start = performance.now();
    timerId = setInterval(() => {
      timer.textContent = `Running: ${((performance.now() - start) / 1000).toFixed(1)}s`;
    }, 100);

    for (let i = 0; i < sequence.length; i++) {
      const stepEl = steps[i];
      if (stepEl) stepEl.classList.add('active');

      const log = document.createElement('div');
      log.className = 'log-entry text-cyan';
      log.textContent = sequence[i].text;
      logs.appendChild(log);
      logs.scrollTop = logs.scrollHeight;

      await new Promise((r) => setTimeout(r, sequence[i].dur));

      if (stepEl) {
        stepEl.classList.remove('active');
        stepEl.classList.add('done');
      }
    }

    clearInterval(timerId);
    timer.textContent = 'Status: SUCCESS (6/6)';
    running = false;
    showToast('CI/CD Pipeline simulation completed!');
  }

  if (btnTrigger) btnTrigger.addEventListener('click', run);
  if (btnReset) btnReset.addEventListener('click', reset);
}

/* 4. Linux Hardening Interactive Terminal */
function initTerminal() {
  const screen = document.getElementById('term-screen');
  const input = document.getElementById('term-input');
  const sendBtn = document.getElementById('term-send-btn');
  const chips = document.querySelectorAll('.cmd-pill');

  if (!screen || !input) return;

  const db = {
    help: `Commands:
  - audit / hardening-audit : Run CIS benchmark audit
  - check-ssh               : Check SSH hardening config
  - ufw / ufw status        : Check firewall rules
  - cat audit.sh            : View automation shell script
  - skills                  : List core technical competencies
  - clear                   : Clear terminal`,

    audit: `[CIS BENCHMARK AUDIT] Score: 98/100 (HARDENED)
[✓] Root SSH Disabled (PermitRootLogin no)
[✓] Strict permissions on /etc/shadow (0600)
[✓] Unnecessary daemon services disabled
[✓] UFW active: Ports 80, 443 & hardened SSH only`,

    'hardening-audit': `[CIS BENCHMARK AUDIT] Score: 98/100 (HARDENED)
[✓] Root SSH Disabled (PermitRootLogin no)
[✓] Strict permissions on /etc/shadow (0600)
[✓] Unnecessary daemon services disabled
[✓] UFW active: Ports 80, 443 & hardened SSH only`,

    'check-ssh': `File: /etc/ssh/sshd_config
PermitRootLogin no | PasswordAuthentication no | MaxAuthTries 3
[STATUS] SSH running in hardened key-only mode.`,

    'ufw status': `Status: active
Port 80/tcp (HTTP)     -> ALLOW Anywhere
Port 443/tcp (HTTPS)   -> ALLOW Anywhere
Port 22/tcp (SSH)      -> LIMIT 192.168.1.0/24`,

    'cat audit.sh': `#!/bin/bash
stat -c "%a" /etc/shadow | grep -q "600" && echo "[+] Shadow secure"
grep -q "^PermitRootLogin no" /etc/ssh/sshd_config && echo "[+] Root SSH: Disabled"`,

    skills: `Cloud/DevOps : AWS (ECS, ECR, Fargate, EC2, IAM, S3), Docker, Jenkins, Git
Security     : IAM Least Privilege, Linux Server Hardening, CIS Audits
Code/Systems : Python (Flask), C++, Java, Linux, Nginx, MySQL`
  };

  function exec(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    const rowIn = document.createElement('div');
    rowIn.className = 'term-row';
    rowIn.innerHTML = `<span class="term-prompt">abhay@node:~$</span> <span>${cmdRaw}</span>`;
    screen.appendChild(rowIn);

    if (cmd === 'clear') {
      screen.innerHTML = '';
    } else if (db[cmd]) {
      const out = document.createElement('div');
      out.className = 'term-row text-cyan';
      out.innerHTML = `<pre style="font-family:inherit; white-space:pre-wrap;">${db[cmd]}</pre>`;
      screen.appendChild(out);
    } else {
      const err = document.createElement('div');
      err.className = 'term-row text-red';
      err.textContent = `bash: command not found: ${cmdRaw}. Type 'help'.`;
      screen.appendChild(err);
    }

    input.value = '';
    screen.scrollTop = screen.scrollHeight;
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') exec(input.value);
  });
  if (sendBtn) sendBtn.addEventListener('click', () => exec(input.value));
  chips.forEach((c) => c.addEventListener('click', () => exec(c.getAttribute('data-cmd'))));
}

/* 5. AWS IAM Policy Inspector */
function initIAM() {
  const pills = document.querySelectorAll('.role-pill');
  const codeEl = document.getElementById('iam-json-display');
  const btnCopy = document.getElementById('btn-copy-iam');

  const ec2 = document.getElementById('iam-res-ec2');
  const s3 = document.getElementById('iam-res-s3');
  const ecs = document.getElementById('iam-res-ecs');

  const policies = {
    devops: {
      ec2: 'ALLOWED', s3: 'ALLOWED', ecs: 'ALLOWED',
      json: `{\n  "Version": "2012-10-17",\n  "Statement": [{\n    "Sid": "DevOpsLeastPrivilege",\n    "Effect": "Allow",\n    "Action": ["ec2:*", "ecs:*", "ecr:*", "s3:*"],\n    "Resource": "*"\n  }]\n}`
    },
    auditor: {
      ec2: 'READ-ONLY', s3: 'READ-ONLY', ecs: 'READ-ONLY',
      json: `{\n  "Version": "2012-10-17",\n  "Statement": [{\n    "Sid": "AuditorReadOnly",\n    "Effect": "Allow",\n    "Action": ["ec2:Describe*", "s3:ListBucket", "cloudwatch:Get*"],\n    "Resource": "*"\n  }]\n}`
    },
    guest: {
      ec2: 'DENIED', s3: 'DENIED', ecs: 'DENIED',
      json: `{\n  "Version": "2012-10-17",\n  "Statement": [{\n    "Sid": "DenyAll",\n    "Effect": "Deny",\n    "Action": "*",\n    "Resource": "*"\n  }]\n}`
    }
  };

  pills.forEach((p) => {
    p.addEventListener('click', () => {
      pills.forEach((b) => b.classList.remove('active'));
      p.classList.add('active');

      const role = p.getAttribute('data-role');
      const data = policies[role];
      if (!data) return;

      codeEl.querySelector('code').textContent = data.json;

      const setBadge = (el, val) => {
        if (!el) return;
        el.className = `res-badge ${val === 'DENIED' ? 'denied' : 'allowed'}`;
        el.innerHTML = `<i class="fa-solid ${val === 'DENIED' ? 'fa-xmark' : 'fa-check'}"></i> ${val}`;
      };

      setBadge(ec2, data.ec2);
      setBadge(s3, data.s3);
      setBadge(ecs, data.ecs);
    });
  });

  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      navigator.clipboard.writeText(codeEl.querySelector('code').textContent);
      showToast('IAM Policy JSON copied to clipboard!');
    });
  }
}

/* 6. Playable Tic-Tac-Toe Bot Game */
function initMiniGame() {
  const cells = document.querySelectorAll('.ttt-cell');
  const status = document.getElementById('game-status');
  const btnRestart = document.getElementById('btn-restart-game');

  const pScore = document.getElementById('score-player');
  const tScore = document.getElementById('score-ties');
  const bScore = document.getElementById('score-bot');

  let board = ['', '', '', '', '', '', '', '', ''];
  let active = true;
  let scores = { p: 0, t: 0, b: 0 };

  const wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  function check(b, mark) {
    return wins.some((w) => w.every((i) => b[i] === mark));
  }

  function handleMove(idx) {
    if (board[idx] !== '' || !active) return;
    board[idx] = 'X';
    cells[idx].textContent = 'X';
    cells[idx].classList.add('x');

    if (check(board, 'X')) {
      scores.p++;
      if (pScore) pScore.textContent = scores.p;
      status.innerHTML = '<span class="text-emerald">You won!</span>';
      active = false;
      return;
    }

    if (board.every((c) => c !== '')) {
      scores.t++;
      if (tScore) tScore.textContent = scores.t;
      status.innerHTML = '<span class="text-yellow">Draw!</span>';
      active = false;
      return;
    }

    status.textContent = 'Bot calculating...';
    setTimeout(botMove, 250);
  }

  function botMove() {
    if (!active) return;
    // Simple smart bot
    let move = -1;
    // 1. Win
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        if (check(board, 'O')) { move = i; }
        board[i] = '';
        if (move !== -1) break;
      }
    }
    // 2. Block
    if (move === -1) {
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = 'X';
          if (check(board, 'X')) { move = i; }
          board[i] = '';
          if (move !== -1) break;
        }
      }
    }
    // 3. Center or empty
    if (move === -1 && board[4] === '') move = 4;
    if (move === -1) {
      const avail = board.map((v, i) => v === '' ? i : null).filter((v) => v !== null);
      move = avail[Math.floor(Math.random() * avail.length)];
    }

    board[move] = 'O';
    cells[move].textContent = 'O';
    cells[move].classList.add('o');

    if (check(board, 'O')) {
      scores.b++;
      if (bScore) bScore.textContent = scores.b;
      status.innerHTML = '<span class="text-purple">Bot won!</span>';
      active = false;
      return;
    }

    if (board.every((c) => c !== '')) {
      scores.t++;
      if (tScore) tScore.textContent = scores.t;
      status.innerHTML = '<span class="text-yellow">Draw!</span>';
      active = false;
      return;
    }

    status.textContent = 'Your turn (X).';
  }

  cells.forEach((c) => {
    c.addEventListener('click', () => {
      const idx = parseInt(c.getAttribute('data-idx'), 10);
      handleMove(idx);
    });
  });

  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      board = ['', '', '', '', '', '', '', '', ''];
      active = true;
      status.textContent = 'Your turn! Click any tile.';
      cells.forEach((c) => {
        c.textContent = '';
        c.className = 'ttt-cell';
      });
    });
  }
}

/* 7. Skills Filtering */
function initSkillsFilter() {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.tech-card');

  pills.forEach((p) => {
    p.addEventListener('click', () => {
      pills.forEach((b) => b.classList.remove('active'));
      p.classList.add('active');

      const filter = p.getAttribute('data-filter');
      cards.forEach((card) => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || filter === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 8. Toasts & Copy to Clipboard */
function showToast(msg) {
  const box = document.getElementById('toast-container');
  if (!box) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<i class="fa-solid fa-check text-cyan"></i> ${msg}`;
  box.appendChild(t);
  setTimeout(() => {
    t.remove();
  }, 2500);
}

function initClipboardAndToasts() {
  const copyElements = document.querySelectorAll('.copy-chip');
  copyElements.forEach((el) => {
    el.addEventListener('click', () => {
      const text = el.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text);
        showToast(`Copied: ${text}`);
      }
    });
  });
}
