import React, { useState } from 'react'
import { Dimensions, Image, Modal, StyleSheet, Switch, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native'

import { useSelector, useDispatch } from 'react-redux';

import { searchAnimeCharacterApi, searchAnimeIdApi, searchAnimePageApi } from '../../apis/search/animeApi';
import { searchCharacterPageApi } from '../../apis/search/characterApi';
import { searchCharacterApi, searchCharacterExtraApi } from '../../apis/search/searchApi';
import { setAnimeSearchPageInfo, setAnimeSearchResult, setCharacterSearchPageInfo, setCharacterSearchResult, setGlobalSearchValue, setIsAnimeDetailsOpen, setIsCharacterSearchEnabled } from '../../redux/slicers/SearchSlice';
import Anime from '../page_components/SearchComponents/Anime';
import Character from '../page_components/SearchComponents/Character';
import AnimeDetails from './AnimeDetails';

function Search() {
  const { isCharacterSearchEnabled, isAnimeDetailsOpen } = useSelector((state) => state.searchItems);
  const dispatch = useDispatch();

  // toggel between character and anime
  const toggleSwitch = () => dispatch(setIsCharacterSearchEnabled(!isCharacterSearchEnabled));

  // search value
  const [searchValue, setSearchValue] = useState('');

  const searchHandler = () => {
    if (searchValue) {
      console.log(searchValue)

      if (isCharacterSearchEnabled) {
        // character
        searchCharacterPageApi(JSON.stringify(searchValue))
          .then(res => {
            dispatch(setCharacterSearchResult(res.Page.characters));
            dispatch(setCharacterSearchPageInfo(res.Page.pageInfo));
            console.log(res)
          })
          .catch(err => console.log(err));
      } else {
        // anime
        searchAnimePageApi(JSON.stringify(searchValue))
          .then(res => {
            dispatch(setAnimeSearchResult(res.Page.media));
            dispatch(setAnimeSearchPageInfo(res.Page.pageInfo));
            // console.log(res)
          })
          .catch(err => console.log(err));
      }
    }

    dispatch(setGlobalSearchValue(searchValue));
  }

  // 
  const closeAnimeDetails = () => dispatch(setIsAnimeDetailsOpen(false));

  return (
    <View style={styles.container}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isAnimeDetailsOpen}
        onRequestClose={() => {
          dispatch(setIsAnimeDetailsOpen(!isAnimeDetailsOpen));
        }}
      >
        {
          isCharacterSearchEnabled
            ?
            null
            :
            <AnimeDetails closeAnimeDetails={closeAnimeDetails} isSearchEnable={true} />
        }

      </Modal>


      <View style={{ width: "100%", justifyContent: "space-between", flexDirection: "row", padding: 10 }}>

        <Text style={{ color: DarkTheme.other }}>{isCharacterSearchEnabled ? "Character" : "Anime"}</Text>

        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isCharacterSearchEnabled ? "blue" : "orange"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isCharacterSearchEnabled}
        />
      </View>

      <View>

        <TextInput
          style={styles.input}
          onChangeText={setSearchValue}
          value={searchValue}
          autoFocus={true}
          placeholderTextColor={DarkTheme.other}
          placeholder="eg. Naruto"
        />

        <TouchableOpacity onPress={() => searchHandler()}>
          <Image
            source={require('../../assets/search_white.png')}
            style={{ width: 24, height: 24, position: "absolute", right: 20, bottom: 20 }}
          />
        </TouchableOpacity>

      </View>

      <View>
        {isCharacterSearchEnabled ? <Character /> : <Anime />}
      </View>


    </View>
  )
}

const DarkTheme = {
  title: "yellow",
  description: "white",
  background: "black",
  other: "#C0C0C0",
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: DarkTheme.background,
    paddingTop: 20,
    minHeight: Dimensions.get('window').height - 40,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: DarkTheme.description,
    borderBottomColor: DarkTheme.title,
    borderRadius: 5,
  },
});

export default Search