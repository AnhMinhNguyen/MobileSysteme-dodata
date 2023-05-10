import React, { useContext } from 'react';
// Navigation Imports
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/SettingsScreen';
// UI Imports
import { ThemeContext } from '../data/ThemeContext';
import { Icon } from 'react-native-elements';
import { getIconTheme } from '../constants/Themes';

const SettingsStack = createStackNavigator();

export default SettingsNavigator = () => {

    const [colorScheme, setColorScheme] = useContext(ThemeContext);

    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="SettingsStack" options={{
                headerLeft: () => {
                    return (<Icon name='settings-sharp' type='ionicon' color={getIconTheme(colorScheme)} size={30} containerStyle={{ marginLeft: 20 }} />)
                },
                headerTitleAlign: 'center',
                headerStyle: { elevation: 0, shadowOpacity: 0 },
                headerTitle: 'Settings'
            }}
            component={SettingsScreen} />
        </SettingsStack.Navigator>
    )
};