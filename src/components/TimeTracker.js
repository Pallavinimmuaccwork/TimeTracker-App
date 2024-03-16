// TimeTracker.js
import React, { useEffect, useState } from 'react';
import { Backdrop, Card, CardContent, TextField, Typography } from '@mui/material';
import { Button } from 'react-bootstrap';
import TaskCard from './taskcart/TaskCard';
import { calculateTotalAllTaskTime } from '../helper/functions';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const TimeTracker = ({ setTotalTaskTime }) => {
    const [tasklist, setTasklist] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false);
    const [taskName, setTaskName] = useState('');

    const addTask = () => {
        setShowAddTask(true);
    };

    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value);
    };

    const handleSaveTask = () => {
        setTasklist(prevTasks => [
            ...prevTasks,
            {
                id: prevTasks.length + 1,
                taskName,
                startDateTime: null,
                lastendDateTime: null,
                totalTaskTime: null,
                history: [],
            }
        ]);
        setShowAddTask(false);
        setTaskName('');
    };

    const handleClearTask = (taskId) => {
        setTasklist(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    useEffect(() => {
        const time = calculateTotalAllTaskTime(tasklist);
        setTotalTaskTime(time)
    }, [tasklist]);

    return (
        <div>
            {tasklist.map(task => (
                <TaskCard key={task.id} data={task} setTasklist={setTasklist} handleClearTask={handleClearTask} />
            ))}
 <Typography  component="div" sx={{ mb: 2, marginTop: "250px",fontSize:'20px' }}>Click here to add Tasks</Typography>
           
           <AddCircleIcon sx={{ fontSize: 40, marginLeft: '20px',  color: "blue" }} onClick={addTask} />

            {showAddTask && (
                <Backdrop open={true} sx={{ zIndex: 2, color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 3, width: '650px', borderRadius: '25px' }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', padding: "40px" }}>
                            <Typography  component="div" sx={{ mb: 2,fontSize:'20px' }}>Enter Task Name</Typography>
                            <TextField label="Task Name" variant="outlined" sx={{ mb: 2 }} value={taskName} onChange={handleTaskNameChange} />
                           <Button variant="contained" size="small" style={{ fontSize: '12px', backgroundColor: '#5056ED',width:'80px'}} onClick={handleSaveTask}>Save</Button>




                        </CardContent>
                    </Card>
                </Backdrop>
            )}
        </div>
    );
}

export default TimeTracker;
