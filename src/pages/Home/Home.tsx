import React, { FC } from 'react';
import { Box } from 'grommet';
import { TaskList } from '../../components/Tasks/TaskList';
import { Map } from '../../components/Map/Map';
import css from './Home.module.scss';

export const Home: FC = () => {
  return (    
    <Box flex direction="row" className={css.appWrapper}>
        <Box className={css.sidebar} width="large">
            <TaskList page={1} />                
        </Box>
        <Box fill background="green">
            <Map />
        </Box>
    </Box>
  );
}