import { Link, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import useGet from "../../hooks/useGet";


export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const { data, error, loading } = useGet(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );

  // const TYPES = ["bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "normal", "Grass", "ground", "ice", "poison", "psychic", "rock", "steel", "water"]

  // if(data && data) {
  //   item.type.name = TYPES
  // }

  return (
    <View style={styles.container}>
      {loading && (
        // indicate loading
        <ActivityIndicator size="large" />
      )}
      {data && (
        <View>
          {/* header */}
          <View style={styles.header}>
            <Link
              href={{
                pathname: "./index",
              }}
            >
              Back
            </Link>
            <Text>Details of Pokemon {id} </Text>
            <Text>#{data.id}</Text>
          </View>

          {/* Pokemon img */}
          {/* <Image style={styles.imgContainer} source={{ uri: `${data && data?.sprites.front_default}`}} /> */}

          {/* info container */}
          <View style={styles.innerContainer}>

            {/* Types */}
            <FlatList
              contentContainerStyle={styles.typesContainer}
              numColumns={2}
              data={data.types}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Text style={styles.types}>{item.type.name}</Text>
              )}
            />

            {/* About */}
            <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 5,}}>
              <Text>{data.weight} kg</Text>
              <Text>{data.height} m</Text>
              <View style={{alignItems: "center", flexDirection: "row", width: 150,}}>
              <FlatList
                contentContainerStyle={{flexDirection: "row", alignItems: "center", gap: 5,}}
                data={data.abilities}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Text>{item.ability.name}</Text>}
              />
              </View>
            </View>

            {/* description */}
            <Text style={{paddingHorizontal: 20, paddingVertical: 5,}}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat
              ea tenetur libero alias nostrum harum nisi voluptate veniam ipsam
              natus beatae nobis deleniti sint, mollitia, debitis porro
              aspernatur maxime adipisci.
            </Text>

            {/* Base stats */}
            <FlatList
              data={data.stats}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Text>
                  {item.stat.name} {item.base_stat}
                  
                </Text>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "lightgreen",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerContainer: {
    height: 400,
    flexDirection: "column",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
  },
  imgContainer: {
    width: 100,
    height: 100,
    resizeMode: "center",
  },
  typesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
  },
  types: {
    textAlignVertical: "center",
    textAlign: "center",
    height: 25,
    minWidth: 50,
    maxWidth: 100,
    borderRadius: 15,
    backgroundColor: "darkgrey",
    marginHorizontal: 10,
    paddingHorizontal: 20,
  },
});
