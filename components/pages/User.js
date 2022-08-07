import React from 'react'
import { Text, View } from 'react-native';

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../redux/slicers/UserSlice';

function User() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()


  return (
    <View>
        <Text >{count}</Text>
        <Text onPress={() => dispatch(increment())}>user page +</Text>
        <Text onPress={() => dispatch(decrement())}>user page -</Text>
    </View>
  )
}

export default User