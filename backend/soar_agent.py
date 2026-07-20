class SOAROrchestratorAgent:
    BLAST_RADIUS_MAP = {
        "Block IP Address": {"blast_radius": 25.0, "requires_escalation": False, "description": "Low impact: drops perimeter firewall packet flow for single source IP."},
        "Disable User Account": {"blast_radius": 45.0, "requires_escalation": False, "description": "Medium impact: revokes session tokens for compromised identity."},
        "Isolate Endpoint": {"blast_radius": 85.0, "requires_escalation": True, "description": "HIGH BLAST RADIUS: Sandboxes critical PLC Controller (Node 4) onto isolated VLAN."},
        "Shutdown Grid Controller Node": {"blast_radius": 95.0, "requires_escalation": True, "description": "CRITICAL BLAST RADIUS: Takes regional SCADA power grid controller offline."},
        "Notify SOC Analyst": {"blast_radius": 5.0, "requires_escalation": False, "description": "Zero blast radius: dispatches PagerDuty & Slack alert."},
        "Create Ticket": {"blast_radius": 5.0, "requires_escalation": False, "description": "Zero blast radius: logs ITSM ticket."}
    }

    # In-memory escalation gate approval queue
    ESCALATION_QUEUE = [
        {
            "id": "GATE-2026-8801",
            "action_type": "Isolate Endpoint",
            "target": "10.0.2.100 (Application & PLC Controller Server)",
            "blast_radius": 85.0,
            "threat_cause": "Modbus C2 Command Injection T1071 Detected",
            "status": "PENDING_HUMAN_APPROVAL",
            "timestamp": "2026-07-19 16:24:00"
        }
    ]

    @classmethod
    def evaluate_action(cls, action_type: str, target: str, reason: str = ""):
        info = cls.BLAST_RADIUS_MAP.get(action_type, {"blast_radius": 50.0, "requires_escalation": False, "description": "Standard response"})
        blast_radius = info["blast_radius"]
        requires_escalation = info["requires_escalation"]

        if requires_escalation or blast_radius >= 60.0:
            gate_item = {
                "id": f"GATE-2026-{len(cls.ESCALATION_QUEUE) + 8802}",
                "action_type": action_type,
                "target": target,
                "blast_radius": blast_radius,
                "threat_cause": reason or "High Blast Radius Containment Triggered",
                "status": "PENDING_HUMAN_APPROVAL",
                "timestamp": "2026-07-19 16:24:32"
            }
            cls.ESCALATION_QUEUE.append(gate_item)
            return {
                "status": "ESCALATED_TO_HUMAN_GATE",
                "message": f"Action '{action_type}' exceeds safety threshold (Blast Radius: {blast_radius}%). Escalated to SOC Analyst Approval Gate.",
                "gate_item": gate_item
            }
        else:
            return {
                "status": "AUTONOMOUSLY_EXECUTED",
                "message": f"Action '{action_type}' autonomously executed within safe blast radius ({blast_radius}%).",
                "blast_radius": blast_radius
            }

    @classmethod
    def approve_escalation(cls, gate_id: str, approved: bool, operator_notes: str = ""):
        for item in cls.ESCALATION_QUEUE:
            if item["id"] == gate_id:
                item["status"] = "APPROVED_AND_EXECUTED" if approved else "REJECTED_BY_OPERATOR"
                item["operator_notes"] = operator_notes or ("Approved by SOC Lead" if approved else "Rejected: operational impact risk")
                return {
                    "status": "SUCCESS",
                    "gate_id": gate_id,
                    "new_status": item["status"]
                }
        return {"status": "ERROR", "message": f"Gate ID {gate_id} not found."}

    @classmethod
    def get_escalation_queue(cls):
        return cls.ESCALATION_QUEUE
