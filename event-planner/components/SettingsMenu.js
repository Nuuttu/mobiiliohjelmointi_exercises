import React from 'react';
import { createStackNavigator} from'@react-navigation/stack';
import Settings from './Settings';
import More from './More';
import MapPage from './MapPage';

const Stack = createStackNavigator();

function SettingsMenu() {

  return(
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Settings} />
      <Stack.Screen name="More" component={More} />
      <Stack.Screen name="MapView" component={MapPage} />
    </Stack.Navigator>
  );
}

export default SettingsMenu;