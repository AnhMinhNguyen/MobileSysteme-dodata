import React, { useContext } from 'react';
// Navigation Imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HeroesNavigator from './HeroesNavigator';
import DetailsNavigator from './DetailsNavigator';
import SettingsNavigator from './SettingsNavigator';
// UI Imports
import { ThemeContext } from '../data/ThemeContext';
import { getTheme, getIconTheme } from '../constants/Themes';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const Tab = createBottomTabNavigator();

export default MainNavigator = () => {

    const [colorScheme, setColorScheme] = useContext(ThemeContext);

    return (
        <NavigationContainer theme={getTheme(colorScheme)}>
            <Tab.Navigator
                initialRouteName = "Heroes"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Heroes") {
                            if (Platform.OS === 'android') {
                                iconName = focused ? 'grid' : 'grid-outline';
                            } else if (Platform.OS === 'ios') {
                                iconName = focused ? 'ios-grid' : 'ios-grid-outline';
                            }
                        } else if (route.name === "Details") {
                            if (Platform.OS === 'android') {
                                iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                            } else if (Platform.OS === 'ios') {
                                iconName = focused ? 'ios-stats-chart' : 'ios-stats-chart-outline';
                            }
                        } else if (route.name === "Settings") {
                            if (Platform.OS === 'android') {
                                iconName = focused ? 'settings-sharp' : 'settings-outline';
                            } else if (Platform.OS === 'ios') {
                                iconName = focused ? 'ios-settings-sharp' : 'ios-settings-outline';
                            }
                        }
                        return <Ionicons name={iconName} size={size} color={color} />
                    }
                })}
                tabBarOptions={{
                    activeTintColor: Colors.logoLightBlue,
                    inactiveTintColor: getIconTheme(colorScheme),
                    showLabel: false,
                    //style: { height: 55 }
                }}
            >
                <Tab.Screen name="Details" component={DetailsNavigator} />
                <Tab.Screen name="Heroes" component={HeroesNavigator} />
                <Tab.Screen name="Settings" component={SettingsNavigator} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}