document.getElementById('startButton').addEventListener('click', startTimer);

function startTimer() {
    const timeInput = document.getElementById('timeInput').value;
    let timeRemaining = parseInt(timeInput); // Convert input to a number
    const timerDisplay = document.getElementById('timerDisplay');

    if (isNaN(timeRemaining) || timeRemaining <= 0) {
        timerDisplay.innerText = "Please enter a valid number of seconds!";
        return;
    }

    // Clear previous interval if any
    let timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
            timerDisplay.innerText = `Time remaining: ${timeRemaining} seconds`;
            timeRemaining--;
        } else {
            timerDisplay.innerText = "Time's up!";
            clearInterval(timerInterval); // Stop the timer
        }
    }, 1000); // Update every 1000 milliseconds (1 second)
}

let repeatInterval; // To store the interval ID

document.getElementById('startRepeatButton').addEventListener('click', startNotifications);
document.getElementById('stopRepeatButton').addEventListener('click', stopNotifications);

function startNotifications() {
    const repeatNotificationDisplay = document.getElementById('repeatNotificationDisplay');
    
    repeatNotificationDisplay.innerText = "Notifications will appear every 3 seconds...";
    
    // Start the interval
    repeatInterval = setInterval(() => {
        alert("This is a repeated notification.");
    }, 3000); // Repeat every 3 seconds
}

function stopNotifications() {
    clearInterval(repeatInterval); // Stop the notifications
    const repeatNotificationDisplay = document.getElementById('repeatNotificationDisplay');
    repeatNotificationDisplay.innerText = "Notifications stopped.";
}
