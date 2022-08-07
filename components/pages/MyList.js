import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, SafeAreaView } from 'react-native-web';


function MyList() {

  const boxs = Array(10);

  const renderItem = ({ item }) => (
    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", backgroundColor: true? "orange" : "silver"}}>

      <View
        style={{ height: 130, width: 90, backgroundColor: "red", margin: 10 }}
      >
        
        <Text>image</Text>

      </View>

      <View>
        <Text>Details</Text>
      </View>

    </View>
  )

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>

      <View style={styles.trendContainer}>
        <SafeAreaView style={styles.flatView}>
          <FlatList
            style={styles.flatList}
            horizontal={false}
            data={boxs}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
        </SafeAreaView>
      </View>
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
    backgroundColor: "silver"
  },
  flatView: {

  },
  flatList: {

  }
});

export default MyList





