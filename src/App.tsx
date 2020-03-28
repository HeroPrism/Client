import React from 'react';
import css from './App.module.scss';
import { Grommet, Box } from 'grommet';
import { Header } from './components/Layout/Header';
import { Map } from './components/Map/Map';
import { TaskList } from './components/Tasks/TaskList';

const theme = {
    global: {
        colors: {
            "primary": "#03A5FC",
            "secondary": "#6F94BC",
            "tertiary": "#E6F4F1",
            "neutral": "#F4FAFF",
            "red": "#FA7651"
        }
    }
}

function App() {
  return (
    <Grommet theme={theme} className="App" full>
        <Header />
        <Box flex direction="row" className={css.appWrapper}>
            <Box className={css.sidebar} width="large">
                <TaskList />                
            </Box>
            <Box fill background="green">
                <Map />
            </Box>
        </Box>
    </Grommet>
  );
}

export default App;
