<template>
  <div>
    <h2 class="mb-4">Event Schedule</h2>
    <div class="row g-4">
      <div v-for="event in events" :key="event.id">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ event.event_name }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ formatDate(event.event_date) }}</h6>
            <p class="card-text">
              {{ event.circuit_name }}, {{ event.location }}, {{ event.country }}
            </p>
          </div>
          <div class="card-footer text-muted">
            {{ getDaysUntilEvent(event.event_date) }}
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
      events: [],
    };
  },
  async mounted() {
    try {
      const response = await api.getEventSchedule();
      this.events = response.data.eventSchedule;
    } catch (error) {
      console.error('Error fetching event schedule:', error);
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    getDaysUntilEvent(dateString) {
      const eventDate = new Date(dateString);
      const today = new Date();
      const diffTime = eventDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 0) {
        return 'Event has passed';
      } else if (diffDays === 0) {
        return 'Event is today!';
      } else {
        return `${diffDays} day${diffDays !== 1 ? 's' : ''} until event`;
      }
    }
  }
};
</script>

<style scoped>
.card-footer {
  font-size: 0.9em;
}
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style>