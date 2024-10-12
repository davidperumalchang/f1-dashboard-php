import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1234';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getEventSchedule() {
    return apiClient.get('/event');
  },
  addEvent(event) {
    return apiClient.post('/event/new', event);
  },
  getTeams() {
    return apiClient.get('/team');
  },
  getTeamStandings() {
    return apiClient.get('/team/standings');
  },
  addTeam(team) {
    return apiClient.post('/team/new', team);
  },
  updateTeamPoints(team) {
    return apiClient.put('/team/update', team);
  },
  getTeamDetails(id) {
    return apiClient.get(`/team/${id}`);
  },
  login(email, password) {
    return apiClient.post('/auth/login', { email, password });
  },
  setAuthToken(token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  removeAuthToken() {
    delete apiClient.defaults.headers.common['Authorization'];
  },
};