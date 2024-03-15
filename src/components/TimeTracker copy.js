import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';

export default function TimeTracker() {
    const [showTaskCard, setShowTaskCard] = React.useState(false);
    const [showTimerCard, setShowTimerCard] = React.useState(false);
    const [taskName, setTaskName] = React.useState('');
    const [timerRunning, setTimerRunning] = React.useState(false);
    const [startTime, setStartTime] = React.useState(null);
    const [elapsedTime, setElapsedTime] = React.useState(0);
    const [totalTime, setTotalTime] = React.useState(0);
    const [tasks, setTasks] = React.useState([]);
    // const [totalTime, setTotalTime] = React.useState(0);

    const handleAddTaskClick = () => {
        setShowTaskCard(true);
    };

    const handleSaveTask = () => {
        if (taskName.trim() !== '') {
            localStorage.setItem('taskName', taskName);
            setShowTimerCard(true); // Show the timer card when a task is saved
        }
        setShowTaskCard(false);
    };

    const handleClearTask = () => {
        setShowTaskCard(false);
        setShowTimerCard(false);
        setTaskName('');
        setTimerRunning(false);
        setStartTime(null);
        setElapsedTime(0);
        setTotalTime(0); // Also reset total time if necessary
        setTasks([]); // Clear tasks array
    };

    const handleTaskNameChange = (event) => {
        setTaskName(event.target.value);
    };
console.log("test");
    const handleStartTimer = () => {
        setTimerRunning(true);
        setStartTime(Date.now() - elapsedTime);
    };

    const handleStopTimer = () => {
        setTimerRunning(false);
        setStartTime(Date.now() - elapsedTime);
    };

    React.useEffect(() => {
        let timer;
        if (timerRunning) {
            timer = setInterval(() => {
                setElapsedTime(+ startTime);
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [timerRunning, startTime]);


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', height: '70px' }}>
                <Toolbar>
                    <AccessTimeFilledIcon sx={{ fontSize: 40, marginLeft: '90px' }} />
                    <Typography variant="h3" component="div" sx={{ flexGrow: 1, marginRight: "1000px" }}>
                        Time Tracker
                    </Typography>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1, marginRight: "50px" }}>
                        Total Time Spent: {formatTime(totalTime)}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ p: 2 }}> {/* Add spacing to separate AppBar and Card */}
                {/* Main card for task */}
                <Card sx={{ width: "1200px", marginLeft: "280px", marginTop: '30px', borderRadius: '25px', position: 'relative', zIndex: 1 }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: 35, marginRight: 'auto' }} color="text.secondary" gutterBottom>
                            Adding animations to the website
                        </Typography>
                        <Typography sx={{ fontSize: 35, marginRight: '100px', color: 'grey' }} color="text.secondary" gutterBottom>
                            |
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, mb: 1 }}>
                            <Typography sx={{ fontSize: 25, marginTop: '10px' }} color="text.secondary" gutterBottom>
                                {formatTime(elapsedTime)}
                            </Typography>
                            <CardActions sx={{ ml: 2 }}>
                                {timerRunning ? (
                                    <Button variant="contained" color="primary" sx={{ mr: 1, borderRadius: '25px' }} onClick={handleStopTimer}>Stop</Button>
                                ) : (
                                    <Button variant="contained" color="primary" sx={{ mr: 1, borderRadius: '25px' }} onClick={handleStartTimer}>Start</Button>
                                )}
                                {/* <IconButton sx={{ mr: 1, color: "grey" }} onClick={handleClearTask}><ClearIcon /></IconButton> */}
                            </CardActions>
                        </Box>
                    </CardContent>
                    <CardContent>
                        <Typography sx={{ fontSize: 25, marginRight: "1200px" }} color="text.secondary" gutterBottom>
                            History
                        </Typography>
                        <Typography sx={{ fontSize: 15, marginRight: "800px", whiteSpace: 'nowrap' }} color="text.secondary" gutterBottom>
                            No History Found, Please click on 'Start' to track the timer.
                        </Typography>
                    </CardContent>
                </Card>
                {/* Big grey card that overlaps the main card */}
                {showTaskCard && (
                    <Backdrop open={true} sx={{ zIndex: 2, color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 3, width: '650px', borderRadius: '25px' }}>
                            {/* Card for entering task name */}
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', padding: "40px" }}>
                                <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                                    Enter Task Name
                                </Typography>
                                <TextField label="Task Name" variant="outlined" sx={{ mb: 2 }} onChange={handleTaskNameChange} />
                                <Button variant="contained" color="primary" sx={{ width: '100px' }} onClick={handleSaveTask}>Save</Button>
                            </CardContent>
                        </Card>
                    </Backdrop>
                )}
                {/* Timer card */}
                {showTimerCard && (
                    <Card sx={{ width: "1200px", marginLeft: "280px", marginTop: '30px', borderRadius: '25px', position: 'relative', zIndex: 1 }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: 35, marginRight: 'auto' }} color="text.secondary" gutterBottom>
                                {taskName}
                            </Typography>
                            <Typography sx={{ fontSize: 25, marginRight: 'auto', marginTop: '80px' }} variant="h5" component="div">
                                History:
                            </Typography>
                            <Typography sx={{ fontSize: 15, marginRight: 'auto', marginTop: '100px' }} variant="body1" component="div">
                                {timerRunning ? (
                                    <>
                                        Started the Timer at: {new Date(startTime).toLocaleString()} (Active)
                                    </>
                                ) : (

                                    <>
                                        {console.log(startTime, 'start---------------')}
                                        {console.log(elapsedTime, 'stop---------------')}

                                        {startTime && `Started the Timer at: ${new Date(startTime).toLocaleString()}`}
                                        {elapsedTime && `Stopped the Timer at: ${new Date(elapsedTime).toLocaleString()}`}
                                    </>
                                )}
                            </Typography>
                            <Typography sx={{ fontSize: 35, marginRight: '100px', color: 'grey' }} color="text.secondary" gutterBottom>
                                |
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, mb: 1 }}>
                                <Typography sx={{ fontSize: 25, marginTop: '10px' }} color="text.secondary" gutterBottom>
                                    {formatTime(elapsedTime)}
                                </Typography>

                                <CardActions sx={{ ml: 2 }}>
                                    <Button variant="contained" color="primary" sx={{ mr: 1, borderRadius: '25px' }} onClick={handleStopTimer}>Stop</Button>
                                    {/* <IconButton sx={{ mr: 1, color: "grey" }} onClick={handleClearTask}><ClearIcon /></IconButton> */}
                                </CardActions>
                            </Box>
                        </CardContent>
                    </Card>
                )}
                {/* "+" icon button */}
                <AddCircleIcon onClick={handleAddTaskClick} sx={{ fontSize: 40, marginLeft: '1000px', marginTop: "50px", color: "blue" }} />
            </Box>
        </Box>
    );
}

