import { FlatList, Image, StyleSheet, Text, TouchableOpacity } from "react-native"

export const Shows = ({ navigation, shows }) => {
    return (
        <FlatList data={shows}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('Show', { item })} style={styles.card}>
                        <Text style={{ fontWeight: "bold", fontSize: 16, margin: 10 }}>{item.show.name}</Text>
                        <Image
                            style={{ height: 200, width: '100%' }}
                            source={item.show.image ? { uri: item.show.image?.medium } : require('../assets/adaptive-icon.png')}
                        />
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