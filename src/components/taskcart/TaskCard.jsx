import React, { useState, useEffect } from 'react';
import { Box, Button, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import { Card } from 'react-bootstrap';
import { calculateTotalTaskTime, formatTime } from '../../helper/functions';

const TaskCard = ({ data, handleClearTask, setTasklist }) => {
    const { id, taskName, history, startDateTime, lastendDateTime, totalTaskTime } = data;

    const [isRunning, setIsRunning] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1000);
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    const handleStartTimer = () => {
        const startTime = new Date();
        setIsRunning(true);
        if (!startDateTime) {
            setTasklist(prevTasks => prevTasks.map(task => {
                return task.id === id ? { ...task, startDateTime: startTime.toLocaleString() } : task;
            }));
        }

        setStartTime(startTime);
        data.history.push(`Started the timer at: ${startTime.toLocaleString()}`);
    };


    const handleStopTimer = () => {
        setIsRunning(false);
        const endTime = new Date();
        if (endTime > startTime) {


            const totalTaskTime = calculateTotalTaskTime(startDateTime, endTime.toLocaleString());
            console.log(totalTaskTime); // Output: "00:00:12"
            setTasklist(prevTasks => prevTasks.map(task => {
                return task.id === id ? { ...task, lastendDateTime: endTime.toLocaleString(), totalTaskTime: totalTaskTime } : task;
            }));
        }
        const duration = endTime - startTime;
        const formattedDuration = formatTime(duration);
        data.history.push(`Started the timer at: ${startTime.toLocaleString()} & Stopped at: ${endTime.toLocaleString()} (Duration: ${formattedDuration})`);
    };

    return (
        <div>
            <Card sx={{ width: "1200px", marginLeft: "280px", marginTop: '30px', borderRadius: '25px', position: 'relative', zIndex: 1 }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 35, marginRight: 'auto' }} color="text.secondary" gutterBottom>
                        {taskName}
                    </Typography>
                    <Typography sx={{ fontSize: 25, marginRight: 'auto', marginTop: '80px' }} variant="h5" component="div">
                        History:
                    </Typography>
                    <Typography sx={{ fontSize: 15, marginRight: 'auto', marginTop: '100px' }} variant="body1" component="div">
                        {history.length === 0 && 'No History Found, Click on the start button to track the timer'}
                        {history.map((entry, index) => (
                            <div key={index}>{entry}</div>
                        ))}
                    </Typography>
                    <Typography sx={{ fontSize: 35, marginRight: '100px', color: 'grey' }} color="text.secondary" gutterBottom>
                        |
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, mb: 1 }}>
                        <Typography sx={{ fontSize: 25, marginTop: '10px' }} color="text.secondary" gutterBottom>
                            {formatTime(elapsedTime)}
                        </Typography>

                        <CardActions sx={{ ml: 2 }}>
                            {isRunning ? (
                                <Button variant="contained" color="primary" sx={{ mr: 1, borderRadius: '25px' }} onClick={handleStopTimer}>Stop</Button>
                            ) : (
                                <Button variant="contained" color="primary" sx={{ mr: 1, borderRadius: '25px' }} onClick={handleStartTimer}>Start</Button>
                            )}
                            <IconButton sx={{ mr: 1, color: "grey" }} onClick={() => handleClearTask(id)}>X</IconButton>
                        </CardActions>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}

export default TaskCard;
