export function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor(((ms % 3600000) % 60000) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export const calculateTotalTaskTime = (startDateTime, lastendDateTime) => {
    const startTime = new Date(startDateTime);
    const endTime = new Date(lastendDateTime);
    const timeDifference = endTime - startTime;
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return formattedTime;
};

export const calculateTotalAllTaskTime = (tasklist) => {
    const timeStringToSeconds = (timeString) => {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    };

    let totalSeconds;
    let totalTime;
    totalSeconds = tasklist && tasklist.reduce((total, task) => {
        if (task.totalTaskTime != null) {
            const taskTime = task?.totalTaskTime;
            const taskSeconds = timeStringToSeconds(taskTime);
            return total + taskSeconds;
        }
    }, 0);

    if (totalSeconds === "NaN:NaN:NaN") {
        totalSeconds = '00:00:00'
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        totalTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    } else {

    }
    console.log('totalTime', totalTime)
    return totalTime;
};

