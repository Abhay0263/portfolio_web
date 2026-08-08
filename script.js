/**
 * ABHAY RANA - DEVOPS & CLOUD PORTFOLIO INTERACTIVE LOGIC
 * Features:
 * 1. Animated Particle / Dynamic Cyber Grid Canvas
 * 2. Typewriter Effect
 * 3. CI/CD Pipeline Simulator with Real-Time Console Stream
 * 4. AWS IAM Policy Inspector & Role Evaluator
 * 5. Linux Hardening Interactive Web Terminal
 * 6. Containerized Tic-Tac-Toe Bot Game
 * 7. Skill Matrix Filter
 * 8. Toast Notifications & Clipboard Handlers
 */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initTypewriter();
  initPipelineSimulator();
  initIAMInspector();
  initTerminalLab();
  initTicTacToeGame();
  initSkillsFilter();
  initContactAndClipboard();
  initMobileNav();
  initScrollSpy();
});

/* ==========================================================================
   1. Dynamic Background Particle Canvas
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 18000), 55);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.5 + 0.8;
      this.alpha = Math.random() * 0.4 + 0.1;
      this.color = Math.random() > 0.6 ? '#00f0ff' : '#8b5cf6';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#00f0ff';
          ctx.globalAlpha = (1 - dist / 120) * 0.12;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

/* ==========================================================================
   2. Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter');
  if (!target) return;

  const words = [
    'Aspiring DevOps Engineer',
    'Cloud & Security Enthusiast',
    'CI/CD Pipeline Automator',
    'AWS Cloud Architect',
    'Linux Hardening Practitioner'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseTime = 1800;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   3. CI/CD Pipeline Simulator
   ========================================================================== */
