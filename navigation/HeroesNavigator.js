import React, { useContext } from 'react';
// Navigation Imports
import { createStackNavigator } from '@react-navigation/stack';
import HeroesScreen from '../screens/HeroesScreen';
// UI Imports
import { ThemeContext } from '../data/ThemeContext';
import { Icon } from 'react-native-elements';
import { getIconTheme } from '../constants/Themes';

const HeroesStack = createStackNavigator();

export default HeroesNavigator = () => {

    const [colorScheme, setColorScheme] = useContext(ThemeContext);

    return (
        <HeroesStack.Navigator>
            <HeroesStack.Screen name="HeroesStack" options={{
                headerLeft: () => {
                    return (<Icon name='grid' type='ionicon' color={getIconTheme(colorScheme)} size={30} containerStyle={{ marginLeft: 20 }} />)
                },
                headerTitleAlign: 'center',
                headerStyle: { elevation: 0, shadowOpacity: 0 },
                headerTitle: 'Heroes'
            }}
            component={HeroesScreen} />
        </HeroesStack.Navigator>
    )
};