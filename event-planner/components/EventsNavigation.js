import React from 'react';
import { createStackNavigator} from'@react-navigation/stack';
import More from './More';
import MapPage from './MapPage';
import Events from './Events';

const Stack = createStackNavigator();

function EventsNavigation() {

  return(
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Events} />
      <Stack.Screen name="More" component={More} />
      <Stack.Screen name="MapView" component={MapPage} />
    </Stack.Navigator>
  );
}

export default EventsNavigation;