function initPipelineSimulator() {
  const btnTrigger = document.getElementById('btn-trigger-pipeline');
  const btnReset = document.getElementById('btn-reset-pipeline');
  const statusBadge = document.getElementById('pipeline-status-text');
  const logsContainer = document.getElementById('pipeline-logs');
  const timerDisplay = document.getElementById('pipeline-timer');
  const nodes = [1, 2, 3, 4, 5, 6].map((num) => document.getElementById(`pipe-node-${num}`));

  let isRunning = false;
  let timerInterval = null;
  let startTime = 0;

  const pipelineStages = [
    {
      step: 1,
      name: 'GitHub Webhook',
      logs: [
        '[GITHUB] Commit detected on branch: origin/main (SHA: 8f4b2c1)',
        '[GITHUB] Webhook event dispatched -> POST https://jenkins.internal/github-webhook/'
      ],
      duration: 1200
    },
    {
      step: 2,
      name: 'Jenkins Build & Test',
      logs: [
        '[JENKINS] Pipeline job #142 triggered by GitHub push event.',
        '[JENKINS] Stage (Unit & Integration Tests): Running pytest & flake8 linting...',
        '[JENKINS] 42/42 tests passed in 1.4s. Zero lint errors. Exit Code: 0.'
      ],
      duration: 1600
    },
    {
      step: 3,
      name: 'Docker Multi-Stage Build',
      logs: [
        '[DOCKER] Building container image: app:v1.4.2 via Dockerfile...',
        '[DOCKER] Multi-stage build complete. Optimized Alpine base image size: 48.2MB.',
        '[SECURITY] Trivy CVE vulnerability scan complete: 0 CRITICAL, 0 HIGH found.'
      ],
      duration: 1800
    },
    {
      step: 4,
      name: 'AWS ECR Push',
      logs: [
        '[AWS-ECR] Authenticating with AWS STS temporary session token...',
        '[AWS-ECR] Pushing image tag 123456789012.dkr.ecr.us-east-1.amazonaws.com/app:v1.4.2',
        '[AWS-ECR] Image manifest uploaded & SHA-256 digest verified.'
      ],
      duration: 1500
    },
    {
      step: 5,
      name: 'AWS ECS Fargate Rollout',
      logs: [
        '[AWS-ECS] Updating ECS Task Definition: app-task-family:18',
        '[AWS-ECS] Triggering zero-downtime Blue/Green rolling deployment on AWS Fargate...',
        '[AWS-ECS] New tasks healthy in Target Group. Traffic routed to new container instances.'
      ],
      duration: 1900
    },
    {
      step: 6,
      name: 'CloudWatch Telemetry',
      logs: [
        '[CLOUDWATCH] Container logs connected: /aws/ecs/fargate-app-cluster',
        '[CLOUDWATCH] Metric Alarms: CPU < 15%, Memory < 32%, Error Rate: 0.00%',
        '[SUCCESS] Pipeline Execution Completed Successfully! Application is LIVE.'
      ],
      duration: 1200
    }
  ];

  function appendLog(text, colorClass = '') {
    const p = document.createElement('div');
    p.className = `log-line ${colorClass}`;
    p.textContent = text;
    logsContainer.appendChild(p);
    logsContainer.scrollTop = logsContainer.scrollHeight;
  }

  function resetPipeline() {
    clearInterval(timerInterval);
    isRunning = false;
    nodes.forEach((n) => {
      if (n) {
        n.classList.remove('node-active', 'node-success');
      }
    });
    statusBadge.className = 'pipeline-status-badge';
    statusBadge.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> READY FOR SIMULATION';
    timerDisplay.textContent = 'Duration: 0.0s';
    logsContainer.innerHTML =
      '<div class="log-line text-muted">[INFO] Pipeline engine reset. Ready to trigger.</div>';
  }

  async function runPipeline() {
    if (isRunning) return;
    isRunning = true;
    resetPipeline();

    statusBadge.className = 'pipeline-status-badge running';
    statusBadge.innerHTML = '<i class="fa-solid fa-gear fa-spin"></i> PIPELINE EXECUTING...';

    startTime = performance.now();
    timerInterval = setInterval(() => {
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(1);
      timerDisplay.textContent = `Duration: ${elapsed}s`;
    }, 100);

    for (let i = 0; i < pipelineStages.length; i++) {
      const stage = pipelineStages[i];
      const currentNode = nodes[i];

      if (currentNode) {
        currentNode.classList.add('node-active');
      }

      for (const log of stage.logs) {
        let color = '';
        if (log.includes('[SUCCESS]')) color = 'text-emerald font-bold';
        else if (log.includes('[SECURITY]')) color = 'text-cyan';
        else if (log.includes('[CLOUDWATCH]')) color = 'text-purple';
        else if (log.includes('[DOCKER]')) color = 'text-cyan';
        else if (log.includes('[JENKINS]')) color = 'text-yellow';
        appendLog(log, color);
      }

      await new Promise((r) => setTimeout(r, stage.duration));

      if (currentNode) {
        currentNode.classList.remove('node-active');
        currentNode.classList.add('node-success');
      }
    }

    clearInterval(timerInterval);
    statusBadge.className = 'pipeline-status-badge success';
    statusBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> BUILD & DEPLOY PASSED';
    isRunning = false;
    showToast('CI/CD Pipeline simulation completed with 100% success!');
  }

  if (btnTrigger) btnTrigger.addEventListener('click', runPipeline);
  if (btnReset) btnReset.addEventListener('click', resetPipeline);
}

/* ==========================================================================
   4. AWS Cloud Infrastructure & IAM Policy Inspector
   ========================================================================== */
