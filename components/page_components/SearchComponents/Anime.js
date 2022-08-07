import React from 'react'
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

import { useSelector, useDispatch } from 'react-redux';
import { setAnimeInfoID } from '../../../redux/slicers/AnimeDetailsSlice';
import { setIsAnimeDetailsOpen } from '../../../redux/slicers/SearchSlice';

function Anime() {
  const dispatch = useDispatch();
  // const globalSearchValue = useSelector((state) => state.searchItems.globalSearchValue);
  const { animeSearchResult, animeSearchPageInfo } = useSelector((state) => state.searchItems);

  // console.log(globalSearchValue);
  console.log(animeSearchResult, animeSearchPageInfo)

  // animeDetails
  const openAnimeDetails = (id) => { dispatch(setAnimeInfoID(id)); dispatch(setIsAnimeDetailsOpen(true)); };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openAnimeDetails(item.id)}>
      <View style={{ flexDirection: "row", padding: 15, paddingLeft: 10, paddingRight: 10, borderBottomColor: DarkTheme.other, borderBottomWidth: 1, marginLeft: 10, marginRight: 10 }}>
        <Image
          source={item.coverImage.medium}
          style={{ height: 80, width: 50 }}
        />

        <View style={{ paddingLeft: 5, paddingRight: 5 }}>
          <Text style={{ color: DarkTheme.description, marginBottom: 5, width: "80%" }}>{item.title.english ? item.title.english : item.title.romaji}</Text>

          <View style={{ flexDirection: "row" }}>
            <Image
              source={require('../../../assets/love.png')}
              style={{ height: 20, width: 20 }}
            />
            <Text style={{ color: DarkTheme.description }}>{item.popularity}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Image
              source={require('../../../assets/star.png')}
              style={{ height: 18, width: 18 }}
            />
            <Text style={{ color: DarkTheme.description }}>{item.meanScore}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View>

      {animeSearchResult.length > 0
        ?
        (
          <SafeAreaView>
            <FlatList
              // style={styles.flatList}
              horizontal={false}
              data={animeSearchResult}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        )
        :
        <Text style={{ color: DarkTheme.other, textAlign: "center" }}>no result found</Text>
      }

    </View>
  )
}

const DarkTheme = {
  title: "yellow",
  description: "white",
  background: "black",
  other: "#C0C0C0",
}

export default Anime