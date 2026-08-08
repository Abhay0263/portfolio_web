# Abhay Rana - DevOps & Cloud Engineering Portfolio 🚀

An interactive, visual-first portfolio website showcasing cloud architecture, CI/CD pipeline automation, Linux server hardening, and containerized full-stack microservices.

🌐 **Live Ready**: Zero build tools required, pure HTML5/CSS3/JS, instant 1-click deployment to **GitHub Pages**.

---

## 🌟 Key Interactive Visual Features

1. **Interactive CI/CD Pipeline Simulator**:
   - Visual step-by-step pipeline runner: `GitHub Push` ➔ `Jenkins Automation` ➔ `Docker Build & CVE Scan` ➔ `AWS ECR Push` ➔ `ECS Fargate Blue/Green Rollout` ➔ `CloudWatch Telemetry`.
   - Real-time build logger streaming live stage execution.

2. **AWS Cloud & IAM Policy Inspector**:
   - Visual VPC architecture topology (Public/Private subnets, EC2, S3, ECS).
   - Interactive role switcher (`DevOps Engineer`, `Security Auditor`, `Unprivileged User`) updating access permissions and live JSON policy viewer.

3. **Linux Server Hardening Lab & Web Terminal**:
   - Embedded interactive terminal (`abhay@hardened-node:~$`) with simulated commands: `audit`, `check-ssh`, `ufw status`, `cat audit.sh`, `skills`, `clear`.
   - Dynamic 98/100 CIS Hardening benchmark score gauge.

4. **Containerized Architecture & Playable Bot Mode**:
   - Multi-tier Docker Compose blueprint (`Nginx Proxy` ➔ `Flask API` ➔ `MySQL DB`).
   - Built-in interactive Tic-Tac-Toe game against an AI bot.

5. **Categorized Skills Matrix & Education Roadmap**:
   - Filterable skills grid by Cloud, Security, Systems, Programming, and Core CS.
   - Milestone tracker for AWS Certified Cloud Practitioner & BCA at Chandigarh Group of Colleges.

---

## 🚀 How to Host on GitHub Pages (Free & Instant)

### Option 1: In your current repository
1. Commit and push the `portfolio_web` folder or root files to your GitHub repository (e.g. `https://github.com/Abhay0263/Abhay0263` or `https://github.com/Abhay0263/portfolio`).
2. Go to your repository on GitHub.
3. Click **Settings** ➔ **Pages** (on the left sidebar).
4. Under **Branch**, select `main` and root `/` (or `/docs`), then click **Save**.
5. Your portfolio will be live at: `https://abhay0263.github.io/portfolio` (or your chosen repository name)!

---

## 💻 How to Run Locally

You can simply open `index.html` in any modern web browser, or start a lightweight local server:

### Using Python:
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`

### Using VS Code / IDE:
Right click `index.html` and click **Open with Live Server**.
