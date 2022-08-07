import React from 'react'

import { Image, StyleSheet, TouchableWithoutFeedback, View } from "react-native-web";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();

    const navigationHandler = (to) => { navigate(to) };

    return (
        <View style={styles.container}>

            <TouchableWithoutFeedback
                onPress={() => navigationHandler("/")}
            >
                <Image                    
                    source={require('../../assets/home.png')}
                    style={styles.iconStyle}
                />
            </TouchableWithoutFeedback>


            <TouchableWithoutFeedback
                onPress={() => navigationHandler("/search")}
            >
                <Image                    
                    source={require('../../assets/search.png')}
                    style={styles.iconStyle}
                />
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
                onPress={() => navigationHandler("/list")}
            >
                <Image                    
                    source={require('../../assets/list.png')}
                    style={styles.iconStyle}
                />
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
                onPress={() => navigationHandler("/user")}
            >
                <Image                    
                    source={require('../../assets/user.png')}
                    style={styles.iconStyle}
                />
            </TouchableWithoutFeedback>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 40,
        zIndex: 100,
        position: "fixed",
        bottom: 0,
        backgroundColor: "silver",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItem: "center",
        padding: 10
    },
    links: {
        color: "#05a",
        fontWeight: 640
    },
    iconStyle: {
        width: 24, 
        height: 24
    }
});

export default NavBar