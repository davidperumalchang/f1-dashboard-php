<template>
  <div class="dashboard">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div class="container">
        <span class="navbar-brand">
          <font-awesome-icon :icon="['fas', 'flag-checkered']" class="me-2" />F1 Dashboard
        </span>
        <button @click="handleAdminClick" class="btn btn-outline-light">
          <font-awesome-icon :icon="['fas', 'cog']" class="me-2" />Admin Panel
        </button>
      </div>
    </nav>

    <div class="container">
      <div class="row">
        <div class="col-md-6 mb-4">
          <div class="card shadow h-100 dashboard-card">
            <div class="card-header bg-danger text-white d-flex justify-content-between align-items-center">
              <h5 class="card-title mb-0">
                <font-awesome-icon :icon="['fas', 'calendar-plus']" class="me-2" />Event Schedule
              </h5>
            </div>
            <div class="card-body">
              <EventSchedule />
            </div>
          </div>
        </div>
        
        <div class="col-md-6 mb-4">
          <div class="card shadow h-100 dashboard-card">
            <div class="card-header bg-success text-white d-flex justify-content-between align-items-center">
              <h5 class="card-title mb-0">
                <font-awesome-icon :icon="['fas', 'trophy']" class="me-2" />Team Standings
              </h5>
            </div>
            <div class="card-body">
              <TeamStandings />
            </div>
          </div>
        </div>
      </div>
    </div>

    <LoginModal v-if="showLoginModal" @login-success="onLoginSuccess" @login-error="onLoginError" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginModal from '@/components/LoginModal.vue';
import EventSchedule from '@/components/EventSchedule.vue';
import TeamStandings from '@/components/TeamStandings.vue';
import api from '@/services/api';

export default {
  name: 'Dashboard',
  components: {
    LoginModal,
    EventSchedule,
    TeamStandings,
  },
  setup() {
    const router = useRouter();
    const showLoginModal = ref(false);

    const handleAdminClick = () => {
      const token = localStorage.getItem('token');
      if (token) {
        router.push('/admin');
      } else {
        showLoginModal.value = true;
      }
    };

    const onLoginSuccess = () => {
      showLoginModal.value = false;
      router.push('/admin');
    };

    const onLoginError = (errorMessage) => {
      alert(errorMessage);
    };

    return {
      showLoginModal,
      handleAdminClick,
      onLoginSuccess,
      onLoginError,
    };
  },
};
</script>

<style scoped>
.dashboard {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.navbar {
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.dashboard-card {
  transition: transform 0.3s, box-shadow 0.3s;
  border: none;
  border-radius: 10px;
  overflow: hidden;
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0,0,0,.1);
}

.card-header {
  font-weight: bold;
  padding: 1rem;
}

.card-body {
  padding: 1.5rem;
  transition: max-height 0.3s ease-out;
  overflow: hidden;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
}
</style>