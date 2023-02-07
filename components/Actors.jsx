import { FlatList, Image, StyleSheet, Text, View } from "react-native"

export const Actors = ({ actors }) => {

    return (
        <View style={styles.card}>
            <Text style={{ marginBottom: 20, fontSize: 18, fontWeight: "bold", textAlign: "center" }}>Acteurs</Text>
            <FlatList data={actors} horizontal={true}
                ItemSeparatorComponent={() => <View style={{ margin: 5 }} />}
                renderItem={({ item }) => {
                    return (
                        <View style={{ alignItems: "center" }}>
                            <View>
                                <Text style={{ textAlign: "center" }}>{item.person.name}</Text>
                                <Text style={{ textAlign: "center" }}>as</Text>
                                <Text style={{ textAlign: "center" }}>{item.character.name}</Text>
                            </View>
                            <Image style={{ height: 300, width: 200, resizeMode: 'contain' }} source={{ uri: item.person.image?.medium }} />
                        </View>
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
        marginVertical: 20,
        borderColor: '#DDD',
        marginHorizontal: 20,
        backgroundColor: '#FFF'
    }
})