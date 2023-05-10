import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  useWindowDimensions,
  Image
} from 'react-native';
// UI Imports
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from '../data/ThemeContext';
import {
  getBackgroundTheme,
  getTextTheme,
  getLightEntryTheme,
  getStatusBarTheme
} from '../constants/Themes';
import ListText from '../components/ListText';
import GridTile from "../components/HeroesTile";
// Data Imports
import { HEROES_STRENGTH } from '../data/heroes-list';
import { HEROES_AGILITY } from '../data/heroes-list';
import { HEROES_INTELLIGENCE } from '../data/heroes-list';
import { HeroNameContext } from '../data/HeroNameContext';
import { HeroIconContext } from '../data/HeroIconContext';
import { HeroIdContext } from '../data/HeroIdContext';
import { HeroDataContext } from '../data/HeroDataContext';

const heroesStrengthList = HEROES_STRENGTH;
const heroesAgilityList = HEROES_AGILITY;
const heroesIntelligenceList = HEROES_INTELLIGENCE;

const STRATZ_API_KEY = 'https://api.stratz.com/graphql?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJodHRwczovL3N0ZWFtY29tbXVuaXR5LmNvbS9vcGVuaWQvaWQvNzY1NjExOTgwMzEyMzM1MTEiLCJ1bmlxdWVfbmFtZSI6IlNjaG1hcmNpIiwiU3ViamVjdCI6ImQ2MzFhMzM5LWNkMmQtNDBjOC1iZWRjLWM0MzEyMzA4Mzg3MiIsIlN0ZWFtSWQiOiI3MDk2Nzc4MyIsIm5iZiI6MTY0NDg1MDY5NywiZXhwIjoxNjc2Mzg2Njk3LCJpYXQiOjE2NDQ4NTA2OTcsImlzcyI6Imh0dHBzOi8vYXBpLnN0cmF0ei5jb20ifQ.aFYrEIp7aRNCZEul1k1C1WHrUEa5f7HvG9yGbCYJDNA';

const day = new Date().getDate();
const month = new Date().getMonth() + 1;

const ITEM_QUERY  = `
{
  constants{
    items{
      id
      displayName
      image
    }
  }
}
`

export default HeroesScreen = ({ navigation }) => {

  // Contexts
  const [clickedHeroName, setClickedHeroName] = useContext(HeroNameContext);
  const [clickedHeroIcon, setClickedHeroIcon] = useContext(HeroIconContext);
  const [clickedHeroId, setClickedHeroId] = useContext(HeroIdContext);
  const [colorScheme, setColorScheme] = useContext(ThemeContext);
  const [heroData, setHeroData] = useContext(HeroDataContext);

  // UI Variables
  const window = useWindowDimensions();
  const percentHeight = window.height / 100;
  const percentWidth = window.width / 100;

  useEffect(() => {
    fetch(STRATZ_API_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: ITEM_QUERY, variables: {} })
    })
    .then((response) => response.json())
    .then((json) => setHeroData(json))
    .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.wrapper} backgroundColor={getBackgroundTheme(colorScheme)}>
      <View style={[styles.attributeTitle, { paddingTop: 6 }]}>
        <Image
          style={{ width: 5.5 * percentWidth, height: 5.5 * percentWidth, marginHorizontal: 1.5 * percentWidth }}
          source={require('../assets/attribute_icons/hero_strength.png')}
        />
        <ListText style={{ color: getTextTheme(colorScheme), fontSize: 2.5 * percentHeight }}>Strength</ListText>
      </View>

      <FlatList
        data={heroesStrengthList}
        renderItem={(itemData) => {
          return (
            <GridTile
              style={{ backgroundColor: getLightEntryTheme(colorScheme), color: getTextTheme(colorScheme) }}
              styleContainer={{ width: window.width * 0.22, height: window.width * 0.35 }}
              source={itemData.item.icon}
              //text={itemData.item.title}
              onClick={() => {
                setClickedHeroId(itemData.item.id);  
                setClickedHeroIcon(itemData.item.icon);
                setClickedHeroName(itemData.item.title);
                navigation.navigate("Details");
              }}
              id={itemData.item.id}
            />
          );
        }}
        numColumns={4}
      />
      <View style={styles.attributeTitle}>
        <Image
          style={{ width: 5.5 * percentWidth, height: 5.5 * percentWidth, marginHorizontal: 1.5 * percentWidth }}
          source={require('../assets/attribute_icons/hero_agility.png')}
        />
        <ListText style={{ color: getTextTheme(colorScheme), fontSize: 2.5 * percentHeight }}>Agility</ListText>
      </View>

      <FlatList
        data={heroesAgilityList}
        renderItem={(itemData) => {
          return (
            <GridTile
              style={{ backgroundColor: getLightEntryTheme(colorScheme), color: getTextTheme(colorScheme) }}
              styleContainer={{ width: window.width * 0.22, height: window.width * 0.35 }}
              source={itemData.item.icon}
              onClick={() => {
                setClickedHeroIcon(itemData.item.icon);
                setClickedHeroName(itemData.item.title);
                setClickedHeroId(itemData.item.id);                
                navigation.navigate("Details");
              }}
              id={itemData.item.id}
            />
          );
        }}
        numColumns={4}
      />
      <View style={styles.attributeTitle}>
        <Image
          style={{ width: 5.5 * percentWidth, height: 5.5 * percentWidth, marginHorizontal: 1.5 * percentWidth }}
          source={require('../assets/attribute_icons/hero_intelligence.png')}
        />
        <ListText style={{ color: getTextTheme(colorScheme), fontSize: 2.5 * percentHeight }}>Intelligence</ListText>
      </View>
      
      <FlatList
        data={heroesIntelligenceList}
        renderItem={(itemData) => {
          return (
            <GridTile
              style={{ backgroundColor: getLightEntryTheme(colorScheme), color: getTextTheme(colorScheme) }}
              styleContainer={{ width: window.width * 0.22, height: window.width * 0.35 }}
              source={itemData.item.icon}
              onClick={() => {
                setClickedHeroIcon(itemData.item.icon);
                setClickedHeroName(itemData.item.title);     
                setClickedHeroId(itemData.item.id);             
                navigation.navigate("Details");
              }}
              id={itemData.item.id}
            />
          );
        }}
        numColumns={4}
      />
      <StatusBar style={getStatusBarTheme(colorScheme)} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'column',
    flex: 1
  },
  attributeTitle: {
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5
  },
  attributeIcon: {
    width: 20,
    height: 20,
    paddingHorizontal: 5
  }
});
