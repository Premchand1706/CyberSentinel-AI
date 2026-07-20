import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchDashboardData = async () => {
  try {
    const res = await api.get('/dashboard');
    return res.data;
  } catch (err) {
    console.warn('Backend unavailable, using synchronized baseline telemetry:', err);
    return null;
  }
};

export const fetchDigitalTwinData = async () => {
  try {
    const res = await api.get('/digital-twin');
    return res.data;
  } catch (err) {
    console.warn('Digital Twin API offline, using topological fallback:', err);
    return null;
  }
};

export const fetchMitreMatrix = async () => {
  try {
    const res = await api.get('/mitre');
    return res.data;
  } catch (err) {
    console.warn('MITRE API offline:', err);
    return null;
  }
};

export const fetchVulnerabilities = async () => {
  try {
    const res = await api.get('/vulnerabilities');
    return res.data;
  } catch (err) {
    console.warn('Vulnerability API offline:', err);
    return null;
  }
};

export const uploadDatasetFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const executeResponseAction = async (actionType, target, reason) => {
  const res = await api.post('/execute-response', {
    action_type: actionType,
    target: target,
    reason: reason || 'SOC Operator Manual Execution',
  });
  return res.data;
};

export const downloadIncidentReport = () => {
  window.open(`${API_BASE_URL}/report`, '_blank');
};

export default api;
