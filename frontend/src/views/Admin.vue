<template>
  <div class="admin">

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div class="container">
        <span class="navbar-brand">
          <font-awesome-icon :icon="['fas', 'flag-checkered']" class="me-2" />
          <router-link to="/" class="text-decoration-none text-reset">F1 Dashboard</router-link>
        </span>
        <button v-if="isAuthenticated" @click="logout" class="btn btn-outline-light">
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="me-2" />Logout
        </button>
      </div>
    </nav>
    
    <h2 class="text-center mb-4">Admin Panel</h2>
    
    <div v-if="isAuthenticated" class="container">
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card shadow h-100">
            <div class="card-header bg-danger text-white">
              <h5 class="card-title mb-0">
                <font-awesome-icon :icon="['fas', 'calendar-plus']" class="me-2" />Add Event
              </h5>
            </div>
            <div class="card-body">
              <AddEvent />
            </div>
          </div>
        </div>
        
        <div class="col-md-4 mb-4">
          <div class="card shadow h-100">
            <div class="card-header bg-success text-white">
              <h5 class="card-title mb-0">
                <font-awesome-icon :icon="['fas', 'users']" class="me-2" />Add Team
              </h5>
            </div>
            <div class="card-body">
              <AddTeam />
            </div>
          </div>
        </div>
        
        <div class="col-md-4 mb-4">
          <div class="card shadow h-100">
            <div class="card-header bg-warning text-dark">
              <h5 class="card-title mb-0">
                <font-awesome-icon :icon="['fas', 'trophy']" class="me-2" />Update Team Points
              </h5>
            </div>
            <div class="card-body">
              <UpdateTeamPoints />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import LoginModal from '@/components/LoginModal.vue';
import api from '@/services/api';
import AddEvent from '@/components/AddEvent.vue';
import AddTeam from '@/components/AddTeam.vue';
import UpdateTeamPoints from '@/components/UpdateTeamPoints.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Admin',
  components: {
    AddEvent,
    AddTeam,
    UpdateTeamPoints,
  },
  setup() {
    const router = useRouter();
    const isAuthenticated = ref(false);

    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (token) {
        api.setAuthToken(token);
        isAuthenticated.value = true;
      } else {
        router.push('/');
      }
    };

    const logout = () => {
      localStorage.removeItem('token');
      api.removeAuthToken();
      isAuthenticated.value = false;
      router.push('/');
    };

    onMounted(checkAuth);

    return {
      isAuthenticated,
      logout,
    };
  },
};
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-header {
  font-weight: bold;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-text {
  font-size: 1.2rem;
  font-weight: bold;
}

.font-awesome-icon {
  font-size: 1.2rem;
}
</style>