import React from 'react'
import { FlatList, Image, SafeAreaView, Text, View } from 'react-native'

import { useSelector, useDispatch } from 'react-redux';

function Character() {
  // const globalSearchValue = useSelector((state) => state.searchItems.globalSearchValue);
  const { characterSearchResult, characterSearchPageInfo } = useSelector((state) => state.searchItems);

  // console.log(globalSearchValue);
  console.log(characterSearchResult, characterSearchPageInfo)

  //
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", padding: 15, paddingLeft: 10, paddingRight: 10, borderBottomColor: DarkTheme.other, borderBottomWidth: 1, marginLeft: 10, marginRight: 10 }}>
      <Image
        source={item.image.medium}
        style={{ height: 80, width: 50 }}
      />

      <View style={{ paddingLeft: 5, paddingRight: 5 }}>
        <Text style={{ color: DarkTheme.description, marginBottom: 5,  }}>{item.name.full}</Text>
        <Text style={{ color: DarkTheme.other, marginBottom: 5, width: "60%", flexDirection:"column" }}>
          {item.name.alternative.length > 0 ? item.name.alternative.map(names => <Text key={names} style={{marginRight: 5}}>{names}</Text>): null}
          </Text>

        {/* <View style={{ flexDirection: "row" }}>
          <Image
            source={require('../../../assets/love.png')}
            style={{ height: 20, width: 20 }}
          />
          <Text style={{ color: DarkTheme.description }}>{item.popularity}</Text>
        </View> */}

        {/* <View style={{ flexDirection: "row" }}>
          <Image
            source={require('../../../assets/star.png')}
            style={{ height: 18, width: 18 }}
          />
          <Text style={{ color: DarkTheme.description }}>{item.meanScore}</Text>
        </View> */}
      </View>
    </View>
  )

  return (
    <View>

      {characterSearchResult.length > 0
        ?
        (
          <SafeAreaView>
            <FlatList
              // style={styles.flatList}
              horizontal={false}
              data={characterSearchResult}
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

export default Character