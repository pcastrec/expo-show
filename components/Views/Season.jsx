import React from "react"
import { FlatList, Image, StyleSheet, Text, TouchableOpacity } from "react-native"

export const Season = ({ navigation, route }) => {

    const { title, item } = route.params

    const [episodes, setEpisodes] = React.useState([])

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: `${title} > Saison ${item.number}`,
        })
        fetch(`https://api.tvmaze.com/seasons/${item.id}/episodes`)
            .then(res => res.json())
            .then(data => setEpisodes(data))
            .catch(err => console.error(err))
    }, [])

    return (
        <FlatList data={episodes}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity style={styles.card}>
                        <Text style={{ fontWeight: "bold", fontSize: 16, margin: 10 }}>{item.name}</Text>
                        <Image style={{ height: 200, width: '100%' }} source={{ uri: item.image.medium }} />
                    </TouchableOpacity>
                )
            }}
        />
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#DDD',
        alignItems: "center",
        backgroundColor: '#FFF'

    }
})