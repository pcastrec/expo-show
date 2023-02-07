import React from "react"
import { FlatList, Text, View } from "react-native"
import { DbContext } from "../DbContext"
import { Shows } from "../Shows"

export const Favorite = ({ navigation }) => {

    const db = React.useContext(DbContext)
    const [favorites, setFavorites] = React.useState([])

    React.useEffect(() => {
        db.transaction(tx => tx.executeSql(
            'SELECT * FROM favorites', null,
            (obj, res) => {
                res.rows._array.map(item => {
                    fetch(`https://api.tvmaze.com/shows/${item.id}?embed=cast`)
                        .then(res => res.json())
                        .then(json => setFavorites(prev => [...prev, { show: json }]))
                        .catch(e => console.error('DETAIL', e))
                })
            },
            (obj, err) => console.error(err)
        ))
    }, [])

    return (
        <View>
            <Shows navigation={navigation} shows={favorites} />
        </View>
    )
}