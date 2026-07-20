import os
import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, IsolationForest
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

def train_cyber_sentinel_model(dataset_path='Dataset/data1.csv', output_model_path='model/cyber_sentinel_model.joblib'):
    print(f"[*] Loading dataset from {dataset_path}...")
    if not os.path.exists(dataset_path):
        raise FileNotFoundError(f"Dataset not found at {dataset_path}")
    
    # Selected NF-ToN-IoT-v3 numerical features
    feature_cols = [
        'IN_BYTES', 'OUT_BYTES', 'IN_PKTS', 'OUT_PKTS',
        'FLOW_DURATION_MILLISECONDS', 'L4_DST_PORT', 'PROTOCOL',
        'TCP_FLAGS', 'SRC_TO_DST_AVG_THROUGHPUT', 'DST_TO_SRC_AVG_THROUGHPUT',
        'LONGEST_FLOW_PKT', 'SHORTEST_FLOW_PKT', 'MIN_IP_PKT_LEN',
        'MAX_IP_PKT_LEN', 'TCP_WIN_MAX_IN', 'TCP_WIN_MAX_OUT',
        'SRC_TO_DST_IAT_AVG', 'DST_TO_SRC_IAT_AVG'
    ]
    target_col = 'Label'
    
    # Read subset or full dataset with selected columns
    print("[*] Reading dataset features and labels...")
    df = pd.read_csv(dataset_path, usecols=feature_cols + [target_col])
    print(f"[+] Loaded dataset shape: {df.shape}")
    
    # Handle NaNs / Infinities
    df = df.replace([np.inf, -np.inf], np.nan).fillna(0)
    
    # Stratified sample for fast, highly accurate training
    sample_size = min(150000, len(df))
    print(f"[*] Sampling {sample_size} records for model training...")
    df_sample = df.sample(n=sample_size, random_state=42, weights=None).reset_index(drop=True)
    
    X = df_sample[feature_cols]
    y = df_sample[target_col]
    
    # Train test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    # Scaling
    print("[*] Scaling features using StandardScaler...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train Random Forest Classifier
    print("[*] Training Supervised Random Forest Classifier...")
    rf_model = RandomForestClassifier(
        n_estimators=100,
        max_depth=15,
        random_state=42,
        n_jobs=-1
    )
    rf_model.fit(X_train_scaled, y_train)
    
    # Train Isolation Forest
    print("[*] Training Unsupervised Isolation Forest Anomaly Detector...")
    iso_forest = IsolationForest(
        n_estimators=100,
        contamination=0.2,
        random_state=42,
        n_jobs=-1
    )
    iso_forest.fit(X_train_scaled)
    
    # Evaluate Random Forest
    y_pred = rf_model.predict(X_test_scaled)
    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred, zero_division=0)
    rec = recall_score(y_test, y_pred, zero_division=0)
    f1 = f1_score(y_test, y_pred, zero_division=0)
    cm = confusion_matrix(y_test, y_pred)
    
    print("\n" + "="*50)
    print("      MODEL EVALUATION PERFORMANCE METRICS")
    print("="*50)
    print(f"Accuracy : {acc * 100:.2f}%")
    print(f"Precision: {prec * 100:.2f}%")
    print(f"Recall   : {rec * 100:.2f}%")
    print(f"F1 Score : {f1 * 100:.2f}%")
    print(f"Confusion Matrix:\n{cm}")
    print("="*50 + "\n")
    
    # Save Model Bundle
    os.makedirs(os.path.dirname(output_model_path), exist_ok=True)
    model_bundle = {
        'rf_model': rf_model,
        'iso_forest': iso_forest,
        'scaler': scaler,
        'feature_names': feature_cols,
        'metrics': {
            'accuracy': float(acc),
            'precision': float(prec),
            'recall': float(rec),
            'f1_score': float(f1),
            'confusion_matrix': cm.tolist()
        }
    }
    
    joblib.dump(model_bundle, output_model_path)
    print(f"[+] Model bundle successfully saved to: {output_model_path}")
    
    # Also save a small sample CSV for quick user testing/upload demo
    os.makedirs('dataset', exist_ok=True)
    sample_traffic = df_sample.head(500)
    sample_traffic.to_csv('dataset/sample_network_traffic.csv', index=False)
    print(f"[+] Created sample dataset for API upload testing at dataset/sample_network_traffic.csv")

if __name__ == '__main__':
    train_cyber_sentinel_model()
