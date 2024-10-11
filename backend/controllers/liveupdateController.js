const driverController = require('./driverController');
const teamController = require('./teamController');

// API ROUTES

// Get live update
exports.getLiveUpdate = async (req, res) => {
    console.log('Live update requested');

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    // Initialize race data
    await initializeRaceData();

    // Send initial data
    res.write(`data: ${JSON.stringify(raceData)}\n\n`);

    // Update and send race data every 5 seconds
    const interval = setInterval(async () => {
        await updateRaceData();
        
        res.write(`data: ${JSON.stringify(raceData)}\n\n`);

        // Check if the race has ended
        if (raceData.raceInfo.status === 'Finished') {
            clearInterval(interval);
            res.end();
            return;
        }
    }, 5000);

    // Close the connection when the client disconnects
    req.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval);
        res.end();
    });
};

// END API ROUTES

// HELPER FUNCTIONS

let raceData = {
    raceInfo: {
        name: "Monaco Grand Prix",
        currentLap: 0,
        totalLaps: 4,
        elapsedTime: "00:00:00",
        status: "In Progress"
    },
    leaderboard: []
};

let raceStartTime = Date.now(); // Store the race start time. For mocking purposes

async function initializeRaceData() {
    let leaderboardData = [
        { driverId: 1, position: 1},
        { driverId: 2, position: 2},
        { driverId: 3, position: 3},
        { driverId: 4, position: 4},
        { driverId: 5, position: 5},
        { driverId: 6, position: 6},
        { driverId: 7, position: 7},
        { driverId: 8, position: 8},
        { driverId: 9, position: 9},
        { driverId: 10, position: 10},
    ]

    raceData.leaderboard = await Promise.all(leaderboardData.map(async (entry) => {
        let driver = await driverController.getDriverById(entry.driverId);
        let team = await teamController.getTeamById(driver.team_id);
        return {
            driverId: entry.driverId,
            position: entry.position,
            driverName: driver.driver_name,
            team: team.team_name,
            finishTime: null
        };
    }));
    
    // Update elapsed time based on the race start time
    const elapsedMilliseconds = Date.now() - raceStartTime;
    raceData.raceInfo.elapsedTime = formatElapsedTime(elapsedMilliseconds);
}

async function updateRaceData() {
    let updatedPositions = await fetchUpdatedPositions();
    
    raceData.leaderboard.forEach(driver => {
        let updatedInfo = updatedPositions.find(u => u.driverId === driver.driverId);
        if (updatedInfo) {
            driver.position = updatedInfo.position;
        }
    });

    raceData.leaderboard.sort((a, b) => a.position - b.position);
    raceData.raceInfo.currentLap += 1;
    
    // Update elapsed time based on the race start time
    const elapsedMilliseconds = Date.now() - raceStartTime;
    raceData.raceInfo.elapsedTime = formatElapsedTime(elapsedMilliseconds);

    // Check if the race has finished
    if (raceData.raceInfo.currentLap > raceData.raceInfo.totalLaps) {
        raceData.raceInfo.status = "Finished";
        raceData.raceInfo.currentLap = raceData.raceInfo.totalLaps; // Ensure currentLap doesn't exceed totalLaps
        
        // Set finish times for all drivers
        raceData.leaderboard.forEach((driver, index) => {
            // Simulate finish times (leader's time plus some seconds for each position behind)
            driver.finishTime = formatElapsedTime(elapsedMilliseconds + index * 2000);
        });
    }
}

async function fetchUpdatedPositions() {

    let leaderboardData = raceData.leaderboard;
    let driverCount = leaderboardData.length;

    // Create an array of positions from 1 to driverCount
    let positions = Array.from({length: driverCount}, (_, i) => i + 1);
    
    // Shuffle the positions array
    for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    
    // Assign shuffled positions to drivers
    leaderboardData.forEach((driver, index) => {
        driver.position = positions[index];
    });

    return leaderboardData;
}

function formatElapsedTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    return `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
}

// END HELPER FUNCTIONS