// Utility function to format time in HH:MM:SS format
function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor(((ms % 3600000) % 60000) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// React.useEffect(() => {
//     let totalTimeSpent = 0;
//     tasks.forEach((task) => {
//         if (task.startTime && task.stopTime) {
//             totalTimeSpent += task.stopTime - task.startTime;
//         }
//     });
//     setTotalTime(totalTimeSpent);
// }, [tasks]);
//i want when we click on start button timer should get start and that time should be shown in another card
// import React from 'react';
// import Header from './assets/Header-1.png';
// import Card from './assets/Card - 1.png';
// import Card2 from './assets/Card - 2.png';
// import Fab from './assets/Fab.png';
// import Rectangle from './assets/Rectangle 7.png';
// import Rectangle6 from './assets/Rectangle 6.png';
// import Enter from './assets/Enter the Task Name.png';
// import Rectangle5 from './assets/Rectangle 5.png';
// import sbutton from './assets/button.png';
// import { useState } from 'react';

// const TimeTracker = () => {
//     const [showRectangle, setShowRectangle] = useState(false);
//      const [taskName, setTaskName] = useState('');
//     const handleAddButtonClick = () => {
//         setShowRectangle(true);
//     };
//     const handleInputChange = (event) => {
//         setTaskName(event.target.value);
//     };
//     return (
//         <div
//             style={{
//                 position: 'relative',
//                 width: '1000px',
//                 height: '1000px',
//                 margin: 'auto',
//                 textAlign: 'center',
//             }}
//         >
//             <img src={Header} alt="Header" />
//             <img src={Card} alt="Card" style={{ position: 'relative', zIndex: 1 }} />
//             <img src={Card2} alt="Card" style={{ position: 'relative', zIndex: 1 }} />
//             <img
//                 src={Fab}
//                 alt="Fab"
//                 style={{ marginBottom:'400px',position: 'absolute', left: '90%', bottom: '20px', transform: 'translateX(-50%)', zIndex: 2 }}
//                 onClick={handleAddButtonClick}
//             />
//             {showRectangle && (
//                 <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 3 }}>
//                     <img src={Rectangle5} alt="Rectangle 5" style={{ position: 'absolute', top: '0', left: '0', zIndex: 4 }} />
//                     <img src={Rectangle6} alt="Rectangle 6" style={{ position: 'absolute', top: '50px', left: '50px', zIndex: 4 }} />
//                     <img src={Enter} alt="Enter" style={{ position: 'absolute', top: '100px', left: '100px', zIndex: 4 }} />
//                     <img src={Rectangle} onChange={handleInputChange} alt="Rectangle" style={{ position: 'absolute', top: '150px', left: '100px', zIndex: 4 }} />
//                     <img src={sbutton} alt="sbutton" style={{ position: 'absolute', top: '220px', left: '100px', zIndex: 4 }} />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TimeTracker;










{/* <Card className='p-3'>
                <div className='d-flex jystify-content-center align-items-center' >
                    <div>
                        <h2>Task Name</h2>
                        <h5>History :</h5>
                        <p>Time Spent</p>

                    </div>
                    <div>
                        <div>00:00:00</div>
                        <div>
                            <button>start</button>
                        </div>
                        <div>
                            X
                        </div>
                    </div>
                </div>
            </Card> */}















