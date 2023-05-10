import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import MainNavigator from './navigation/MainNavigator';
// Context Imports
import { ThemeContext } from './data/ThemeContext';
import { HeroNameContext } from './data/HeroNameContext';
import { HeroIconContext } from './data/HeroIconContext';
import { HeroIdContext } from './data/HeroIdContext';
import { HeroDataContext } from './data/HeroDataContext';

export default function App() {

  let [fontsLoaded] = useFonts({
    "pragmatica-medium": require("./assets/fonts/PragmaticaMedium.otf")
  });

  const [colorScheme, setColorScheme] = useState('twilight');
  const [clickedHeroName, setClickedHeroName] = useState('');
  const [clickedHeroIcon, setClickedHeroIcon] = useState();
  const [clickedHeroId, setClickedHeroId] = useState();
  const [heroData, setHeroData] = useState();

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <HeroDataContext.Provider value={[heroData, setHeroData]}>
        <HeroIdContext.Provider value={[clickedHeroId, setClickedHeroId]}>
          <HeroIconContext.Provider value={[clickedHeroIcon, setClickedHeroIcon]}>
            <HeroNameContext.Provider value={[clickedHeroName, setClickedHeroName]}>
              <ThemeContext.Provider value={[colorScheme, setColorScheme]}>
                <MainNavigator />
              </ThemeContext.Provider>
            </HeroNameContext.Provider>
          </HeroIconContext.Provider>
        </HeroIdContext.Provider>
      </HeroDataContext.Provider>
    );
  }
}