class CERTInAdvisoryEngine:
    ADVISORIES = [
        {
            "id": "CIVN-2026-0042",
            "title": "High Severity Vulnerability in Industrial PLC Modbus Controllers",
            "cni_sector": "Power & Energy Grid",
            "severity": "CRITICAL",
            "date": "2026-07-15",
            "target_entity": "State Electricity Transmission Utilities / SCADA",
            "summary": "CERT-In cautions against unauthorized Modbus function code execution allowing unauthenticated remote control payload injection.",
            "action_required": "Enforce Modbus TLS gateway encryption and isolate Modbus port 502."
        },
        {
            "id": "CIVN-2026-0089",
            "title": "Targeted APT Credential Spraying Campaign on Public Examination & Educational Systems",
            "cni_sector": "Public Education / CBSE / National Testing",
            "severity": "HIGH",
            "date": "2026-07-10",
            "target_entity": "CBSE Digital Infrastructure & State Board Portals",
            "summary": "Sophisticated threat actors executing low-and-slow SSH & RDP credential harvesting to exfiltrate student & institutional records.",
            "action_required": "Enforce mandatory MFA, disable password authentication on port 22, and monitor UEBA baseline deviations."
        },
        {
            "id": "CIVN-2026-0112",
            "title": "Ransomware Threat Targeting National Healthcare & Hospital Information Systems",
            "cni_sector": "Healthcare & Life Sciences / AIIMS",
            "severity": "CRITICAL",
            "date": "2026-07-02",
            "target_entity": "AIIMS Delhi & Regional Public Hospitals",
            "summary": "Exfiltration of patient EMR records followed by volumetric SQL database exfiltration over encrypted port 443 C2 channels.",
            "action_required": "Deploy deep packet inspection, outbound data loss prevention (DLP), and immediate endpoint isolation."
        }
    ]

    @classmethod
    def get_advisories(cls):
        return {
            "total_advisories": len(cls.ADVISORIES),
            "certin_helpline": "1800-11-4949 | incident@cert-in.org.in",
            "advisories": cls.ADVISORIES
        }
