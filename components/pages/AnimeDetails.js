import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Dimensions, Image } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import { animeInfoApi, animeRecomendationApi } from '../../apis/animeDetails/animeInfo';
import { searchAnimeCharacterApi } from '../../apis/search/animeApi';
import { setAnimeInfoID } from '../../redux/slicers/AnimeDetailsSlice';
import PageBar from '../page_components/HomeComp/PageBar';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


function AnimeDetails({ closeAnimeDetails, isSearchEnable = false }) {

  const animeID = useSelector((state) => state.animeInfo.animeInfoID);
  const dispatch = useDispatch();

  const scrollRef = useRef();

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }



  // console.log(animeID, "from redux");

  const [animeData, setAnimeData] = useState([]);
  const [recomemdedAnime, setRecomemdedAnime] = useState([]);

  const [characters, setCharacters] = useState([]);
  const [charactersPageInfo, setCharactersPageInfo] = useState([]);

  useEffect(() => {
    animeInfoApi(animeID)
      .then((data) => {
        setAnimeData([data.Media]);


        if (isSearchEnable) {
          searchAnimeCharacterApi(animeID)
            .then(res => {
              setCharacters(res.Media.characters.nodes)
              setCharactersPageInfo([res.Media.characters.pageInfo])
            })
            .catch(err => console.log(err))
        }


        animeRecomendationApi(animeID)
          .then((res) => { setRecomemdedAnime([res.Recommendation.mediaRecommendation]); console.log(res, "from reco") })
          .catch((err) => console.log(err))

      })
      .catch(err => console.log(err))
  }, [animeID])

  // debugging
  console.log(animeData)
  console.log(characters)
  console.log(charactersPageInfo)

  const dateConstructor = (date) => {
    console.log(date)
    let d = `${date.day}`;
    let m = `${date.month}`;
    let y = `${date.year}`;

    d = d.length < 2 ? ("0" + d) : d;
    m = m.length < 2 ? ("0" + m) : m;

    return d + "-" + m + "-" + y
  }

  const nextEpisodeConstructor = (data) => {

    let episode = data.episode;
    let airingAt = new Date(data.airingAt * 1000);

    let date = `${airingAt.getDate()}`.length < 2 ? `0${airingAt.getDate()}` : airingAt.getDate();
    let month = `${airingAt.getMonth() + 1}`.length < 2 ? `0${airingAt.getMonth() + 1}` : `${airingAt.getMonth() + 1}`;

    airingAt = `${date}-${month}-${airingAt.getFullYear()}`;

    return `episode ${episode} releasing on ${airingAt}`;

  }

  // character render setup
  const imageSize = 80;
  const numColumns = 3;
  const imageMargin = ((screenWidth / numColumns) - imageSize) / 2;

  //
  const openAnimeDetails = (id) => { console.log(id) }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openAnimeDetails(item.id)}>
      <View
        style={{ width: imageSize, margin: imageMargin }}
        onPress={() => console.log("gg")}
      >
        <Image
          source={{ uri: item.image.medium }}
          style={{ height: 130, width: imageSize, borderRadius: 10 }}
        />

        <Text style={{ fontSize: 14, textAlign: "center", color: DarkTheme.description }}>
          {item.name.full}
        </Text>

      </View>
    </TouchableOpacity>
  );

  // character page handler
  const pageHandler = (page) => {
    console.log(page);

    searchAnimeCharacterApi(animeID, page)
      .then((res) => {
        setCharacters(res.Media.characters.nodes)
        setCharactersPageInfo([res.Media.characters.pageInfo])
      })
      .catch((err) => console.log(err));
  }

  return (
    <View style={styles.container}>

      <ScrollView style={{ zindex: 100 }} ref={scrollRef}>
        {
          animeData.length > 0
            ?
            <View >

              <View>

                {/* banner image and cover image */}

                <Image
                  source={{ uri: animeData[0].bannerImage }}
                  style={{ height: 150, width: screenWidth, position: "absolute", left: 0, resizeMode: 'cover' }}
                />

                <Image
                  source={{ uri: animeData[0].coverImage.medium }}
                  style={{ height: 140, width: 90, borderRadius: 10, marginLeft: 10, position: "relative", top: 60 }}
                />

                {/* popularity ans rating */}

                <View
                  style={{ position: "absolute", top: 160, right: 10, alignItem: "right" }}
                >
                  <View style={{ flexDirection: "row", alignItem: "center", justifyContent: "end" }}>
                    <Text style={styles.popularity}>{animeData[0].averageScore}</Text>
                    <Image
                      source={require('../../assets/star.png')}
                      style={{ height: 24, width: 24 }}
                    />
                  </View>

                  <View style={{ flexDirection: "row", alignItem: "center", justifyContent: "end" }}>
                    <Text style={styles.popularity}>{animeData[0].popularity}</Text>
                    <Image
                      source={require('../../assets/love.png')}
                      style={{ height: 24, width: 24 }}
                    />
                  </View>
                </View>

              </View>

              <View style={styles.textDetailsContainer}>

                <Text style={styles.title}>{animeData[0].title.english ? animeData[0].title.english : animeData[0].title.romaji}</Text>
                <Text style={styles.description}>{animeData[0].description.replace(/i>/g, "").replace(/</g, "").replace(/<i>/g, "").replace(/br>/g, " ")}</Text>

                <Text style={styles.season}>Season  :  {animeData[0].season}</Text>
                <Text style={styles.episodes}>episodes  :  {animeData[0].episodes}</Text>
                <Text style={styles.duration}>duration  :  {animeData[0].duration}</Text>

                <Text style={styles.duration}>start date  :  {animeData[0].startDate ? dateConstructor(animeData[0].startDate) : null}</Text>
                <Text style={styles.duration}>end date  :  {animeData[0].endDate ? dateConstructor(animeData[0].endDate) : null}</Text>


                <Text style={styles.seasonYear}>{animeData[0].nextAiringEpisode ? nextEpisodeConstructor(animeData[0].nextAiringEpisode) : null}</Text>

                {animeData[0].genres.map((genre, index) => <Text key={index} style={styles.genre}>{genre}</Text>)}
              </View>

              {/* extra search details */}
              <View>
                {isSearchEnable && characters.length > 0 ?
                  (
                    <>
                      <Text style={[styles.description, { marginTop: 70, marginLeft: 20, }]}>Characters</Text>

                      <View style={[{ position: "absolute", right: 10 },{ marginTop: 70 }]}>
                        {
                          charactersPageInfo.length > 0 ? <PageBar pageInfo={charactersPageInfo[0]} pageHandler={pageHandler} btnColor="white" /> : null
                        }
                      </View>


                      <View style={[styles.trendContainer]}>
                        <SafeAreaView style={styles.flatView}>
                          <FlatList
                            horizontal={true}
                            data={characters}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                          />
                        </SafeAreaView>
                      </View>
                    </>
                  )
                  :
                  null}
              </View>


              {/* recomendation */}
              <View>



                {recomemdedAnime.length > 0 ?
                  (
                    <>
                      <Text style={[styles.description, { marginLeft: 20, }]}>Recomendation</Text>
                      <TouchableOpacity onPress={() => { dispatch(setAnimeInfoID(recomemdedAnime[0].id)); onPressTouch() }}>
                        <View
                          style={{ marginTop: 10, marginLeft: 20, marginBottom: 20, width: screenWidth / 3 - 20, justifyContent: "center" }}
                        >
                          <Image
                            source={{ uri: recomemdedAnime[0].coverImage.medium }}
                            style={{ height: 160, width: 90, borderRadius: 10 }}
                          />

                          <View style={{ flexDirection: "row" }}>
                            <Image
                              source={require("../../assets/love.png")}
                              style={{ height: 20, width: 20 }}
                            />
                            <Text style={{ fontSize: 13, textAlign: "center", color: DarkTheme.description }}>{recomemdedAnime[0].popularity}</Text>
                          </View>

                          <Text style={{ fontSize: 14, textAlign: "center", color: DarkTheme.description }}>
                            {recomemdedAnime[0].title.english ? recomemdedAnime[0].title.english : recomemdedAnime[0].title.romaji}
                          </Text>

                        </View>
                      </TouchableOpacity>
                    </>
                  ) : null}
              </View>


            </View>
            :
            null
        }
      </ScrollView>

      <View style={{ position: "fixed", top: 10, left: 10, background: "transparent" }}>
        <TouchableOpacity
          onPress={() => closeAnimeDetails()}
        >
          <Image
            source={require('../../assets/back.png')}
            style={{ height: 24, width: 24, background: "transparent" }}
            onPress={() => console.log("gg")}
          />
        </TouchableOpacity>
      </View>


    </View>
  )
}

