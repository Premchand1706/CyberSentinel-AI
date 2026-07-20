import os
import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

REPORTS_DIR = os.path.join(os.path.dirname(__file__), "..", "reports")

def generate_pdf_report(filename="incident_report.pdf", threat_data=None, summary_metrics=None):
    os.makedirs(REPORTS_DIR, exist_ok=True)
    pdf_path = os.path.join(REPORTS_DIR, filename)

    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    # Custom Palette
    BG_DARK = colors.HexColor("#0B0F19")
    CYBER_CYAN = colors.HexColor("#06B6D4")
    THREAT_RED = colors.HexColor("#EF4444")
    TEXT_DARK = colors.HexColor("#1E293B")
    CARD_BG = colors.HexColor("#F8FAFC")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=22,
        textColor=CYBER_CYAN,
        spaceAfter=4
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        textColor=colors.HexColor("#64748B"),
        spaceAfter=15
    )

    heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=14,
        textColor=TEXT_DARK,
        spaceBefore=12,
        spaceAfter=6
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        textColor=colors.HexColor("#334155"),
        leading=13
    )

    story = []

    # Title & Header Banner
    story.append(Paragraph("CyberSentinel AI — Incident Analysis & Threat Report", title_style))
    story.append(Paragraph(f"Generated on: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC')} | Target System: Critical Infrastructure OT/IT Network", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=CYBER_CYAN, spaceBefore=0, spaceAfter=15))

    # Executive Summary Box
    summary_html = """
    <b>EXECUTIVE SUMMARY:</b><br/>
    CyberSentinel AI detected potential security anomalies across critical infrastructure segments.
    The dynamic risk assessment engine flagged multiple unauthorized intrusion attempts, brute-force probes, and potential telemetry tampering.
    Automated response mitigations have been queued for SOC analyst verification.
    """
    story.append(Paragraph(summary_html, body_style))
    story.append(Spacer(1, 12))

    # Metrics Summary Grid Table
    metrics = summary_metrics or {
        "total_logs": 1048575,
        "attack_count": 249815,
        "normal_count": 798760,
        "high_risk_alerts": 12,
        "overall_risk_score": 88.5
    }

    metrics_table_data = [
        [
            Paragraph("<b>Total Logs Analyzed</b>", body_style),
            Paragraph("<b>Attack Detections</b>", body_style),
            Paragraph("<b>High Risk Alerts</b>", body_style),
            Paragraph("<b>System Risk Score</b>", body_style)
        ],
        [
            Paragraph(f"<font size=12><b>{metrics['total_logs']:,}</b></font>", body_style),
            Paragraph(f"<font size=12 color='#EF4444'><b>{metrics['attack_count']:,}</b></font>", body_style),
            Paragraph(f"<font size=12 color='#F59E0B'><b>{metrics['high_risk_alerts']}</b></font>", body_style),
            Paragraph(f"<font size=12 color='#06B6D4'><b>{metrics['overall_risk_score']}/100</b></font>", body_style)
        ]
    ]

    t_metrics = Table(metrics_table_data, colWidths=[130, 130, 130, 130])
    t_metrics.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 1, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_metrics)
    story.append(Spacer(1, 15))

    # Detected Incident Logs Table
    story.append(Paragraph("Top Priority Incidents & MITRE ATT&CK Mapping", heading_style))

    threats = threat_data or [
        {"timestamp": "2026-07-19 16:20:00", "src_ip": "192.168.1.105", "dst_port": 502, "attack_type": "Command & Control (C2)", "mitre_id": "T1071", "risk_score": 94.2},
        {"timestamp": "2026-07-19 16:18:45", "src_ip": "10.0.1.42", "dst_port": 22, "attack_type": "Brute Force", "mitre_id": "T1110", "risk_score": 88.5},
        {"timestamp": "2026-07-19 16:15:30", "src_ip": "172.16.0.88", "dst_port": 443, "attack_type": "Data Exfiltration", "mitre_id": "T1041", "risk_score": 81.0},
        {"timestamp": "2026-07-19 16:12:10", "src_ip": "192.168.1.200", "dst_port": 1883, "attack_type": "Scanning & Reconnaissance", "mitre_id": "T1595", "risk_score": 76.4},
        {"timestamp": "2026-07-19 16:05:00", "src_ip": "10.0.2.14", "dst_port": 80, "attack_type": "Denial of Service (DoS)", "mitre_id": "T1498", "risk_score": 72.1}
    ]

    incidents_table_data = [
        [
            Paragraph("<b>Timestamp</b>", body_style),
            Paragraph("<b>Source IP</b>", body_style),
            Paragraph("<b>Port</b>", body_style),
            Paragraph("<b>Attack Category</b>", body_style),
            Paragraph("<b>MITRE ID</b>", body_style),
            Paragraph("<b>Risk Score</b>", body_style)
        ]
    ]

    for item in threats:
        score = item['risk_score']
        color = "#EF4444" if score >= 85 else ("#F59E0B" if score >= 70 else "#10B981")
        incidents_table_data.append([
            Paragraph(item['timestamp'], body_style),
            Paragraph(item['src_ip'], body_style),
            Paragraph(str(item['dst_port']), body_style),
            Paragraph(item['attack_type'], body_style),
            Paragraph(f"<b>{item['mitre_id']}</b>", body_style),
            Paragraph(f"<font color='{color}'><b>{score}</b></font>", body_style)
        ])

    t_incidents = Table(incidents_table_data, colWidths=[100, 90, 45, 140, 65, 80])
    t_incidents.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0F172A")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_incidents)
    story.append(Spacer(1, 15))

    # Recommended Response Actions
    story.append(Paragraph("Automated Response Recommendations", heading_style))
    recs_data = [
        ["Action Type", "Target Asset", "Status", "Mitigation Objective"],
        ["Block IP Address", "192.168.1.105", "EXECUTED", "Neutralize Modbus PLC command injection"],
        ["Isolate Endpoint", "10.0.1.42", "PENDING_APPROVAL", "Contain SSH brute force compromise on DMZ gateway"],
        ["Notify SOC Analyst", "SOC-Tier2 Queue", "DELIVERED", "Escalate data exfiltration risk event"],
        ["Disable User Account", "admin_backup", "EXECUTED", "Revoke compromised credentials on Historian DB"],
        ["Create Jira Ticket", "INC-2026-9041", "CREATED", "Track vulnerability remediation workflow"]
    ]

    rec_table_data = []
    for idx, row in enumerate(recs_data):
        if idx == 0:
            rec_table_data.append([Paragraph(f"<b>{c}</b>", body_style) for c in row])
        else:
            rec_table_data.append([
                Paragraph(f"<b>{row[0]}</b>", body_style),
                Paragraph(row[1], body_style),
                Paragraph(f"<font color='{'#10B981' if row[2]=='EXECUTED' else '#F59E0B'}'><b>{row[2]}</b></font>", body_style),
                Paragraph(row[3], body_style)
            ])

    t_recs = Table(rec_table_data, colWidths=[110, 100, 110, 200])
    t_recs.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#1E293B")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_recs)

    # Build Document
    doc.build(story)
    print(f"[+] Incident report PDF successfully generated at: {pdf_path}")
    return pdf_path

if __name__ == "__main__":
    generate_pdf_report()
