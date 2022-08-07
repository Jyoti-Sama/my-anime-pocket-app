import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

function PageBar({pageInfo, pageHandler, btnColor = "black"}) {
    return (
        <View style={{ flexDirection: "row",  height: 30, right: 20 }}>

            <Text>
                {
                    pageInfo.currentPage === 1
                        ?
                        " "
                        :
                        (
                            <TouchableOpacity
                                onPress={() => pageHandler(pageInfo.currentPage - 1)}>
                                <Text style={{color: btnColor}}>{"<"}</Text>
                            </TouchableOpacity>
                        )
                }
                {"   "}
            </Text>

            <Text style={{color: btnColor}}>{pageInfo.currentPage}</Text>


            <Text>
                {"   "}
                {
                    pageInfo.hasNextPage
                        ?
                        (
                            <TouchableOpacity
                                onPress={() => pageHandler(pageInfo.currentPage + 1)}>
                                <Text style={{color: btnColor}}>{">"}</Text>
                            </TouchableOpacity>
                        )
                        :
                        " "
                }
            </Text>

        </View>
    )
}

export default PageBar