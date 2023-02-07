import React from "react"
import { StyleSheet, TextInput, View } from "react-native"
import Mi from 'react-native-vector-icons/MaterialIcons'

import { Shows } from "../Shows"

export const Home = ({ navigation }) => {

    const [input, setInput] = React.useState('')
    const [shows, setShows] = React.useState([])

    const handleSubmit = () => {
        fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
            .then(res => res.json())
            .then(json => setShows(json))
            .catch(e => console.error('SEARCH', e))
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TextInput style={{ fontSize: 20 }} placeholder="Search ..." value={input} onChangeText={setInput} />
                <Mi name="search" size={32} onPress={handleSubmit} />
            </View>
            <Shows navigation={navigation} shows={shows} />
            {/* <FlatList data={shows}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Show', { item })} style={styles.card}>
                            <Text style={{ fontWeight: "bold", fontSize: 16, margin: 10 }}>{item.show.name}</Text>
                            <Image
                                style={{ height: 200, width: '100%' }}
                                source={item.show.image ? { uri: item.show.image?.medium } : notFound}
                            />
                        </TouchableOpacity>
                    )
                }}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    row: {
        padding: 20,
        width: '100%',
        flexDirection: "row",
        backgroundColor: '#FFF',
        justifyContent: "space-between"
    },
    card: {
        margin: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#DDD',
        alignItems: "center",
        backgroundColor: '#FFF'

    }
})