function initIAMInspector() {
  const roleButtons = document.querySelectorAll('.role-btn');
  const policyCode = document.getElementById('policy-code-output');
  const btnCopyPolicy = document.getElementById('btn-copy-policy');

  const badgeEC2 = document.getElementById('badge-ec2');
  const badgeS3 = document.getElementById('badge-s3');
  const badgeECS = document.getElementById('badge-ecs');

  const rolePolicies = {
    'devops-lead': {
      ec2: { status: 'ALLOWED', class: 'access-pill', icon: 'fa-check' },
      s3: { status: 'ALLOWED', class: 'access-pill', icon: 'fa-check' },
      ecs: { status: 'ALLOWED', class: 'access-pill', icon: 'fa-check' },
      json: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DevOpsLeastPrivilegeRole",
      "Effect": "Allow",
      "Action": [
        "ec2:Describe*",
        "ec2:StartInstances",
        "ec2:StopInstances",
        "ecs:UpdateService",
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "*"
    }
  ]
}`
    },
    'security-auditor': {
      ec2: { status: 'READ-ONLY', class: 'access-pill', icon: 'fa-eye' },
      s3: { status: 'READ-ONLY', class: 'access-pill', icon: 'fa-eye' },
      ecs: { status: 'READ-ONLY', class: 'access-pill', icon: 'fa-eye' },
      json: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "SecurityAuditorReadOnly",
      "Effect": "Allow",
      "Action": [
        "ec2:Describe*",
        "ec2:Get*",
        "ecs:Describe*",
        "ecr:Describe*",
        "s3:ListBucket",
        "cloudwatch:GetMetricData",
        "cloudtrail:LookupEvents"
      ],
      "Resource": "*"
    }
  ]
}`
    },
    'unauthorized-guest': {
      ec2: { status: 'DENIED', class: 'access-pill denied', icon: 'fa-xmark' },
      s3: { status: 'DENIED', class: 'access-pill denied', icon: 'fa-xmark' },
      ecs: { status: 'DENIED', class: 'access-pill denied', icon: 'fa-xmark' },
      json: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ExplicitDenyAll",
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*"
    }
  ]
}`
    }
  };

  roleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      roleButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const roleKey = btn.getAttribute('data-role');
      const data = rolePolicies[roleKey];
      if (!data) return;

      policyCode.textContent = data.json;

      if (badgeEC2) {
        badgeEC2.className = data.ec2.class;
        badgeEC2.innerHTML = `<i class="fa-solid ${data.ec2.icon}"></i> ${data.ec2.status}`;
      }
      if (badgeS3) {
        badgeS3.className = data.s3.class;
        badgeS3.innerHTML = `<i class="fa-solid ${data.s3.icon}"></i> ${data.s3.status}`;
      }
      if (badgeECS) {
        badgeECS.className = data.ecs.class;
        badgeECS.innerHTML = `<i class="fa-solid ${data.ecs.icon}"></i> ${data.ecs.status}`;
      }
    });
  });

  if (btnCopyPolicy) {
    btnCopyPolicy.addEventListener('click', () => {
      navigator.clipboard.writeText(policyCode.textContent.trim());
      showToast('IAM Policy JSON copied to clipboard!');
    });
  }
}

/* ==========================================================================
   5. Linux Hardening Interactive Web Terminal
   ========================================================================== */
function initTerminalLab() {
  const termScreen = document.getElementById('term-screen');
  const termInput = document.getElementById('term-input');
  const termSendBtn = document.getElementById('term-send-btn');
  const quickCmdChips = document.querySelectorAll('.quick-cmd-chip');

  if (!termScreen || !termInput) return;

  const commandResponses = {
    help: `Available commands:
  - audit / hardening-audit : Run automated CIS benchmark checks
  - check-ssh               : Inspect hardened SSH configuration
  - ufw / ufw status        : Inspect active firewall & port filters
  - cat audit.sh            : View Abhay's automated shell audit script
  - skills                  : Output technical competencies
  - projects                : List portfolio DevOps projects
  - whoami / about          : Display profile summary
  - contact                 : Display email, phone, and social links
  - clear                   : Clear terminal output`,

    audit: `[CIS-AUDIT] Running security audit against benchmark v2.4...
