import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Activities from './Screens/Activities';
import Diet from './Screens/Diet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppProvider } from './context/AppContext';
import AddActivity from './Screens/AddActivity';
import AddDietEntry from './Screens/AddDietEntry';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Activities"
        component={Activities}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bicycle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Diet"
        component={Diet}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fast-food-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="AddActivity" component={AddActivity} options={{ title: 'Add Activity' }} />
          <Stack.Screen name="AddDietEntry" component={AddDietEntry} options={{ title: 'Add Diet Entry' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
