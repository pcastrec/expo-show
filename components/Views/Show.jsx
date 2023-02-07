import React from "react"
import { Dimensions, Image, ScrollView, Text, ToastAndroid } from "react-native"

import Mi from 'react-native-vector-icons/MaterialIcons'

import { Seasons } from "../Seasons"
import { Actors } from "../Actors"
import { DbContext } from "../DbContext"

const { width, height } = Dimensions.get('window')

export const Show = ({ navigation, route }) => {

    const { item } = route.params

    const db = React.useContext(DbContext)

    const [fav, setFav] = React.useState(false)
    const [data, setData] = React.useState({})

    React.useEffect(() => {
        db.transaction(tx => tx.executeSql(
            'SELECT * FROM favorites WHERE id=?', [item.show.id],
            (obj, res) => setFav(res.rows.length),
            (obj, err) => console.error(err)
        ))

        fetch(`https://api.tvmaze.com/shows/${item.show.id}?embed=cast`)
            .then(res => res.json())
            .then(json => setData(json))
            .catch(e => console.error('DETAIL', e))
    }, [])

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: item.show.name,
            headerRight: () => <Mi name="favorite" size={40} color={fav ? '#F00' : '#555'} onPress={handleFav} />
        })
    }, [fav])

    const handleFav = () => {
        if (fav) {
            db.transaction(tx => tx.executeSql(
                'DELETE FROM favorites WHERE id=?', [item.show.id],
                (obj, res) => {
                    setFav(false)
                    ToastAndroid.show(`${item.show.name} removed from favorites`, ToastAndroid.SHORT)
                },
                (obj, err) => console.error(err)
            ))
        } else {
            db.transaction(tx => tx.executeSql(
                'INSERT INTO favorites (id) VALUES (?)', [item.show.id],
                (obj, res) => {
                    setFav(true)
                    ToastAndroid.show(`${item.show.name} added to favorites`, ToastAndroid.SHORT)
                },
                (obj, err) => console.error(err)
            ))

        }
    }

    return (
        <ScrollView>
            <Image style={{ height: height }} source={{ uri: data.image?.original }} />
            <Text style={{ margin: 10, textAlign: "justify" }}>{data.summary}</Text>
            <Seasons navigation={navigation} show={item.show} />
            <Actors actors={data._embedded?.cast} />
        </ScrollView>
    )
}