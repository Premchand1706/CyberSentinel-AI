# CyberSentinel AI — 12-Slide Hackathon Presentation Content

---

## Slide 1: Title & Vision
- **Title**: CyberSentinel AI — AI-Powered Critical Infrastructure Cyber Defense Platform
- **Subtitle**: Protecting Power Grids, Water Treatment, and Industrial Control Systems with Real-Time Threat Detection & Digital Twin Visualization
- **Presenter**: CyberSentinel AI Hackathon Team
- **Key Highlight**: Dual Supervised + Unsupervised ML Engine trained on 1,048,575 NF-ToN-IoT-v3 records.

---

## Slide 2: The Problem Statement
- **Critical Infrastructure Under Attack**: OT/ICS environments (Modbus, BACnet, MQTT) were not built for modern Internet threat landscapes.
- **Legacy Limitations**: Traditional signature-based firewalls miss zero-day anomalies and stealthy C2 beaconing.
- **High Blast Radius**: A single compromised PLC or SCADA gateway can cause power blackouts, chemical contamination, or severe economic loss.

---

## Slide 3: The CyberSentinel Solution
- **Unified Defense Platform**: End-to-end AI detection, digital twin topology visualization, MITRE ATT&CK mapping, and automated SOC response playbooks.
- **Dual AI Engine**: Combines Supervised Random Forest (known attack patterns) and Unsupervised Isolation Forest (zero-day anomaly detection).
- **Sub-Second Response**: Automated 1-click IP blocking, endpoint isolation, and publication-grade PDF incident report generation.

---

## Slide 4: Tech Stack & Architecture
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Chart.js, Animated SVG Topology.
- **Backend**: Python 3, FastAPI, SQLite, Pydantic, ReportLab PDF Generator.
- **ML Pipeline**: Scikit-Learn (Random Forest + Isolation Forest), Pandas, NumPy, Joblib.
- **Dataset**: NF-ToN-IoT-v3 (1.04M records, 53 network flow features).

---

## Slide 5: Dataset & Machine Learning Performance
- **Dataset Size**: 1,048,575 records (798,760 Normal, 249,815 Attack).
- **Model Accuracy**: 88.63% Accuracy | 84.14% Precision | 72.94% F1-Score.
- **Confusion Matrix**: 21,989 True Negatives | 4,599 True Positives | Low False Positive Rate.
- **Model Bundle**: Exported as single deployable `cyber_sentinel_model.joblib`.

---

## Slide 6: Dynamic Risk Scoring Formula
- **Weighted Formula**:
  - 40% Supervised ML Attack Probability
  - 30% Isolation Forest Anomaly Score
  - 20% Target Asset / Port Criticality (Modbus/502 = 1.0, SSH/22 = 0.85)
  - 10% Data Volume & Packet Rate Burst Factor
- **Outcome**: Single 0–100 Risk Score for instantaneous SOC triage.

---

## Slide 7: MITRE ATT&CK Mapping Matrix
- **T1110 (Brute Force)**: SSH/22 & RDP/3389 credential spraying probes.
- **T1003 (Credential Access)**: OS credential dumping attempts.
- **T1071 (Command & Control)**: Modbus/502 & MQTT/1883 protocol abuses.
- **T1595 (Active Scanning)**: Port sweeps & reconnaissance.
- **T1041 (Data Exfiltration)**: Outbound payload volume anomalies.
- **T1498 (Network DoS)**: Volumetric TCP SYN & ICMP floods.

---

## Slide 8: Digital Twin 5-Tier Network Topology
- **Interactive Visualization**:
  1. External Internet Egress WAN
  2. Next-Gen Perimeter Firewall
  3. Web Server & SCADA HMI DMZ
  4. Application & PLC Controller Server
  5. Critical Historian Database
- **Real-Time Visuals**: Red glowing particle attack paths show propagation vectors when threats occur.

---

## Slide 9: Response Recommendation Engine
- **Automated SOC Playbooks**:
  - `Block IP Address`: Drops perimeter connection on firewall.
  - `Disable User Account`: Revokes compromised credentials.
  - `Isolate Endpoint`: Sandboxes compromised PLC controllers onto isolated VLANs.
  - `Notify SOC`: Pushes PagerDuty/Slack alerts.
  - `Create Ticket`: Logs Jira / ServiceNow tickets automatically.

---

## Slide 10: Vulnerability Ranking & Prioritization
- **CVSS Prioritization**: Ranks asset vulnerabilities by CVSS v3.1 score and target port criticality.
- **Actionable Remediation**: Specific guidance (e.g. "Enforce Modbus TLS gateway encryption and X.509 client certificates").

---

## Slide 11: Automated PDF Incident Report Generation
- **ReportLab PDF Generator**: One-click generation of publication-grade PDF incident reports.
- **Included Content**: Executive summary, risk score breakdown, MITRE ATT&CK technique matrix, timestamped incident logs, and response audit trail.

---

## Slide 12: Business Impact & Roadmap
- **Key Takeaway**: CyberSentinel AI bridges the gap between IT security monitoring and physical OT critical infrastructure protection.
- **Future Roadmap**:
  - Integration with hardware tap devices & Snort/Zeek sensor feeds.
  - LLM-powered SOC Analyst Chatbot for interactive incident investigation.
- **Conclusion**: Ready for production deployment in power grids, water networks, and smart factories.
