class DigitalTwinEngine:
    TOPOLOGY_NODES = [
        {
            "id": "node-1",
            "name": "External Internet / Public WAN",
            "type": "INTERNET",
            "tier": 1,
            "ip": "0.0.0.0/0",
            "icon": "Globe",
            "status": "HEALTHY",
            "risk_score": 15.0,
            "description": "Untrusted external incoming network traffic."
        },
        {
            "id": "node-2",
            "name": "Next-Gen Perimeter Firewall",
            "type": "FIREWALL",
            "tier": 2,
            "ip": "192.168.1.1",
            "icon": "ShieldCheck",
            "status": "HEALTHY",
            "risk_score": 25.0,
            "description": "Stateful deep packet inspection & boundary protection."
        },
        {
            "id": "node-3",
            "name": "Web Server & SCADA HMI DMZ",
            "type": "WEB_SERVER",
            "tier": 3,
            "ip": "10.0.1.50",
            "icon": "Server",
            "status": "HEALTHY",
            "risk_score": 35.0,
            "description": "DMZ Web application portal & operator interface."
        },
        {
            "id": "node-4",
            "name": "Application & PLC Controller Server",
            "type": "APP_SERVER",
            "tier": 4,
            "ip": "10.0.2.100",
            "icon": "Cpu",
            "status": "HEALTHY",
            "risk_score": 45.0,
            "description": "Internal OT control logic and Modbus/MQTT app engine."
        },
        {
            "id": "node-5",
            "name": "Critical Historian Database",
            "type": "DATABASE",
            "tier": 5,
            "ip": "10.0.3.200",
            "icon": "Database",
            "status": "HEALTHY",
            "risk_score": 10.0,
            "description": "Encrypted secure storage for industrial sensor telemetry."
        }
    ]

    TOPOLOGY_EDGES = [
        {"source": "node-1", "target": "node-2", "label": "WAN Egress", "animated": True},
        {"source": "node-2", "target": "node-3", "label": "DMZ Traffic", "animated": True},
        {"source": "node-3", "target": "node-4", "label": "OT Control RPC", "animated": True},
        {"source": "node-4", "target": "node-5", "label": "Telemetry Sync", "animated": True}
    ]

    @classmethod
    def get_state(cls, latest_threats=None):
        nodes = [dict(n) for n in cls.TOPOLOGY_NODES]
        edges = [dict(e) for e in cls.TOPOLOGY_EDGES]
        attack_paths = []

        if latest_threats:
            for threat in latest_threats:
                if threat.get('is_attack') or threat.get('risk_score', 0) > 60:
                    port = threat.get('dst_port', 80)
                    attack_type = threat.get('attack_type', 'Attack')
                    
                    # Target node mapping based on port/type
                    if port in [502, 1883]:
                        compromised_id = "node-4" # PLC Controller
                    elif port in [443, 1433, 3306]:
                        compromised_id = "node-5" # Historian DB
                    elif port in [80, 8080]:
                        compromised_id = "node-3" # Web DMZ
                    else:
                        compromised_id = "node-2" # Firewall

                    # Update node status
                    for n in nodes:
                        if n['id'] == compromised_id:
                            n['status'] = "COMPROMISED"
                            n['risk_score'] = min(100.0, max(85.0, threat.get('risk_score', 90)))
                        elif n['tier'] < next(item['tier'] for item in nodes if item['id'] == compromised_id):
                            n['status'] = "WARNING"
                            n['risk_score'] = max(n['risk_score'], 60.0)

                    # Highlight attack path animation
                    attack_paths.append({
                        "path": ["node-1", "node-2", compromised_id],
                        "attack_type": attack_type,
                        "mitre_id": threat.get('mitre_technique_id', 'T1110'),
                        "severity": "CRITICAL" if threat.get('risk_score', 0) > 80 else "HIGH"
                    })

        return {
            "nodes": nodes,
            "edges": edges,
            "active_attack_paths": attack_paths,
            "network_status": "UNDER_ATTACK" if attack_paths else "OPTIMAL",
            "last_updated": "2026-07-19T16:24:32"
        }
