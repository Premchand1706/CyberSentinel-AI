# CyberSentinel AI — System Architecture & Technical Specifications

CyberSentinel AI is an AI-powered cybersecurity platform designed specifically for critical infrastructure, industrial control systems (ICS), and operational technology (OT) environments.

---

## 1. System Architecture Overview

```
                          ┌─────────────────────────────────────────┐
                          │    NF-ToN-IoT-v3 Dataset (1.04M Logs)   │
                          └───────────────────┬─────────────────────┘
                                              │
                                              ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                   FASTAPI BACKEND ENGINE                                │
│                                                                                         │
│  ┌───────────────────────┐   ┌───────────────────────┐   ┌───────────────────────────┐  │
│  │    Dataset Upload     │   │   Supervised Random   │   │  Unsupervised Isolation   │  │
│  │   Preprocessing       │   │  Forest Classifier    │   │  Forest Anomaly Detector  │  │
│  └───────────┬───────────┘   └───────────┬───────────┘   └─────────────┬─────────────┘  │
│              │                           │                             │                │
│              └───────────────────────────┴──────────────┬──────────────┘                │
│                                                         │                               │
│                                                         ▼                               │
│                                    ┌────────────────────────────────────────┐           │
│                                    │  Dynamic Risk Score Engine (0-100)     │           │
│                                    └────────────────────┬───────────────────┘           │
│                                                         │                               │
│      ┌───────────────────────────┬──────────────────────┴────┬─────────────────────┐    │
│      │                           │                           │                     │    │
│      ▼                           ▼                           ▼                     ▼    │
│ ┌─────────┐             ┌─────────────────┐         ┌──────────────────┐   ┌──────────┐ │
│ │ MITRE   │             │ Digital Twin    │         │ Vulnerability    │   │ ReportLab│ │
│ │ Mapper  │             │ Topology Engine │         │ Ranking Engine   │   │ PDF Gen  │ │
│ └─────────┘             └─────────────────┘         └──────────────────┘   └──────────┘ │
└─────────────────────────────────────────┬───────────────────────────────────────────────┘
                                          │ REST APIs
                                          ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                   REACT 18 SOC DASHBOARD                                │
│                                                                                         │
│   ┌─────────────────────┐   ┌──────────────────────┐   ┌─────────────────────────────┐  │
│   │ Unified Dashboard   │   │ Animated 5-Tier Twin │   │ Automated Mitigations       │  │
│   └─────────────────────┘   └──────────────────────┘   └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. ML Dual-Model Detection Pipeline

### Feature Vector (NF-ToN-IoT-v3 Schema)
- `IN_BYTES`, `OUT_BYTES`: Directional traffic payload volume.
- `IN_PKTS`, `OUT_PKTS`: Packet count per flow interval.
- `FLOW_DURATION_MILLISECONDS`: Connection persistence duration.
- `L4_DST_PORT`: Transport layer target service (Modbus/502, SSH/22, MQTT/1883, HTTP/80).
- `PROTOCOL`: Transport protocol ID (TCP/6, UDP/17, ICMP/1).
- `TCP_FLAGS`: TCP control flags (SYN, ACK, FIN, RST).
- `SRC_TO_DST_AVG_THROUGHPUT`, `DST_TO_SRC_AVG_THROUGHPUT`: Bitrate speeds.
- `LONGEST_FLOW_PKT`, `SHORTEST_FLOW_PKT`: Packet size extremes.

### Supervised Classification (Random Forest)
- **Model**: `RandomForestClassifier(n_estimators=100, max_depth=15)`
- **Target**: `Label` (0 = Normal, 1 = Attack)
- **Role**: Detects known attack signatures (Brute Force, DoS, Scanning).

### Unsupervised Anomaly Detection (Isolation Forest)
- **Model**: `IsolationForest(contamination=0.20)`
- **Role**: Identifies zero-day anomalies, stealthy beaconing, and unprecedented flow disruptions without prior training labels.

---

## 3. Dynamic Risk Score Formula

The overall threat risk score $R \in [0, 100]$ is computed dynamically per network flow signature:

$$R = \min\left(100, \max\left(5, 0.40 \cdot P_{\text{RF}} \cdot 100 + 0.30 \cdot S_{\text{Iso}} \cdot 100 + 0.20 \cdot W_{\text{Port}} \cdot 100 + 0.10 \cdot V_{\text{Volume}} \cdot 100\right)\right)$$

Where:
- $P_{\text{RF}}$: Supervised Random Forest attack probability.
- $S_{\text{Iso}}$: Normalized Isolation Forest anomaly score $[0, 1]$.
- $W_{\text{Port}}$: Port criticality weight (Modbus/502 = 1.0, SSH/22 = 0.85, HTTP/80 = 0.60).
- $V_{\text{Volume}}$: Normalized data volume burst factor.

---

## 4. Digital Twin 5-Tier Critical Infrastructure Model

1. **Tier 1 — Internet / Public WAN Egress**: Entry point for external telemetry and remote access connections.
2. **Tier 2 — Next-Gen Perimeter Firewall**: Boundary enforcement performing deep packet inspection.
3. **Tier 3 — Web Server & SCADA HMI DMZ**: Operator interface and web supervisory control.
4. **Tier 4 — Application & PLC Controller Server**: OT control logic, Modbus/TCP, and MQTT broker engine.
5. **Tier 5 — Critical Historian Database**: Secure storage for sensor readings and system state logs.

---

## 5. Security & Automated Mitigations

CyberSentinel AI provides automated mitigation playbooks:
- **Block IP Address**: Pushes firewall drop rules for offensive IP targets.
- **Disable User Account**: Revokes active directory / OAuth credentials.
- **Isolate Endpoint**: Quarantines compromised OT servers onto isolated VLANs.
- **Notify SOC Queue**: Dispatches high-priority notifications to SOC analyst dashboards.
- **Create Ticket**: Logs structured ITSM tickets in Jira / ServiceNow.
