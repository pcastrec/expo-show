import React from "react"
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export const Seasons = ({ navigation, show }) => {

    const [saisons, setSaisons] = React.useState([])

    React.useEffect(() => {
        fetch(`https://api.tvmaze.com/shows/${show.id}/seasons`)
            .then(res => res.json())
            .then(data => setSaisons(data))
            .catch(err => console.error(err))
    }, [])

    return (
        <View style={styles.card}>
            <Text style={{ marginBottom: 20, fontSize: 18, fontWeight: "bold", textAlign: "center" }}>Saisons</Text>
            <FlatList horizontal={true} data={saisons}
                ItemSeparatorComponent={() => <View style={{ margin: 5 }} />}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Season', { title: show.name, item })}>
                            <Image style={{ height: 300, width: 200, resizeMode: 'contain', borderWidth: 1, borderColor: '#000' }} source={item.image ? { uri: item.image?.medium } : require('../assets/adaptive-icon.png')} />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#DDD',
        marginHorizontal: 20,
        backgroundColor: '#FFF'

    }
})