import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1234';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to extract data from response
const extractData = response => response.data.data || response.data;

export default {
  getEventSchedule() {
    return apiClient.get('/event').then(extractData);
  },
  addEvent(event) {
    return apiClient.post('/event', event);
  },
  getTeams() {
    return apiClient.get('/team').then(extractData);
  },
  getTeamStandings() {
    return apiClient.get('/team/standings').then(extractData);
  },
  addTeam(team) {
    return apiClient.post('/team', team);
  },
  updateTeamPoints(team) {
    return apiClient.put(`/team/${team.id}`, team);
  },
  getTeamDetails(id) {
    return apiClient.get(`/team/${id}`).then(extractData);
  },
  login(email, password) {
    return apiClient.post('/login', { email, password }).then(extractData);
  },
  setAuthToken(token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  removeAuthToken() {
    delete apiClient.defaults.headers.common['Authorization'];
  },
};