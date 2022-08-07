import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

function PageBar({pageInfo, pageHandler}) {
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
                                <Text>{"<"}</Text>
                            </TouchableOpacity>
                        )
                }
                {"   "}
            </Text>

            <Text>{pageInfo.currentPage}</Text>


            <Text>
                {"   "}
                {
                    pageInfo.hasNextPage
                        ?
                        (
                            <TouchableOpacity
                                onPress={() => pageHandler(pageInfo.currentPage + 1)}>
                                <Text>{">"}</Text>
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