<template>
  <div class="add-event d-flex flex-column h-100">
    <form @submit.prevent="addEvent" class="needs-validation flex-grow-1 d-flex flex-column" novalidate>
      <div class="mb-3">
        <label for="eventName" class="form-label">Event Name</label>
        <input 
          v-model="event.eventName" 
          type="text" 
          class="form-control" 
          id="eventName" 
          placeholder="e.g. Monaco Grand Prix" 
          required
        >
      </div>
      
      <div class="mb-3">
        <label for="eventDate" class="form-label">Event Date</label>
        <input 
          v-model="event.eventDate" 
          type="date" 
          class="form-control" 
          id="eventDate" 
          required
        >
      </div>
      
      <div class="mb-3">
        <label for="circuitName" class="form-label">Circuit Name</label>
        <input 
          v-model="event.circuitName" 
          type="text" 
          class="form-control" 
          id="circuitName" 
          placeholder="e.g. Circuit de Monaco" 
          required
        >
      </div>
      
      <div class="mb-3">
        <label for="location" class="form-label">Location</label>
        <input 
          v-model="event.location" 
          type="text" 
          class="form-control" 
          id="location" 
          placeholder="e.g. Monte Carlo" 
          required
        >
      </div>
      
      <div class="mb-3">
        <label for="country" class="form-label">Country</label>
        <input 
          v-model="event.country" 
          type="text" 
          class="form-control" 
          id="country" 
          placeholder="e.g. Monaco" 
          required
        >
      </div>
      
      <div class="mt-auto">
        <button type="submit" class="btn btn-primary w-100">
          <font-awesome-icon :icon="['fas', 'plus-circle']" class="me-2" />
          Add Event
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
      event: {
        eventName: '',
        eventDate: '',
        circuitName: '',
        location: '',
        country: '',
      },
    };
  },
  methods: {
    async addEvent() {
      try {
        await api.addEvent(this.event);
        this.$emit('event-added');
        this.resetForm();
      } catch (error) {
        console.error('Error adding event:', error);
      }
    },
    resetForm() {
      this.event = {
        eventName: '',
        eventDate: '',
        circuitName: '',
        location: '',
        country: '',
      };
    }
  },
};
</script>

<style scoped>
.add-event {
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