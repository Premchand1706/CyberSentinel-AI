class RiskEngine:
    PORT_CRITICALITY = {
        502: {"level": "CRITICAL", "name": "Modbus ICS/SCADA Port", "weight": 1.0},
        1883: {"level": "CRITICAL", "name": "MQTT IoT Protocol Port", "weight": 0.95},
        47808: {"level": "CRITICAL", "name": "BACnet Building Automation Port", "weight": 0.95},
        22: {"level": "HIGH", "name": "SSH Secure Shell Port", "weight": 0.85},
        3389: {"level": "HIGH", "name": "RDP Remote Desktop Port", "weight": 0.85},
        445: {"level": "HIGH", "name": "SMB File Sharing Port", "weight": 0.80},
        80: {"level": "MEDIUM", "name": "HTTP Web Port", "weight": 0.60},
        443: {"level": "MEDIUM", "name": "HTTPS Secure Web Port", "weight": 0.50},
        53: {"level": "LOW", "name": "DNS Domain Lookup Port", "weight": 0.40}
    }

    VULNERABILITIES = [
        {
            "id": "VULN-2026-001",
            "cve": "CVE-2026-1048",
            "title": "Modbus/TCP Unauthorized Command Execution",
            "asset": "Industrial PLC Controller (App Server)",
            "port": 502,
            "cvss": 9.8,
            "severity": "CRITICAL",
            "mitre": "T1071",
            "description": "Unauthenticated remote attack vector permitting raw Modbus function code manipulation.",
            "recommendation": "Enforce Modbus Security Gateway TLS encryption and disable unauthenticated function codes."
        },
        {
            "id": "VULN-2026-002",
            "cve": "CVE-2026-8842",
            "title": "SSH Credential Spraying & Weak Cipher Exposure",
            "asset": "Perimeter Firewall & Secure Gateway",
            "port": 22,
            "cvss": 8.6,
            "severity": "HIGH",
            "mitre": "T1110",
            "description": "High frequency brute force attempts exploiting legacy SSH password authentication.",
            "recommendation": "Disable password authentication, enforce Ed25519 SSH keys, and enable Fail2Ban rate limiting."
        },
        {
            "id": "VULN-2026-003",
            "cve": "CVE-2026-3491",
            "title": "SQL Injection & Data Exfiltration in Historian Database",
            "asset": "Critical Historian SQL Database",
            "port": 443,
            "cvss": 8.1,
            "severity": "HIGH",
            "mitre": "T1041",
            "description": "Exfiltration of sensitive telemetry data via unvalidated parameter inputs.",
            "recommendation": "Implement parameterized prepared queries, strict egress filtering, and database DLP monitoring."
        },
        {
            "id": "VULN-2026-004",
            "cve": "CVE-2026-5210",
            "title": "MQTT Broker Unauthenticated Telemetry Injection",
            "asset": "SCADA IoT HMI Gateway",
            "port": 1883,
            "cvss": 7.5,
            "severity": "HIGH",
            "mitre": "T1595",
            "description": "IoT sensor topic spoofing allowing adversaries to inject false grid operational metrics.",
            "recommendation": "Require X.509 client certificate authentication for all MQTT client connections."
        },
        {
            "id": "VULN-2026-005",
            "cve": "CVE-2026-1192",
            "title": "HTTP Application Buffer Overflow Volumetric DoS",
            "asset": "Web Server DMZ Gateway",
            "port": 80,
            "cvss": 6.8,
            "severity": "MEDIUM",
            "mitre": "T1498",
            "description": "Volumetric packet flooding exhausting server socket pools.",
            "recommendation": "Deploy Web Application Firewall (WAF) rate-limiting rules and SYN cookies."
        }
    ]

    @classmethod
    def calculate_risk(cls, attack_prob: float, anomaly_score: float, dst_port: int, in_bytes: int, out_bytes: int) -> float:
        port_info = cls.PORT_CRITICALITY.get(dst_port, {"weight": 0.5})
        port_weight = port_info["weight"]

        volume_factor = min(1.0, (in_bytes + out_bytes) / 500000.0)

        # Dynamic Risk Formula: 40% ML Probability + 30% Anomaly Score + 20% Asset Criticality + 10% Volume
        raw_score = (attack_prob * 40.0) + (anomaly_score * 30.0) + (port_weight * 20.0) + (volume_factor * 10.0)
        return round(min(100.0, max(5.0, raw_score)), 1)

    @classmethod
    def get_vulnerabilities(cls):
        return cls.VULNERABILITIES
