<template>
  <div class="live-race-updates">
    <h2 class="title">{{ raceData?.raceInfo.status === 'Finished' ? 'Race Results' : 'Live Race Updates' }}</h2>
    <div v-if="raceData" class="race-content">
      <div class="race-info">
        <h3>{{ raceData.raceInfo.name }}</h3>
        <div class="race-stats">
          <div class="stat">
            <span class="label">Laps:</span>
            <span class="value">{{ raceData.raceInfo.currentLap }} / {{ raceData.raceInfo.totalLaps }}</span>
          </div>
          <div class="stat">
            <span class="label">Duration:</span>
            <span class="value">{{ raceData.raceInfo.elapsedTime }}</span>
          </div>
          <div class="stat">
            <span class="label">Status:</span>
            <span class="value" :class="{ 'finished': raceData.raceInfo.status === 'Finished' }">
              {{ raceData.raceInfo.status }}
            </span>
          </div>
        </div>
      </div>
      <div v-if="raceData.raceInfo.status !== 'Finished'" class="leaderboard">
        <h4>Current Standings</h4>
        <table>
          <thead>
            <tr>
              <th>Pos</th>
              <th>Driver</th>
              <th>Team</th>
              <th>Gap</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(driver, index) in raceData.leaderboard" :key="driver.driverId">
              <td>{{ driver.position }}</td>
              <td>{{ driver.driverName }}</td>
              <td>{{ driver.team }}</td>
              <td>{{ index === 0 ? 'Leader' : `+${(index * 2.5).toFixed(1)}s` }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="race-finished">
        <h4>Final Results</h4>
        <div class="podium">
          <div class="podium-place second">
            <div class="driver">{{ raceData.leaderboard[1].driverName }}</div>
            <div class="position">2nd</div>
          </div>
          <div class="podium-place first">
            <div class="driver">{{ raceData.leaderboard[0].driverName }}</div>
            <div class="position">1st</div>
          </div>
          <div class="podium-place third">
            <div class="driver">{{ raceData.leaderboard[2].driverName }}</div>
            <div class="position">3rd</div>
          </div>
        </div>
        <table class="final-results">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Driver</th>
              <th>Team</th>
              <th>Time / DNF</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="driver in raceData.leaderboard" :key="driver.driverId">
              <td>{{ driver.position }}</td>
              <td>{{ driver.driverName }}</td>
              <td>{{ driver.team }}</td>
              <td>{{ driver.finishTime || 'DNF' }}</td>
            </tr>
          </tbody>
        </table>
        <p class="next-race">Stay tuned for the next race!</p>
      </div>
    </div>
    <div v-else class="loading">
      <p>Waiting for race data...</p>
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue';

export default {
  name: 'LiveRaceUpdates',
  setup() {
    const raceData = ref(null);
    let eventSource = null;

    const closeEventSource = () => {
      if (eventSource) {
        console.log('Closing EventSource');
        eventSource.close();
        eventSource = null;
      }
    };

    onMounted(() => {
      console.log('Mounting component');
      eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/liveupdate`);

      eventSource.onmessage = (event) => {
        console.log('Received message:', event.data);
        try {
          raceData.value = JSON.parse(event.data);
        } catch (error) {
          console.error('Error parsing race data:', error);
        }
      };

      eventSource.onerror = (error) => {
        console.error('EventSource failed:', error);
        closeEventSource();
      };
    });

    watch(() => raceData.value?.raceInfo.status, (newStatus) => {
      if (newStatus === 'Finished') {
        closeEventSource();
      }
    });

    onUnmounted(() => {
      closeEventSource();
    });

    return {
      raceData
    };
  }
};
</script>

<style scoped>
.live-race-updates {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.race-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.race-info, .leaderboard, .race-finished {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.race-info h3 {
  margin-top: 0;
  color: #2c3e50;
}

.race-stats {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.stat {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.9em;
  color: #666;
}

.value {
  font-size: 1.2em;
  font-weight: bold;
  color: #2c3e50;
}

.finished {
  color: #e74c3c;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

th, td {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
  color: #333;
}

.podium {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 200px;
  margin-bottom: 30px;
}

.podium-place {
  width: 100px;
  text-align: center;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-top: none;
  padding: 10px;
}

.podium-place.first {
  height: 170px;
  background-color: #ffd700;
}

.podium-place.second {
  height: 140px;
  background-color: #c0c0c0;
}

.podium-place.third {
  height: 110px;
  background-color: #cd7f32;
}

.driver {
  font-weight: bold;
  margin-bottom: 5px;
}

.position {
  font-size: 1.2em;
  font-weight: bold;
}

.final-results {
  margin-top: 30px;
}

.next-race {
  text-align: center;
  font-style: italic;
  margin-top: 20px;
}

.loading {
  text-align: center;
  padding: 20px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>