<template>
  <div class="add-team d-flex flex-column h-100">
    <form @submit.prevent="addTeam" class="needs-validation flex-grow-1 d-flex flex-column" novalidate>
      <div class="mb-3">
        <label for="team_name" class="form-label">Team Name</label>
        <input 
          v-model="team.team_name" 
          type="text" 
          class="form-control" 
          id="team_name" 
          placeholder="e.g. Red Bull Racing" 
          required
        >
      </div>
      
      <div class="mb-3">
        <label for="points" class="form-label">Points</label>
        <input 
          v-model.number="team.points" 
          type="number" 
          class="form-control" 
          id="points" 
          placeholder="0" 
          min="0"
          required
        >
      </div>
      
      <div class="mb-3">
        <label for="wins" class="form-label">Wins</label>
        <input 
          v-model="team.wins" 
          type="number" 
          class="form-control" 
          id="wins" 
          placeholder="0" 
          min="0"
          required
        >
      </div>
      
      <div class="mb-3">
        <label for="podiums" class="form-label">Podiums</label>
        <input 
          v-model="team.podiums" 
          type="number" 
          class="form-control" 
          id="podiums" 
          placeholder="0"
          min="0"
          required
        >
      </div>
      
      <div class="mt-auto">
        <button type="submit" class="btn btn-primary w-100">
          <font-awesome-icon :icon="['fas', 'plus-circle']" class="me-2" />
          Add Team
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
      team: {
        team_name: '',
        points: 0,
        wins: 0,
        podiums: 0,
      },
    };
  },
  methods: {
    async addTeam() {
      try {
        await api.addTeam(this.team);
        this.$emit('team-added');
        this.resetForm();
      } catch (error) {
        console.error('Error adding team:', error);
      }
    },
    resetForm() {
      this.team = {
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
.add-team {
  max-width: 500px;
  margin: 0 auto;
}

.form-control:focus {
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