[PASS] Root SSH access disabled (PermitRootLogin no)
[PASS] Password authentication disabled (Key-based only)
[PASS] Permissions on /etc/shadow set to 0600
[PASS] Permissions on /etc/passwd set to 0644
[PASS] Unnecessary services disabled (cups, rpcbind, avahi)
[PASS] Sysctl kernel hardening applied (tcp_syncookies = 1, rp_filter = 1)
[PASS] UFW active: Only ports 80, 443, and hardened SSH open.
---------------------------------------------------------
Audit Summary: 7/7 checks passed. Security Score: 98/100 (HARDENED)`,

    'hardening-audit': `[CIS-AUDIT] Running security audit against benchmark v2.4...
[PASS] Root SSH access disabled (PermitRootLogin no)
[PASS] Password authentication disabled (Key-based only)
[PASS] Permissions on /etc/shadow set to 0600
[PASS] Permissions on /etc/passwd set to 0644
[PASS] Unnecessary services disabled (cups, rpcbind, avahi)
[PASS] Sysctl kernel hardening applied (tcp_syncookies = 1, rp_filter = 1)
[PASS] UFW active: Only ports 80, 443, and hardened SSH open.
---------------------------------------------------------
Audit Summary: 7/7 checks passed. Security Score: 98/100 (HARDENED)`,

    'check-ssh': `Configuration file: /etc/ssh/sshd_config
---------------------------------------------
Port 2222 (Non-standard port configured)
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
X11Forwarding no
AllowAgentForwarding no
[STATUS] SSH daemon running in hardened least-privilege mode.`,

    ufw: `Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), disabled (routed)

To                         Action      From
--                         ------      ----
80/tcp (HTTP)              ALLOW IN    Anywhere
443/tcp (HTTPS)            ALLOW IN    Anywhere
2222/tcp (SSH-Hardened)    LIMIT IN    192.168.1.0/24`,

    'ufw status': `Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), disabled (routed)

To                         Action      From
--                         ------      ----
80/tcp (HTTP)              ALLOW IN    Anywhere
443/tcp (HTTPS)            ALLOW IN    Anywhere
2222/tcp (SSH-Hardened)    LIMIT IN    192.168.1.0/24`,

    'cat /etc/security/audit.sh': `#!/usr/bin/env bash
# Linux Server Hardening Automation Script by Abhay Rana
echo "[*] Checking /etc/shadow permissions..."
stat -c "%a" /etc/shadow | grep -q "600" && echo "[+] Shadow permissions SECURE" || chmod 600 /etc/shadow

echo "[*] Auditing SSH configuration..."
grep -q "^PermitRootLogin no" /etc/ssh/sshd_config && echo "[+] Root SSH: DISABLED"

echo "[*] Checking open listening sockets..."
ss -tuln | grep -E "(:21|:23|:25)" && echo "[-] Insecure legacy ports open!" || echo "[+] No legacy ports open."`,

    'cat audit.sh': `#!/usr/bin/env bash
# Linux Server Hardening Automation Script by Abhay Rana
echo "[*] Checking /etc/shadow permissions..."
stat -c "%a" /etc/shadow | grep -q "600" && echo "[+] Shadow permissions SECURE" || chmod 600 /etc/shadow

echo "[*] Auditing SSH configuration..."
grep -q "^PermitRootLogin no" /etc/ssh/sshd_config && echo "[+] Root SSH: DISABLED"

echo "[*] Checking open listening sockets..."
ss -tuln | grep -E "(:21|:23|:25)" && echo "[-] Insecure legacy ports open!" || echo "[+] No legacy ports open."`,

    skills: `Cloud & DevOps : AWS (EC2, IAM, S3, ECS, ECR, Fargate), Docker, Jenkins, CI/CD, Git
Security       : IAM Least-Privilege, Linux Hardening, CIS Audits, DevSecOps
Programming    : Python (Flask), C++, Java, HTML5, CSS3, JavaScript
Systems/Data   : Linux Administration, SSH, Nginx, TCP/IP Networking, MySQL`,

    projects: `1. Automated Serverless CI/CD Pipeline Deployment (GitHub, Jenkins, Docker, AWS ECS Fargate, ECR)
