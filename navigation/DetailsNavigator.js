import React, { useContext } from 'react';
// Navigation Imporrts
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from '../screens/DetailsScreen';
// UI Imports
import { ThemeContext } from '../data/ThemeContext';
import { Icon } from 'react-native-elements';
import { getIconTheme } from '../constants/Themes';

const DetailsStack = createStackNavigator();

export default DetailsNavigator = () => {

    const [colorScheme, setColorScheme] = useContext(ThemeContext);

    return (
        <DetailsStack.Navigator>
            <DetailsStack.Screen name="DetailsStack" options={{
                headerLeft: () => {
                    return (<Icon name='stats-chart' type='ionicon' color={getIconTheme(colorScheme)} size={30} containerStyle={{ marginLeft: 20 }} />)
                },
                headerTitleAlign: 'center',
                headerStyle: { elevation: 0, shadowOpacity: 0 },
                headerTitle: 'Details',
                headerTransparent: true
            }}
            component={DetailsScreen} />
        </DetailsStack.Navigator>
    )
};