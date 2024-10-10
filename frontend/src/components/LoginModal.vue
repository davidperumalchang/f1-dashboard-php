<template>
  <div class="modal" tabindex="-1" role="dialog" style="display: block; background-color: rgba(0,0,0,0.5);">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Admin Login</h5>
        </div>
        <div class="modal-body">
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input v-model="email" type="email" class="form-control" id="email" required>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input v-model="password" type="password" class="form-control" id="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import api from '@/services/api';

export default {
  name: 'LoginModal',
  emits: ['login-success', 'login-error'],
  setup(props, { emit }) {
    const email = ref('');
    const password = ref('');

    const login = async () => {
      try {
        const response = await api.login(email.value, password.value);
        localStorage.setItem('token', response.data.token);
        emit('login-success');
      } catch (error) {
        console.error('Login error:', error);
        emit('login-error', error.response?.data?.message || 'Login failed');
      }
    };

    return { email, password, login };
  }
};
</script>
