<template>
  <div class="live-updates">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div class="container">
        <span class="navbar-brand">
          <font-awesome-icon :icon="['fas', 'flag-checkered']" class="me-2" />F1 Live Updates
        </span>
        <button @click="goToDashboard" class="btn btn-outline-light">
          <font-awesome-icon :icon="['fas', 'home']" class="me-2" />Dashboard
        </button>
      </div>
    </nav>

    <div class="container">
      <LiveRaceUpdates />
    </div>
  </div>
</template>

<script>
import { onBeforeRouteLeave } from 'vue-router';
import LiveRaceUpdates from '@/components/LiveRaceUpdates.vue';

export default {
  name: 'LiveUpdates',
  components: {
    LiveRaceUpdates
  },
  methods: {
    goToDashboard() {
      // window.eventSource.close();
      window.eventSource = null;
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.live-updates {
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
</style>
