import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Mi from 'react-native-vector-icons/MaterialIcons'

import { Home } from './components/Views/Home';
import { Show } from './components/Views/Show';
import { Season } from './components/Views/Season';
import { Favorite } from './components/Views/Favorite';

import { DbContext } from './components/DbContext';

const Stack = createNativeStackNavigator()

export default function App() {

  const db = React.useContext(DbContext)

  React.useEffect(() => {
    db.transaction(tx => tx.executeSql('CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY)'))
  }, [])

  return (
    <NavigationContainer>
      <DbContext.Provider value={db}>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={Home}
            options={({ navigation }) => ({
              headerRight: () => <Mi name="favorite" size={40} color={'#555'} onPress={() => navigation.navigate('Favoris')} />
            })}
          />
          <Stack.Screen
            name='Show'
            component={Show}
            options={() => ({
              headerTitleStyle: { fontWeight: 'bold' }
            })}
          />
          <Stack.Screen
            name='Season'
            component={Season}
          />
          <Stack.Screen
            name='Favoris'
            component={Favorite}
          />
        </Stack.Navigator>
      </DbContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
