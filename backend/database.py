import sqlite3
import os
import json
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "cybersentinel.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Table: network_logs
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS network_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        src_ip TEXT,
        dst_ip TEXT,
        dst_port INTEGER,
        protocol TEXT,
        in_bytes INTEGER,
        out_bytes INTEGER,
        in_pkts INTEGER,
        out_pkts INTEGER,
        duration INTEGER,
        is_attack INTEGER,
        anomaly_score REAL,
        predicted_attack_type TEXT,
        mitre_technique_id TEXT,
        mitre_technique_name TEXT,
        risk_score REAL
    )
    """)
    
    # Table: response_actions
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS response_actions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        action_type TEXT,
        target TEXT,
        status TEXT,
        reason TEXT
    )
    """)
    
    # Table: incident_reports
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS incident_reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        report_filename TEXT,
        title TEXT,
        total_threats_analyzed INTEGER,
        high_risk_count INTEGER,
        avg_risk_score REAL
    )
    """)
    
    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("[+] Database initialized successfully at:", DB_PATH)
