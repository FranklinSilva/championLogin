import React from 'react';
import {createSwitchNavigator}  from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Welcome from './pages/welcome';
import Champion from './pages/champion';


export const Main = createStackNavigator({
    Welcome: {
      screen: Welcome,
    },
    Champion: {
      screen: Champion
    },
});

export const createRootNavigator = () => {

    return createSwitchNavigator({
        Main: {
          screen: Main
        },
      },
      {
        initialRouteName: "Main"
      },
    );
  };
