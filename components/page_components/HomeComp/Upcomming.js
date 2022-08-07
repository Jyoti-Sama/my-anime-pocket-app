import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { upcommingAnime } from '../../../apis/home/homeApi';
import { setAnimeInfoID, setIsAnimeDetailsOpen } from '../../../redux/slicers/AnimeDetailsSlice';
import PageBar from './PageBar';

import { useDispatch } from 'react-redux';

function Upcomming() {
    const dispatch = useDispatch();
    const [pageInfo, setPageInfo] = useState([]);
    const [upcomingAnime, setUpcomingAnime] = useState([]);

    const imageSize = 80;
    const numColumns = 3;
    const imageMargin = ((Dimensions.get('window').width / numColumns) - imageSize) / 2;

    useEffect(() => {

        // up comming
        upcommingAnime()
            .then((data) => {
                setUpcomingAnime(data.Page.media)
                setPageInfo([data.Page.pageInfo])

                console.log(data)
            })
            .catch((err) => console.log(err));
    }, [])

    //
    const openAnimeDetails = (id) => { dispatch(setAnimeInfoID(id)); dispatch(setIsAnimeDetailsOpen(true)); };

    // const boxs = Array(10);

    const renderItem = ({ item }) => (
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
    );

    // page navigating
    const popularity = 10000;
    const pageHandler = (page) => {
        console.log(page);

        upcommingAnime(popularity, page)
            .then((data) => {

                console.log(data)
                setUpcomingAnime(data.Page.media)
                setPageInfo([data.Page.pageInfo])

            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <View style={{ flex: 1, flexDirection: "row", width: "100%", justifyContent: 'center' }}>

                <Text >Upcomming!</Text>

                <View style={{ position: "absolute",  right: 10 }}>
                    {
                        pageInfo.length > 0 ? <PageBar pageInfo={pageInfo[0]} pageHandler={pageHandler} /> : null
                    }
                </View>
            </View>
            {upcomingAnime.length > 0 ? (
                <View style={styles.trendContainer}>
                    <SafeAreaView style={styles.flatView}>
                        <FlatList
                            style={styles.flatList}
                            horizontal={true}
                            data={upcomingAnime}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                        />
                    </SafeAreaView>
                </View>
            ) : null}
        </>
    )
}

const styles = StyleSheet.create({
    trendContainer: {
        width: "100%",
        backgroundColor: "transparent"
    },
    flatView: {

    },
    flatList: {

    }
});

export default Upcomming