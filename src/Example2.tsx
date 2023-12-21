import {View, Text, FlatList, Dimensions, Animated, Image, StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import {API_KEY} from '../config';

export default function Example2() {
  let data = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7'];
  const {height, width} = Dimensions.get('screen');
  let scrollX = useRef(new Animated.Value(0)).current;
  const [images, setImages] = React.useState([]);
  let itemHeight = height / 2;
  let itemWidth = width - 50;
  const API_URL =
    'https://api.pexels.com/v1/search?query=travel&per_page=20&page=1';
  React.useEffect(() => {
    (async () => {
      try {
        let response = await fetch(API_URL, {
          headers: {
            Authorization: API_KEY,
          },
        });
        let data = await response.json();
        setImages(data.photos);
      } catch (error) {
        throw error;
      }
    })();
  }, []);
  console.log(images[0]);
  return (
    <View style={{paddingTop: 62, width, backgroundColor: '#DED0B6', flex: 1}}>
      <View style={{padding: 20}}>
        <Text
          style={{
            fontSize: 28,
            color: '#2b402c',
            fontWeight: '600',
          }}>
          Amazing vacation for you!
        </Text>
        <Text style={{fontSize: 18, lineHeight: 24, color: '#2b402c'}}>
          Let the adventure begin..
        </Text>
      </View>
      <Animated.FlatList
        data={images}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{height: height / 2}}
        keyExtractor={item => item.id.toString()}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {x: scrollX}},
            },
          ],
          {useNativeDriver: true},
        )}
        horizontal
        renderItem={({item, index}) => {
          return (
            <>
              <View
                style={{
                  shadowColor: '#2b402c',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 7,
                }}>
                <Animated.Image
                  source={{uri: item.src.portrait}}
                  style={{
                    height: itemHeight,
                    width: itemWidth,
                    marginHorizontal: 10,
                    transform: [
                      {
                        scaleX: scrollX.interpolate({
                          inputRange: [
                            -1,
                            0,
                            index * (itemWidth + 20),
                            (index + 2) * (itemWidth + 20),
                          ],
                          outputRange: [1, 1, 1, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                    resizeMode: 'cover',
                    opacity: scrollX.interpolate({
                      inputRange: [
                        -1,
                        0,
                        index * (itemWidth + 20),
                        (index + 1) * (itemWidth + 20),
                        (index + 2) * (itemWidth + 20),
                      ],
                      outputRange: [1, 1, 1, 0, 0],
                      extrapolate: 'clamp',
                    }),
                    borderRadius: 15,
                  }}
                />
              </View>
            </>
          );
        }}
      />
      <View style={{padding: 20}}>
        <Text style={{color:'#2b402c',fontSize:16}}>Search Flights</Text>
        <View
          style={{
            shadowColor: '#2b402c',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            padding: 20,
            marginVertical:10,
            backgroundColor:'#607274',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
          }}
          >
         {/* ====DEPARTURE========= */}
         <View>
          <Text style={styles.dep}>Departure</Text>
          <Text style={styles.dest}>MUM</Text>
          <Text style={styles.from}>Mh, CST</Text>
         </View>
         <Text  style={{ color:'#FAEED1',fontSize:14}}>To</Text>
         {/* ====DESTINATION========= */}
         <View>
          <Text style={styles.dep}>Departure</Text>
          <Text style={styles.dest}>LA</Text>
          <Text style={styles.from}>Los Angeles, US</Text>
         </View>
        </View>
        <View style={{paddingVertical:30,justifyContent:'flex-end'}}>
        {/* <Text>Search more ></Text> */}
      </View>
      </View>
  
    </View>
  );
}
const styles=StyleSheet.create({
  dep:{
    color:'#FAEED1',fontSize:14
  },
  dest:{ color:'#FAEED1',fontSize:20,fontWeight:'700',marginVertical:10},
  from:{
    color:'#FAEED1',fontSize:16,opacity:0.7
  }
})
