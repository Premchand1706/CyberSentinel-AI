class MITREMapper:
    TECHNIQUES = {
        "Brute Force": {
            "technique_id": "T1110",
            "technique_name": "Brute Force",
            "tactic": "Credential Access",
            "description": "Adversaries may use brute force mechanisms to gain access to accounts when passwords are unknown or password hashes are unavailable.",
            "mitigation": "Enforce strong password policies, multi-factor authentication (MFA), and account lockout thresholds.",
            "affected_ports": [22, 3389, 21, 23]
        },
        "Credential Access": {
            "technique_id": "T1003",
            "technique_name": "OS Credential Dumping",
            "tactic": "Credential Access",
            "description": "Adversaries may attempt to dump credentials from operating system storage to obtain account login credentials.",
            "mitigation": "Restrict access to LSASS memory, enable Credential Guard, and audit privileged user access.",
            "affected_ports": [445, 139, 88]
        },
        "Command & Control (C2)": {
            "technique_id": "T1071",
            "technique_name": "Application Layer Protocol",
            "tactic": "Command and Control",
            "description": "Adversaries may communicate using application layer protocols to avoid detection by blending in with normal network traffic.",
            "mitigation": "Deploy deep packet inspection (DPI), proxy traffic filtering, and beaconing signature detection.",
            "affected_ports": [502, 1883, 47808, 8080]
        },
        "Scanning & Reconnaissance": {
            "technique_id": "T1595",
            "technique_name": "Active Scanning",
            "tactic": "Reconnaissance",
            "description": "Adversaries may execute active scans to gather victim infrastructure details, port availability, and vulnerable service versions.",
            "mitigation": "Implement ingress firewall rules, honeypots, rate limiting, and network stealth configurations.",
            "affected_ports": [80, 443, 22, 8080]
        },
        "Data Exfiltration": {
            "technique_id": "T1041",
            "technique_name": "Exfiltration Over C2 Channel",
            "tactic": "Exfiltration",
            "description": "Adversaries may steal sensitive critical infrastructure data by transferring it over existing command and control channels.",
            "mitigation": "Enforce strict Data Loss Prevention (DLP) policies, outbound traffic throttling, and encrypted tunnel inspection.",
            "affected_ports": [443, 80, 53]
        },
        "Denial of Service (DoS)": {
            "technique_id": "T1498",
            "technique_name": "Network Denial of Service",
            "tactic": "Impact",
            "description": "Adversaries may launch volumetric network flooding attacks targeting critical SCADA/ICS controllers and Web APIs.",
            "mitigation": "Deploy automated Anti-DDoS scrubbing, web application firewalls (WAF), and packet rate limits.",
            "affected_ports": [80, 443, 502]
        }
    }

    @classmethod
    def get_mitre_mapping(cls, attack_type: str):
        return cls.TECHNIQUES.get(attack_type, {
            "technique_id": "T1059",
            "technique_name": "Command and Scripting Interpreter",
            "tactic": "Execution",
            "description": "Adversaries may execute commands or scripts to interact with target infrastructure.",
            "mitigation": "Audit script execution and apply application whitelisting.",
            "affected_ports": []
        })

    @classmethod
    def get_all_matrix(cls):
        matrix = []
        for name, data in cls.TECHNIQUES.items():
            matrix.append({
                "attack_type": name,
                "technique_id": data["technique_id"],
                "technique_name": data["technique_name"],
                "tactic": data["tactic"],
                "description": data["description"],
                "mitigation": data["mitigation"],
                "affected_ports": data["affected_ports"]
            })
        return matrix
