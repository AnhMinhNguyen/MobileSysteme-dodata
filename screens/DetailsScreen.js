import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  View,
  useWindowDimensions,
  ImageBackground,
  Platform,
  Pressable,
  Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Item from '../models/item';
// UI Imports
import Constants from 'expo-constants';
import { useHeaderHeight } from '@react-navigation/stack';
import ListText from '../components/ListText';
import EntryText from '../components/EntryText';
import { StatusBar } from 'expo-status-bar';
import {
  getBackgroundTheme,
  getRimTheme,
  getDarkEntryTheme,
  getLightEntryTheme,
  getTextTheme,
  getHeaderTheme,
  getStatusBarTheme,
  getBorderTheme,
  getInfoIconTheme
} from '../constants/Themes';
import { ThemeContext } from '../data/ThemeContext';
import ListTile from '../components/ItemsTile';
import { Icon } from 'react-native-elements';
// Data Imports
import { HeroNameContext } from '../data/HeroNameContext';
import { HeroIconContext } from '../data/HeroIconContext';
import { HeroIdContext } from '../data/HeroIdContext';
import { HeroDataContext } from '../data/HeroDataContext';

const STRATZ_API_KEY = 'https://api.stratz.com/graphql?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJodHRwczovL3N0ZWFtY29tbXVuaXR5LmNvbS9vcGVuaWQvaWQvNzY1NjExOTgwMzEyMzM1MTEiLCJ1bmlxdWVfbmFtZSI6IlNjaG1hcmNpIiwiU3ViamVjdCI6ImQ2MzFhMzM5LWNkMmQtNDBjOC1iZWRjLWM0MzEyMzA4Mzg3MiIsIlN0ZWFtSWQiOiI3MDk2Nzc4MyIsIm5iZiI6MTY0NDg1MDY5NywiZXhwIjoxNjc2Mzg2Njk3LCJpYXQiOjE2NDQ4NTA2OTcsImlzcyI6Imh0dHBzOi8vYXBpLnN0cmF0ei5jb20ifQ.aFYrEIp7aRNCZEul1k1C1WHrUEa5f7HvG9yGbCYJDNA';

