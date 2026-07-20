# CyberSentinel AI — 4-Minute Hackathon Demo Script

---

### **[0:00 - 0:45] Introduction & The Problem**
- **Speaker**: "Hello everyone! Welcome to CyberSentinel AI — our AI-powered cybersecurity platform engineered specifically to protect critical infrastructure, power grids, and SCADA control systems.
- Critical infrastructure is increasingly targeted by sophisticated cyber threats, from Modbus PLC command injections to SSH brute-force attacks and zero-day anomalies. Traditional firewalls simply cannot keep up with high-velocity OT traffic.
- Today, we are excited to demonstrate CyberSentinel AI — a complete, production-ready system trained on over 1 million records from the NF-ToN-IoT-v3 dataset."

---

### **[0:45 - 1:45] SOC Dashboard & Real-Time Telemetry**
- **Action**: Show `Dashboard.jsx` in browser.
- **Speaker**: "Here on our main SOC Dashboard, CyberSentinel AI processes live network flow telemetry.
- Notice our 5 key metric cards: Total Network Logs analyzed, Attack Count, Clean Normal Traffic, High Risk Alerts, and our dynamic System Risk Score calculated using our Random Forest and Isolation Forest ensemble engine.
- On the left, we see our real-time **Attack Timeline Line Chart**, tracking flow packet spikes over time. Next to it is our **Attack Types Distribution** and **Top Destination Ports Bar Chart** highlighting probes on critical industrial ports like Modbus Port 502 and SSH Port 22.
- Below, our **Active Threats Feed** lists detected intrusion attempts mapped directly to MITRE ATT&CK techniques like **T1071 (Command & Control)** and **T1110 (Brute Force)**."

---

### **[1:45 - 2:30] Digital Twin Network Topology & Attack Propagation**
- **Action**: Navigate to `DigitalTwin.jsx` tab and click `Simulate Modbus C2`.
- **Speaker**: "Now, let me show you one of our standout features: the **Digital Twin Critical Infrastructure Network Topology**.
- This animated 5-tier graph models our entire industrial infrastructure — from External Internet to Perimeter Firewall, Web DMZ, Application PLC Controller, down to our Critical Historian Database.
- Watch what happens when I click **'Simulate Modbus C2 Attack'**:
- CyberSentinel AI instantly detects the intrusion vector, highlights the targeted PLC Controller in glowing red, updates its risk score to 95/100, and animates a red particle attack propagation path flowing across the network edges!
- Analysts can click any node to view real-time IP telemetry, status badges, and isolation status."

---

### **[2:30 - 3:15] AI Model Trainer, Upload & Response Recommendations**
- **Action**: Navigate to `UploadTrainer.jsx` and then `ThreatCenter.jsx`.
- **Speaker**: "Under the **ML Model & Dataset** module, users can drag and drop custom CSV network traffic logs to retrain our AI models on the fly. You can see our complete evaluation metrics — achieving an **88.6% Accuracy** and **72.9% F1 Score**, complete with an interactive Confusion Matrix visualizer.
- Under **Threat Response**, SOC analysts have 1-click automated response playbooks: Block IP, Disable User Account, Isolate Endpoint onto a sandbox VLAN, or Notify SOC queues. When I click **'Block IP'**, CyberSentinel AI instantly dispatches firewall drop rules and logs an immutable audit entry."

---

### **[3:15 - 4:00] PDF Report Generation & Conclusion**
- **Action**: Click `Generate Incident PDF` in top navbar, open downloaded PDF.
- **Speaker**: "Finally, with one click on **'Generate Incident PDF'**, CyberSentinel AI uses ReportLab to generate a publication-grade incident analysis report.
- It includes executive summaries, risk score breakdowns, MITRE technique tables, and automated mitigation logs — ready to present to CISO executives or regulatory compliance auditors.
- CyberSentinel AI delivers complete, sub-second threat detection, digital twin visualization, and automated defense for critical infrastructure. Thank you!"
