import React from 'react';
import { createStackNavigator} from'@react-navigation/stack';
import More from './More';
import MapPage from './MapPage';
import Events from './Events';
import EventView from './EventView';
import EventCreateForm from './EventCreateForm';
import EventFormModal from './EventFormModal';
import MapSetCoordinates from './MapSetCoordinates';
import MapShowCoordinates from './MapShowCoordinates';

const Stack = createStackNavigator();

function EventsNavigation() {

  return(
    <Stack.Navigator
    screenOptions={{ headerStyle: { backgroundColor: 'papayawhip' } }} 
    >
      <Stack.Screen name="Main" component={Events} options={{header: () => null}}/>
      <Stack.Screen name="More" component={More} />
      <Stack.Screen name="EventCreateForm" component={EventCreateForm} />
      <Stack.Screen 
        name="MapView" 
        component={MapPage} 
        options={({ route }) => ({ 
          headerTitle: 'all events', 
          headerStyle: {
            backgroundColor: 'red',
          } 
        })} 
      />
      <Stack.Screen 
        name="MapSetCoordinates" 
        component={MapSetCoordinates} 
        options={({ route }) => ({ 
          headerTitle: 'Select place for the event', 
          headerStyle: {
            backgroundColor: 'red',
          } 
        })} 
      />
      <Stack.Screen 
        name="MapShowCoordinates" 
        component={MapShowCoordinates} 
        options={({ route }) => ({ 
          headerTitle: 'Event on map', 
          headerStyle: {
            backgroundColor: 'red',
          } 
        })} 
      />
      <Stack.Screen 
        name="EventView" 
        component={EventView} 
        options={({ route }) => ({
          headerTitle: route.params.name,
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          
        }) } 
      />
    </Stack.Navigator>
  );
}

export default EventsNavigation;