// styles

const DarkTheme = {
  title: "yellow",
  description: "white",
  background: "black",
  other: "#C0C0C0"
}

const LightTheme = {
  title: "#1C23E3",
  description: "#FBF8DF",
  background: "#1CE39A"
}

const FontStyle = {
  titleFamily: "Roboto_400Regular",
  descriptionFamily: "Roboto_400Regular",
  otherFamily: "sora",
  headingFamily: "sora",

  titleSize: 24,
  descriptionSize: 20,
  otherSize: 18,
  headingSize: 20,
}


const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: DarkTheme.background,
    paddingTop: 0
  },
  textDetailsContainer: {
    position: "relative",
    top: 70,
    marginLeft: 20,
    marginRight: 20,
  },
  popularity: {
    fontSize: FontStyle.otherSize,
    fontFamily: FontStyle.otherFamily,
    color: DarkTheme.description,
  },
  title: {
    fontSize: FontStyle.titleSize,
    fontFamily: FontStyle.titleFamily,
    color: DarkTheme.title,
    fontWeight: "bold"
  },
  description: {
    fontSize: FontStyle.descriptionSize,
    fontFamily: FontStyle.descriptionFamily,
    color: DarkTheme.description,
    marginTop: 10
  },
  season: {
    fontSize: FontStyle.otherSize,
    fontFamily: FontStyle.otherFamily,
    color: DarkTheme.other,
    marginTop: 10
  },
  episodes: {
    fontSize: FontStyle.otherSize,
    fontFamily: FontStyle.otherFamily,
    color: DarkTheme.other,
    marginTop: 10
  },
  duration: {
    fontSize: FontStyle.otherSize,
    fontFamily: FontStyle.otherFamily,
    color: DarkTheme.other,
    marginTop: 10,
  },
  seasonYear: {
    fontSize: FontStyle.otherSize,
    fontFamily: FontStyle.otherFamily,
    color: DarkTheme.other,
    marginTop: 10,
    marginBottom: 10,
  },
  genre: {
    fontSize: FontStyle.otherSize,
    fontFamily: FontStyle.otherFamily,
    color: "#ffff80",
    marginBottom: 10,
  },
  trendContainer: {
    width: "100%",
    backgroundColor: "transparent"
  },
});

export default AnimeDetails