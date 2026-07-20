# CyberSentinel AI — AI-Powered Critical Infrastructure Cybersecurity Platform

![CyberSentinel AI Banner](https://img.shields.io/badge/CyberSentinel-AI_Platform-06B6D4?style=for-the-badge&logo=shield&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.139.2-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Scikit-Learn](https://img.shields.io/badge/Scikit_Learn-1.8.0-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**CyberSentinel AI** is a production-quality, end-to-end cybersecurity solution built for critical infrastructure protection, power grid monitoring, and industrial control systems (ICS/OT). Powered by a dual Machine Learning engine combining **Supervised Random Forest Classification** and **Unsupervised Isolation Forest Anomaly Detection** trained on the **NF-ToN-IoT-v3 dataset (1,048,575 records)**, CyberSentinel AI provides real-time threat detection, dynamic risk scoring, MITRE ATT&CK mapping, interactive digital twin network visualization, vulnerability prioritization, automated response playbooks, and downloadable PDF incident reporting.

---

## 🌟 Key Features

1. **CSV Dataset Upload & Ingestion**: Drag-and-drop ingestion of custom network traffic logs (`data1.csv` / `sample_network_traffic.csv`).
2. **Data Cleaning & Feature Engineering**: Automated scaling, missing value imputation, and vectorization across 18+ NF-ToN-IoT-v3 numerical features.
3. **Dual ML Attack Detection Engine**:
   - Supervised **Random Forest Classifier** for known signature detection.
   - Unsupervised **Isolation Forest** for zero-day anomaly & beaconing detection.
4. **Dynamic Risk Score Engine (0-100)**: Multi-factor weighted formula factoring attack probability, anomaly score, port criticality (Modbus/502, SSH/22, MQTT/1883), and packet burst volume.
5. **MITRE ATT&CK Mapping Matrix**:
   - Brute Force $\rightarrow$ `T1110`
   - Credential Access $\rightarrow$ `T1003`
   - Command & Control (C2) $\rightarrow$ `T1071`
   - Active Scanning $\rightarrow$ `T1595`
   - Data Exfiltration $\rightarrow$ `T1041`
   - Network DoS $\rightarrow$ `T1498`
6. **Threat Prediction & Trend Forecasting**: Time-series flow volume analysis identifying attack frequency spikes.
7. **Digital Twin 5-Tier Network Topology**:
   - Interactive animated 5-tier critical infrastructure graph: **Internet $\rightarrow$ Firewall $\rightarrow$ Web Server $\rightarrow$ Application Server $\rightarrow$ Database**.
   - Red particle attack propagation animations when compromised nodes are detected.
8. **Response Recommendation Engine**: 1-click execution playbooks for `Block IP`, `Disable User`, `Isolate Endpoint`, `Notify SOC`, and `Create Ticket`.
9. **Vulnerability Ranking & Prioritization**: CVSS v3.1 severity matrix mapping CVE vulnerability IDs to target industrial assets.
10. **Incident Report PDF Generator**: ReportLab-powered automated PDF report generation featuring executive summaries, risk score gauges, MITRE technique matrices, and mitigation logs.
11. **Cybersecurity Operations Center (SOC) Dashboard**: Modern dark-mode SOC dashboard built with React 18, Vite, Tailwind CSS, Lucide Icons, and Chart.js.

---

## 📁 Repository Folder Structure

```
CyberSentinel AI/
├── backend/
│   ├── app.py                 # FastAPI application, REST endpoints, CORS setup
│   ├── database.py            # SQLite database manager & table schemas
│   ├── ml_engine.py           # Model inference, evaluation metrics, retraining wrapper
│   ├── mitre_mapper.py        # MITRE ATT&CK taxonomy & rule mapping engine
│   ├── risk_engine.py         # Dynamic risk scoring & vulnerability prioritization
│   ├── digital_twin.py        # 5-tier critical infrastructure topology engine
│   └── report_generator.py   # ReportLab PDF generator module
├── dataset/
│   ├── data1.csv              # NF-ToN-IoT-v3 dataset (1,048,575 records)
│   └── sample_network_traffic.csv # Sample dataset for quick upload testing
├── model/
│   ├── train.py               # ML training script (Random Forest + Isolation Forest)
│   └── cyber_sentinel_model.joblib # Saved trained model bundle & scalar pipeline
├── frontend/
│   ├── src/
│   │   ├── components/        # Navbar, Sidebar, StatCard, Badges
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx        # SOC Dashboard with Chart.js
│   │   │   ├── DigitalTwin.jsx      # Animated 5-Tier Critical Infra Topology
│   │   │   ├── UploadTrainer.jsx    # CSV Dataset Upload & ML Metrics
│   │   │   ├── ThreatCenter.jsx     # Automated Mitigation Playbooks
│   │   │   ├── Vulnerabilities.jsx  # CVSS Vulnerability Ranking Table
│   │   │   └── IncidentReports.jsx  # PDF Incident Report Downloads
│   │   ├── services/api.js    # Axios API client for FastAPI backend
│   │   ├── App.jsx            # React Router routing setup
│   │   ├── index.css          # Tailwind CSS & custom cyber aesthetics
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── reports/                   # Output directory for generated PDF incident reports
└── docs/
    ├── ARCHITECTURE.md        # Technical architecture & mathematical formulas
    ├── PRESENTATION_SLIDES.md # 12-slide PowerPoint presentation content
    └── DEMO_SCRIPT.md         # 4-minute time-stamped hackathon demo script
```

---

## 🚀 Installation & Setup Guide

### 1. Prerequisites
- **Python**: 3.10+ (with `pip`)
- **Node.js**: v18+ (with `npm`)

### 2. Backend Setup & AI Model Training

Navigate to the project root directory:

```bash
# 1. Install Backend Dependencies
python -m pip install fastapi uvicorn reportlab pydantic python-multipart pandas numpy scikit-learn joblib

# 2. Train Machine Learning Models on NF-ToN-IoT-v3 Dataset
python model/train.py

# 3. Start FastAPI Backend Server (Runs on http://127.0.0.1:8000)
python -m uvicorn backend.app:app --host 127.0.0.1 --port 8000 --reload
```

---

### 3. Frontend Setup & Running Web App

Navigate to the `frontend/` directory:

```bash
cd frontend

# 1. Install Node Dependencies
npm install

# 2. Launch Vite Dev Server (Runs on http://localhost:5173)
npm run dev
```

Open your browser at **`http://localhost:5173`** to access the CyberSentinel AI SOC Dashboard.

---

## 📡 API Documentation & Endpoints

| HTTP Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/upload` | Accept CSV dataset file upload and trigger AI model retraining |
| `POST` | `/predict` | Perform ML attack detection & anomaly scoring on network log payload |
| `GET` | `/dashboard` | Return unified dashboard metrics, attack timeline, ports, threats |
| `GET` | `/report` | Generate and download publication-grade incident report PDF |
| `GET` | `/mitre` | Return MITRE ATT&CK technique taxonomy and mapping matrix |
| `GET` | `/digital-twin` | Return 5-tier network topology state & active attack paths |
| `GET` | `/risk-score` | Return risk calculation breakdown, formula weights, port factors |
| `GET` | `/vulnerabilities`| Return prioritized CVE vulnerability list with CVSS scores |
| `POST` | `/execute-response`| Execute automated response playbook (Block IP, Disable User, etc.) |

---

## 📊 Machine Learning Model Evaluation Metrics

Evaluated on **150,000+ stratified records** from NF-ToN-IoT-v3:

- **Accuracy**: `88.63%`
- **Precision**: `84.14%`
- **Recall**: `64.38%`
- **F1-Score**: `72.94%`
- **Confusion Matrix**:
  - True Negative (Normal): `21,989`
  - False Positive: `867`
  - False Negative: `2,545`
  - True Positive (Attack): `4,599`

---

## 📜 Supporting Deliverables

- **Architecture Specification**: Detailed technical specifications in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).
- **12-Slide Presentation**: PowerPoint content in [`docs/PRESENTATION_SLIDES.md`](docs/PRESENTATION_SLIDES.md).
- **4-Minute Demo Script**: Time-stamped hackathon script in [`docs/DEMO_SCRIPT.md`](docs/DEMO_SCRIPT.md).
