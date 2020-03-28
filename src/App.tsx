import React from 'react';
import './App.css';
import { Grommet, Box, Grid } from 'grommet';
import { Header } from './components/layout/Header';
import { Map } from './components/layout/Map/Map';
import { Task } from './components/layout/Tasks/Task';

const tasks = [
    {
        date: Date(),
        description: "I have a dog who eats mad treats yo.",
        id: "23542345",
        pictureUrl: "https://via.placeholder.com/75",
        title: "Need Dog Treats",
        userName: "astro1986",
        location: "Tempe, AZ"
    },
    {
        date: Date(),
        description: "I poop alot",
        id: "23542345",
        pictureUrl: "https://via.placeholder.com/75",
        title: "TP Please",
        userName: "plum1986",
        location: "Gilbert, AZ"
    },
    {
        date: Date(),
        description: "I love ice cream.",
        id: "23542345",
        pictureUrl: "https://via.placeholder.com/75",
        title: "Ice Cream",
        userName: "ice1986",
        location: "Mesa, AZ"
    },
    {
        date: Date(),
        description: "I need my meds picked up",
        id: "23542345",
        pictureUrl: "https://via.placeholder.com/75",
        title: "Need Medicine",
        userName: "doctor1986",
        location: "Tempe, AZ"
    },
    {
        date: Date(),
        description: "My power is out and i need a flash light",
        id: "23542345",
        pictureUrl: "https://via.placeholder.com/75",
        title: "Flashlight needed",
        userName: "lamp1986",
        location: "Tempe, AZ"
    }
]

function App() {
  return (
    <Grommet className="App" full>
        <Header />
        <Box flex direction="row" className="appWrapper">
            <Box width="large">
                {tasks.map(task => 
                    <Task
                        date={task.date}
                        description={task.description}
                        id={task.id}
                        pictureUrl={task.pictureUrl}
                        title={task.title}
                        userName={task.userName}
                        location={task.location}
                    />
                )}                
            </Box>
            <Box fill background="green">
                <Map />
            </Box>
        </Box>
    </Grommet>
  );
}

export default App;
