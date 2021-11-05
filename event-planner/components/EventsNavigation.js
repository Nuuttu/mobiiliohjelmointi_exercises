import React from 'react';
import { createStackNavigator} from'@react-navigation/stack';
import More from './More';
import MapPage from './MapPage';
import Events from './Events';
import EventView from './EventView';

const Stack = createStackNavigator();

function EventsNavigation() {

  return(
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Events} />
      <Stack.Screen name="More" component={More} />
      <Stack.Screen name="MapView" component={MapPage} />
      <Stack.Screen name="EventView" component={EventView} />
    </Stack.Navigator>
  );
}

export default EventsNavigation;