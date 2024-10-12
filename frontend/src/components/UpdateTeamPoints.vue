<template>
  <div class="update-team-points d-flex flex-column h-100">
    <form @submit.prevent="updateTeamPoints" class="needs-validation flex-grow-1 d-flex flex-column" novalidate>
      <div class="mb-3">
        <label for="team_id" class="form-label">Team Name</label>
        <select 
          v-model="selectedTeamId" 
          class="form-select" 
          id="team_id" 
          required
          @change="onTeamSelect"
        >
          <option value="" disabled>Select a team</option>
          <option v-for="team in teams" :key="team.id" :value="team.id">
            {{ team.team_name }}
          </option>
        </select>
      </div>
      
      <div class="mb-3">
        <label for="points" class="form-label">Points</label>
        <input 
          v-model.number="team.points" 
          type="number" 
          class="form-control" 
          id="points" 
          placeholder="Enter new points" 
          min="0"
          required
        >
      </div>

      <div class="mb-3">
        <label for="wins" class="form-label">Wins</label>
        <input 
          v-model.number="team.wins" 
          type="number" 
          class="form-control" 
          id="wins" 
          placeholder="Enter number of wins" 
          min="0"
          required
        >
      </div>

      <div class="mb-3">
        <label for="podiums" class="form-label">Podiums</label>
        <input 
          v-model.number="team.podiums" 
          type="number" 
          class="form-control" 
          id="podiums" 
          placeholder="Enter number of podiums" 
          min="0"
          required
        >
      </div>
      
      <div class="mt-auto">
        <button type="submit" class="btn btn-primary w-100">
          <font-awesome-icon :icon="['fas', 'sync-alt']" class="me-2" />
          Update Team Stats
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  data() {
    return {
      selectedTeamId: '',
      team: {
        id: '',
        team_name: '',
        points: 0,
        wins: 0,
        podiums: 0,
      },
      teams: [],
    };
  },
  async mounted() {
    try {
      const response = await api.getTeams();
      this.teams = response.data.teams;
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  },
  methods: {
    async onTeamSelect() {
      if (this.selectedTeamId) {
        try {
          const response = await api.getTeamDetails(this.selectedTeamId);
          this.team = response.data.teamDetails;
        } catch (error) {
          console.error('Error fetching team details:', error);
        }
      }
    },
    async updateTeamPoints() {
      try {
        await api.updateTeamPoints(this.team);
        this.$emit('points-updated');
        this.resetForm();
      } catch (error) {
        console.error('Error updating team stats:', error);
      }
    },
    resetForm() {
      this.selectedTeamId = '';
      this.team = {
        id: '',
        team_name: '',
        points: 0,
        wins: 0,
        podiums: 0,
      };
    }
  },
};
</script>

<style scoped>
.update-team-points {
  max-width: 500px;
  margin: 0 auto;
}

.form-control:focus,
.form-select:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>