2. AWS Cloud Infrastructure with IAM Security (EC2, IAM Least-Privilege, Linux sysadmin)
3. Linux Server Hardening Security Automation (Bash audits, CIS benchmarks, UFW)
4. Containerized Tic-Tac-Toe with Bot Mode (Python Flask, MySQL, Docker Compose, Nginx)`,

    whoami: `Abhay Rana - Aspiring DevOps Engineer & Cloud Security Enthusiast
Pursuing Bachelor of Computer Applications (2024-2027) at CGC Jhanjeri.
Currently preparing for AWS Certified Cloud Practitioner.`,

    about: `Abhay Rana - Aspiring DevOps Engineer & Cloud Security Enthusiast
Pursuing Bachelor of Computer Applications (2024-2027) at CGC Jhanjeri.
Currently preparing for AWS Certified Cloud Practitioner.`,

    contact: `Email    : Abhiryana0263@gmail.com
Phone    : +91 9015210665
GitHub   : https://github.com/Abhay0263
LinkedIn : Abhay Rana`
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Echo input
    const inputEcho = document.createElement('div');
    inputEcho.className = 'term-line';
    inputEcho.innerHTML = `<span class="term-prompt-user">abhay@hardened-node</span><span class="text-muted">:</span><span class="term-prompt-path">~</span><span class="term-prompt-symbol">$</span> <span>${rawCmd}</span>`;
    termScreen.appendChild(inputEcho);

    if (cmd === 'clear') {
      termScreen.innerHTML = '';
    } else if (commandResponses[cmd]) {
      const responseEl = document.createElement('div');
      responseEl.className = 'term-line output-text text-cyan';
      responseEl.innerHTML = `<pre style="font-family: inherit; white-space: pre-wrap;">${commandResponses[cmd]}</pre>`;
      termScreen.appendChild(responseEl);
    } else {
      const notFoundEl = document.createElement('div');
      notFoundEl.className = 'term-line output-text text-red';
      notFoundEl.textContent = `bash: command not found: ${rawCmd}. Type 'help' to see valid commands.`;
      termScreen.appendChild(notFoundEl);
    }

    termInput.value = '';
    termScreen.scrollTop = termScreen.scrollHeight;
  }

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(termInput.value);
    }
  });

  if (termSendBtn) {
    termSendBtn.addEventListener('click', () => {
      executeCommand(termInput.value);
    });
  }

  quickCmdChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      executeCommand(cmd);
    });
  });
}

/* ==========================================================================
   6. Containerized Tic-Tac-Toe Playable Game with Bot AI
   ========================================================================== */
function initTicTacToeGame() {
  const cells = document.querySelectorAll('.ttt-cell');
  const statusText = document.getElementById('game-status-text');
  const btnReset = document.getElementById('btn-reset-game');

  const scorePlayerEl = document.getElementById('player-score');
  const scoreTiesEl = document.getElementById('ties-score');
  const scoreBotEl = document.getElementById('bot-score');

  let board = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;
  let currentPlayer = 'X'; // Human is X, Bot is O

  let scores = { player: 0, ties: 0, bot: 0 };

  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  function checkWin(currentBoard, player) {
    for (const condition of winningConditions) {
      if (
        currentBoard[condition[0]] === player &&
        currentBoard[condition[1]] === player &&
        currentBoard[condition[2]] === player
      ) {
        return condition;
      }
    }
    return null;
  }

  function checkTie(currentBoard) {
    return currentBoard.every((cell) => cell !== '');
  }

  function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'), 10);

    if (board[clickedIndex] !== '' || !gameActive || currentPlayer !== 'X') {
      return;
    }

    makeMove(clickedIndex, 'X');

    const winLine = checkWin(board, 'X');
    if (winLine) {
      endGame('player', winLine);
      return;
    }

    if (checkTie(board)) {
      endGame('tie');
      return;
    }

    // Bot move
    currentPlayer = 'O';
    statusText.textContent = 'Bot is calculating move via Python/Flask API...';
    setTimeout(botTurn, 400);
  }

  function makeMove(index, player) {
    board[index] = player;
    const cell = cells[index];
    cell.textContent = player;
    cell.classList.add(player === 'X' ? 'x-mark' : 'o-mark');
  }

  function botTurn() {
    if (!gameActive) return;

    // AI logic: 1. Win if possible, 2. Block player win, 3. Take center, 4. Random available
    let bestMove = findBestMove();
    makeMove(bestMove, 'O');

    const winLine = checkWin(board, 'O');
    if (winLine) {
      endGame('bot', winLine);
      return;
    }

    if (checkTie(board)) {
      endGame('tie');
      return;
    }

    currentPlayer = 'X';
    statusText.textContent = 'Your turn (X). Choose your tile.';
  }

  function findBestMove() {
    // 1. Check if bot can win in 1 move
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        if (checkWin(board, 'O')) {
          board[i] = '';
          return i;
        }
        board[i] = '';
      }
    }

    // 2. Check if player could win and block them
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'X';
        if (checkWin(board, 'X')) {
          board[i] = '';
          return i;
        }
        board[i] = '';
      }
    }

    // 3. Take center if available
    if (board[4] === '') return 4;

    // 4. Take corners
    const corners = [0, 2, 6, 8].filter((i) => board[i] === '');
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    // 5. Take any remaining
    const emptyIndices = board
      .map((val, idx) => (val === '' ? idx : null))
      .filter((val) => val !== null);
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  }

  function endGame(result, winLine = null) {
    gameActive = false;

    if (result === 'player') {
      scores.player++;
      if (scorePlayerEl) scorePlayerEl.textContent = scores.player;
      statusText.innerHTML = '<span class="text-emerald"><i class="fa-solid fa-trophy"></i> You won against the Bot!</span>';
      if (winLine) highlightWin(winLine);
    } else if (result === 'bot') {
      scores.bot++;
      if (scoreBotEl) scoreBotEl.textContent = scores.bot;
      statusText.innerHTML = '<span class="text-purple"><i class="fa-solid fa-robot"></i> Bot won this match!</span>';
      if (winLine) highlightWin(winLine);
    } else {
      scores.ties++;
      if (scoreTiesEl) scoreTiesEl.textContent = scores.ties;
      statusText.innerHTML = '<span class="text-yellow"><i class="fa-solid fa-handshake"></i> Draw game!</span>';
    }
  }

  function highlightWin(line) {
    line.forEach((idx) => {
      cells[idx].classList.add('win-cell');
    });
  }

  function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusText.textContent = 'Your turn! Click any grid tile to move.';
    cells.forEach((cell) => {
      cell.textContent = '';
      cell.className = 'ttt-cell';
    });
  }

  cells.forEach((cell) => cell.addEventListener('click', handleCellClick));
  if (btnReset) btnReset.addEventListener('click', resetGame);
}

/* ==========================================================================
   7. Technical Skills Matrix Filtering
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInLog 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. Contact Form, Copy to Clipboard & Toasts
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-cyan"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function initContactAndClipboard() {
  // Copy contact buttons
  const copyButtons = document.querySelectorAll('.copy-contact-btn');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy);
        showToast(`Copied "${textToCopy}" to clipboard!`);
      }
    });
  });

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      showToast(`Thank you, ${name}! Your message has been simulated & routed to Abhay.`);
      contactForm.reset();
    });
  }
}

/* ==========================================================================
   9. Mobile Navigation Toggle & ScrollSpy
   ========================================================================== */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });

  links.forEach((l) => {
    l.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
    });
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
