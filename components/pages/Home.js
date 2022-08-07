// import { StatusBar } from 'expo-status-bar';
import { Modal, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// components
import Popular from '../page_components/HomeComp/Popular';
import Upcomming from '../page_components/HomeComp/Upcomming';
import AnimeDetails from './AnimeDetails';
import AiringAnime from '../page_components/HomeComp/AiringAnime';

// redux
import { setIsAnimeDetailsOpen } from '../../redux/slicers/AnimeDetailsSlice';


function Home() {

    // animeDetails
    const dispatch = useDispatch();
    const isAnimeDetailsOpen = useSelector((state) => state.animeInfo.isAnimeDetailsOpen);
    const closeAnimeDetails = () => dispatch(setIsAnimeDetailsOpen(false));

    //

    //

    return (
        <View style={styles.container}>
            {/* <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle={'light-content'}
                hidden={false}
            /> */}

            <Modal
                animationType="slide"
                transparent={true}
                visible={isAnimeDetailsOpen}
                onRequestClose={() => {
                    dispatch(setIsAnimeDetailsOpen(!isAnimeDetailsOpen));
                }}
            >
                <AnimeDetails closeAnimeDetails={closeAnimeDetails} />

            </Modal>

            <Upcomming />

            <AiringAnime />

            <Popular />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
});

export default Home