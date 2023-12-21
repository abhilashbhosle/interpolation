import {View, Text, FlatList, Animated} from 'react-native';
import React,{useRef} from 'react';

export default function Example1() {
  let data = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7'];
  const scrollY=useRef(new Animated.Value(0)).current;
  return (
    <View style={{flex:1,backgroundColor:'#000',marginTop:70}}>
      <Animated.FlatList
        data={data}
		contentContainerStyle={{padding:10}}
		onScroll={Animated.event(          
			[{nativeEvent: {contentOffset: {y: scrollY}}}],  
			{useNativeDriver: true},
		  )}
        keyExtractor={index => index.toString()}
        renderItem={({item,index}) => {
			let inputRange=[-1,0,index*180,(index+2)*180]
			let outputRange=[1,1,1,0]
       return(
          <Animated.View
            style={{
              height: 180,
              width: '100%',
              backgroundColor: '#333',
              borderWidth: 2,
              borderColor: '#f5f5f5',
              justifyContent: 'center',
              alignItems: 'center',
			  transform:[{scaleY:scrollY.interpolate({
				inputRange,
				outputRange,
				extrapolate:'clamp'
			  })}],
			  opacity:scrollY.interpolate({
				inputRange:[-1,0,index*180,(index+2)*180],
				outputRange:[1,1,1,0],
				extrapolate:'clamp'
			  })
            }}
			>
            <Text style={{fontSize: 22, color: '#fff'}}>{item}</Text>
          </Animated.View>
)
		}}
      />
    </View>
  );
}