export default DetailsScreen = props => {

  // Contexts
  const [clickedHeroName, setClickedHeroName] = useContext(HeroNameContext);
  const [clickedHeroIcon, setClickedHeroIcon] = useContext(HeroIconContext);
  const [clickedHeroId, setClickedHeroId] = useContext(HeroIdContext);
  const [colorScheme, setColorScheme] = useContext(ThemeContext);
  const [heroData, setHeroData] = useContext(HeroDataContext);

  // API Variables
  const [isLoading, setIsLoading] = useState(true);
  
  const [unsortedItemArray, setUnsortedItemArray] = useState([]);
  const sortedItemArray = [];
  const itemsList = unsortedItemArray;
  const itemURL = "https://cdn.dota2.com/apps/dota2/images/items/";

  // UI Variables
  const [modalVisible, setModalVisible] = useState(false);

  const window = useWindowDimensions();
  const headerHeight = useHeaderHeight();

  // Date Check Variables
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const currentDate = day + '-' + month + '-' + year;
  
  useEffect(() => {
    setIsLoading(true);

    const ITEM_DATA_QUERY  = `
    {
      heroStats {
        itemFullPurchase(heroId:` + clickedHeroId + `) {
          heroId
          events {
            itemId
            count
            winsAverage
          }
        }
        stats(heroIds:` + clickedHeroId + `) {
          events {
            matchCount
          }
        }
      }
    }
    `

    const heroStatsHandler = async () => {
      try {
        let response = await fetch(STRATZ_API_KEY, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: ITEM_DATA_QUERY, variables: {} })
        });
        
        response = await response.json();

        setUnsortedItemArray([]);

        const responseLength = (response.data.heroStats.itemFullPurchase.events).length;
        const arrayTest = heroData.data.constants.items;

        for(let i = 0; i < responseLength; i++){
          let itemId = response.data.heroStats.itemFullPurchase.events[i].itemId;
          let itemCount = response.data.heroStats.itemFullPurchase.events[i].count;
          let matchCount = response.data.heroStats.stats[0].events[0].matchCount;
          let pickRate = (itemCount/matchCount * 100).toFixed(1);

          const index = arrayTest.findIndex(x => x.id == itemId);
          let itemName = arrayTest[index].displayName;
          let itemIcon = arrayTest[index].image;
          
          sortedItemArray.push(new Item(i, itemURL + itemIcon, itemName, pickRate));
          
        }
        
        sortedItemArray.sort((a, b) => {
          return b.pickRate - a.pickRate;
        });

        const storeData = async (value) => {
          try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(clickedHeroId, jsonValue);
            await AsyncStorage.setItem("date", currentDate);
          } catch (error) {
            console.log(error);
          }
        };

        const filteredItemArray = sortedItemArray.filter(item => item.pickRate > 2);
        setUnsortedItemArray(filteredItemArray);

        storeData(filteredItemArray);
         
      } catch (error) {
        console.log("error in heroStatsHandler: ", error);
      }
      setIsLoading(false);
    };

    const getStoredData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(clickedHeroId);
        if (jsonValue !== null) {
          const testValue = JSON.parse(jsonValue);
          setUnsortedItemArray(testValue);
         
        }
      } catch (error) {
        console.log(error);
      }
    };
      
    const checkDate = async () => {
      try {
        const check = await AsyncStorage.getItem(clickedHeroId);
        const dateCheck = await AsyncStorage.getItem("date");
        if (check == null || dateCheck != currentDate) {
          console.log("current date: " + currentDate + ", called date: " + dateCheck);
          console.log("storage was empty");
          heroStatsHandler();
        } else {
          console.log("storage was filled");
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
      getStoredData();
    };
    checkDate();
  }, [clickedHeroId]);

  return (
    <View style={styles.wrapper} backgroundColor={getBackgroundTheme(colorScheme)}>
      <View style={{ height: Constants.statusBarHeight }}/>

      <View style={styles.topContainer}>
        <ImageBackground
          source={clickedHeroIcon}
          rezizeMode='stretch'
          blurRadius={10}
          opacity={0.3}
          borderRadius={0}
          borderWidth={1}
          borderColor={getBorderTheme(colorScheme)}
          style={styles.backgroundImage}
        >
          <View style={{ height: headerHeight - Constants.statusBarHeight, backgroundColor: getHeaderTheme(colorScheme), opacity: 0.3, borderBottomWidth: 1, borderColor: getBorderTheme(colorScheme) }}/>

          <View style={styles.heroInfo}>
            <GridTile
              style={{ backgroundColor: getLightEntryTheme(colorScheme), color: getTextTheme(colorScheme) }}
              styleContainer={{ height: window.height * 0.15, width: window.height * 0.15 }}
              source={clickedHeroIcon}
              onClick={() => {}}
            />
              <Text style={{ color: getTextTheme(colorScheme), flex: 1, fontSize: 18, fontWeight: 'bold' }} >{clickedHeroName}</Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.bottomContainer}>
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={[styles.modalView, { backgroundColor: getRimTheme(colorScheme), borderColor: getBorderTheme(colorScheme) }]}>
            <View style={[styles.modalTitle, { backgroundColor: getLightEntryTheme(colorScheme) }]}>
              <EntryText style={{ fontWeight: 'bold', fontSize: 15, color: getTextTheme(colorScheme) }}>WHAT TO BUY?</EntryText>
            </View>
            <View style={styles.modalText}>
              <Text style={[styles.textMargin, { color: getTextTheme(colorScheme) }]}>There are over 140 items to choose from in Dota 2. Knowing what to buy when can be a challenge.</Text>
              <Text style={[styles.textMargin, { color: getTextTheme(colorScheme) }]}>In the Purchase Pattern, we show the most commonly picked items throughout all stages of the game.</Text>
            </View>
            <View style={[styles.okBox, { backgroundColor: getRimTheme(colorScheme), borderColor: getBorderTheme(colorScheme) }]}>
              <Pressable
              onPress={() => {
                setModalVisible(false);
              }}
              >
                <Text style={{ color: getTextTheme(colorScheme) }}>UNDERSTOOD</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <ImageBackground
            source={clickedHeroIcon}
            rezizeMode='stretch'
            blurRadius={10}
            opacity={0.3}
            style={[styles.purchasePattern, { borderColor: getBorderTheme(colorScheme) }]}
          >
            <Icon name={ Platform.OS == "android" ? 'information-circle' : Platform.OS == 'ios' ? 'ios-information-circle' : 'information-circle' } type='ionicon' color={getInfoIconTheme(colorScheme)} size={21} containerStyle={{ alignSelf: 'center', paddingHorizontal: 3, paddingRight: 6 }} />
            <ListText style={{ color: getTextTheme(colorScheme), fontWeight: 'bold', fontSize: 18 }}>Purchase Pattern</ListText>
          </ImageBackground>
        </Pressable>

        <View style={styles.listHeader} backgroundColor={getRimTheme(colorScheme)}>
          <ListText style={{ color: getTextTheme(colorScheme) }}>Item</ListText>
          <ListText style={{ color: getTextTheme(colorScheme) }}>Pick Rate</ListText>
        </View>

        { isLoading ? (<ActivityIndicator style={{ marginTop: 50 }} size={Platform.select({ ios: "large", android: 100 })} color={getTextTheme(colorScheme)} />) : (<View style={styles.flatListStyle}>
          <FlatList
            data={itemsList}
            renderItem={({item, index}) => {
              return (
                <ListTile
                  style={{ backgroundColor: index % 2 == 0 ? getLightEntryTheme(colorScheme) : getDarkEntryTheme(colorScheme), color: getTextTheme(colorScheme) }}
                  text1={item.icon}
                  text2={item.name}
                  text3={item.pickRate}
                  id={item.id}
                />
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>)}

      </View>
      <StatusBar style={getStatusBarTheme(colorScheme)} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    flex: 1
  },
  topContainer: {
    flex: 2,
    flexDirection: 'column'
  },
  bottomContainer: {
    flex: 5,
    alignSelf: 'center',
    width: '93%'
  },
  backgroundImage: {
    flex: 1,
    flexDirection: 'column'
  },
  heroInfo: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  purchasePattern: {
    flexDirection: 'row',
    minHeight: 20,
    padding: 5,
    width: '100%',
    alignItems: 'flex-start',
    alignSelf: 'center',
    borderRadius: 3,
    marginVertical: 10,
    borderWidth: 1
  },
  listHeader: {
    minHeight: 26,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: '7.5%',
    paddingLeft: '24%',
    alignItems: 'flex-end',
    alignSelf: 'center',
    borderRadius: 2
  },
  flatListStyle: {
    flex: 1,
    width: '100%',
    alignSelf: 'center'
  },
  textMargin: {
    marginBottom: 10,
    fontSize: 14
  },
  modalView: {
    marginTop: '60%',
    marginHorizontal: '3.5%',
    borderRadius: 3,
    borderWidth: 1,
    padding: 0,
    alignItems: "center",
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    width: '100%',
    padding: 8,
    paddingLeft: 14,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2
  },
  modalText: {
    paddingHorizontal: 8,
    paddingVertical: 6
  },
  okBox: {
    alignSelf: 'flex-end',
    padding: 7,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 4,
    borderWidth: 1
  }
});