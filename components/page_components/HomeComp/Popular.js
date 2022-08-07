import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native';
import { FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import AnimeDetails from '../../pages/AnimeDetails';
import { trendingAnime } from '../../../apis/home/homeApi';
import { setAnimeInfoID, setIsAnimeDetailsOpen } from '../../../redux/slicers/AnimeDetailsSlice';

function Popular() {
    // const navigate = useNavigate();
    const dispatch = useDispatch()

    const [populargAnimes, setPopulargAnimes] = useState([]);
    const [pageInfo, setPageInfo] = useState([]);

    // const [isAnimeDetailsOpen, setIsAnimeDetailsOpen] = useState(false)

    const imageSize = 80;
    const numColumns = 3;

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const imageMargin = ((screenWidth / numColumns) - imageSize) / 2;

    let popularity = 200000;

    useEffect(() => {

        // trending
        trendingAnime()
            .then((data) => {

                console.log(data)
                setPopulargAnimes(data.Page.media)
                setPageInfo([data.Page.pageInfo])

            })
            .catch((err) => console.log(err));
    }, [])

    // animeDetails
    const openAnimeDetails = (id) => { dispatch(setAnimeInfoID(id)); dispatch(setIsAnimeDetailsOpen(true)); };
    // const closeAnimeDetails = () => setIsAnimeDetailsOpen(false);

    // popular
    const renderPopulars = ({ item }) => {
        // console.log(item)

        return (
            <TouchableOpacity onPress={() => openAnimeDetails(item.id)}>
                <View
                    style={{ width: imageSize, margin: imageMargin }}
                    onPress={() => console.log("gg")}
                >
                    <Image
                        source={{ uri: item.coverImage.medium }}
                        style={{ height: 130, width: imageSize, borderRadius: 10 }}
                    />

                    <View style={{ flexDirection: "row" }}>
                        <Image
                            source={require("../../../assets/love.png")}
                            style={{ height: 20, width: 20 }}
                        />
                        <Text style={{ fontSize: 13, textAlign: "center" }}>{item.popularity}</Text>
                    </View>

                    <Text style={{ fontSize: 14, textAlign: "center" }}>
                        {item.title.english ? item.title.english : item.title.romaji}
                    </Text>

                </View>
            </TouchableOpacity>
        )
    };

    // page navigating
    const pageHandler = (page) => {
        console.log(page);
        // trending

        trendingAnime(popularity, page)
            .then((data) => {

                console.log(data)
                setPopulargAnimes(data.Page.media)
                setPageInfo([data.Page.pageInfo])

            })
            .catch((err) => console.log(err));
    }

    return (
        <View>

            {/* {
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isAnimeDetailsOpen}
                    onRequestClose={() => {
                        setIsAnimeDetailsOpen(!isAnimeDetailsOpen);
                    }}
                >
                    <AnimeDetails closeAnimeDetails={closeAnimeDetails} />

                </Modal>
            } */}

            <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                <Text style={{ textAlign: "center" }}>Poppular!</Text>

                {
                    pageInfo.length > 0
                        ?
                        (
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", height: 30, position: "absolute", right: 20 }}>

                                <Text>
                                    {
                                        pageInfo[0].currentPage === 1
                                            ?
                                            " "
                                            :
                                            (
                                                <TouchableOpacity
                                                    onPress={() => pageHandler(pageInfo[0].currentPage - 1)}>
                                                    <Text>{"<"}</Text>
                                                </TouchableOpacity>
                                            )
                                    }
                                    {"   "}
                                </Text>

                                <Text>{pageInfo[0].currentPage}</Text>


                                <Text>
                                    {"   "}
                                    {
                                        pageInfo[0].hasNextPage
                                            ?
                                            (
                                                <TouchableOpacity
                                                    onPress={() => pageHandler(pageInfo[0].currentPage + 1)}>
                                                    <Text>{">"}</Text>
                                                </TouchableOpacity>
                                            )
                                            :
                                            " "
                                    }
                                </Text>

                            </View>
                        )
                        :
                        null
                }
            </View>

            {populargAnimes.length > 0
                ?
                (
                    <View style={styles.trendContainer}>
                        <SafeAreaView style={styles.flatView}>
                            <FlatList
                                style={styles.flatList}
                                horizontal={false}
                                data={populargAnimes}
                                renderItem={renderPopulars}
                                keyExtractor={(item) => item.id}
                                numColumns={3}
                            />
                        </SafeAreaView>
                    </View>
                )
                :
                null
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    trendContainer: {
        width: "100%",
        backgroundColor: "transperent"
    },
    flatView: {

    },
    flatList: {

    }
});

export default Popular