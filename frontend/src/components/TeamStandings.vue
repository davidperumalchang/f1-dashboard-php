<template>
  <div>
    <h2 class="mb-4">Team Standings</h2>
    <div class="row g-4">
      <div v-for="(team, index) in teams" :key="team.id">
        <div class="card h-100">
          <div class="card-header">
            <h5 class="card-title mb-0">
              #{{ index + 1 }} {{ team.team_name }}
            </h5>
          </div>
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">Points: {{ team.points }}</h6>
            <p class="card-text">
              Wins: {{ team.wins || 0 }}<br>
              Podiums: {{ team.podiums || 0 }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  data() {
    return {
      teams: [],
    };
  },
  async mounted() {
    try {
      const response = await api.getTeamStandings();
      this.teams = response.data.teamStandings;
    } catch (error) {
      console.error('Error fetching team standings:', error);
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  }
};
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style>