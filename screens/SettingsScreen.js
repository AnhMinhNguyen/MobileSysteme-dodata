import React, { useContext } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// UI Imports
import { ThemeContext } from '../data/ThemeContext';
import logo from '../assets/stratz-logo2.png';
import { StatusBar } from 'expo-status-bar';
import {
    getBackgroundTheme,
    getStatusBarTheme,
    getRimTheme,
    getDarkEntryTheme,
    getLightEntryTheme,
    getTextTheme,
    getIconTheme,
    getBorderTheme
} from '../constants/Themes';
import EntryText from '../components/EntryText';
import ListText from '../components/ListText';
import { Ionicons } from '@expo/vector-icons';

export default SettingsScreen = props => {

    const [colorScheme, setColorScheme] = useContext(ThemeContext);
    
    return (
        <View style={styles.wrapper} backgroundColor={getBackgroundTheme(colorScheme)}>
            <View style={[styles.appearance, { borderColor: getBorderTheme(colorScheme), backgroundColor: getRimTheme(colorScheme) }]}>
                <View style={[styles.titleView, { backgroundColor: getRimTheme(colorScheme) }]}>
                    <EntryText style={{fontSize: 25, color: getTextTheme(colorScheme)}}>APPEARANCE</EntryText>
                </View>
                <View style={[styles.entry, {backgroundColor: getLightEntryTheme(colorScheme)}]}>
                    <TouchableOpacity
                        onPress={() => setColorScheme('daylight')}
                        style={styles.touchableOpacityStyle}
                    >
                        <Ionicons name="sunny" size={24} color={getIconTheme(colorScheme)} style={styles.iconStyle} />
                        <ListText style={{ color: getTextTheme(colorScheme), fontSize: 20 }}>Daylight</ListText>
                    </TouchableOpacity>
                </View>
                <View style={[styles.entry, {backgroundColor: getDarkEntryTheme(colorScheme)}]}>
                    <TouchableOpacity
                        onPress={() => setColorScheme('twilight')}
                        style={styles.touchableOpacityStyle}
                    >
                        <Ionicons name="star-half-sharp" size={24} color={getIconTheme(colorScheme)} style={styles.iconStyle} />
                        <ListText style={{ color: getTextTheme(colorScheme), fontSize: 20 }}>Twilight</ListText>
                    </TouchableOpacity>
                </View>
                <View style={[styles.entry, {backgroundColor: getLightEntryTheme(colorScheme), borderBottomLeftRadius: 1, borderBottomRightRadius: 1}]}>
                    <TouchableOpacity
                        onPress={() => setColorScheme('midnight')}
                        style={styles.touchableOpacityStyle}
                    >
                        <Ionicons name="moon" size={24} color={getIconTheme(colorScheme)} style={styles.iconStyle} />
                        <ListText style={{ color: getTextTheme(colorScheme), fontSize: 20 }}>Midnight</ListText>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 7, marginVertical: 20, justifyContent: 'center' }}>
                <View style={[styles.buttonStyle, { backgroundColor: getLightEntryTheme(colorScheme), borderColor: getBorderTheme(colorScheme) }]}>
                    <TouchableOpacity
                        onPress={() => AsyncStorage.clear()}
                        style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}
                    >
                        <ListText style={{ color: getTextTheme(colorScheme), fontSize: 20 }}>Click to clear Cache</ListText>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={styles.container}>
                <Image source={logo} style={{ resizeMode: "center" }} />
            </View>
            <StatusBar style={getStatusBarTheme(colorScheme)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    wrapper: {
        height: '100%',
        flex: 1,
        flexDirection: 'column'
    },
    appearance: {
        flex: 10,
        borderRadius: 4,
        borderWidth: 3,
        marginTop: '10%',
        width: '93%',
        alignSelf: 'center'
    },
    titleView: {
        flex: 1,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchableOpacityStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%'
    },
    entry: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconStyle: {
        marginLeft: '5%',
        marginRight: '5%'
    },
    buttonStyle: {
        alignSelf: 'center',
        width: '93%', //93
        height: '40%',
        borderRadius: 4, //4
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center'
    }
});