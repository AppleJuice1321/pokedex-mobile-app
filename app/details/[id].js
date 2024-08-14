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

  const SPRITES =
    data && data?.sprites?.other["official-artwork"].front_default;

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
                pathname: "#",
              }}
            >
              Back
            </Link>
            <Text>Details of Pokemon {id} </Text>
            <Text>#{data.id}</Text>
          </View>

          {/* Pokemon img */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image style={styles.imgContainer} source={{ uri: `${SPRITES}` }} />
          </View>

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
            <View>
              <Text style={{ textAlign: "center", fontSize: 20, paddingBottom: 20,}}>About</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 20,
                  // backgroundColor: "blue",
                }}
              >
                <View style={{flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20,}}>
                <Text>{data.weight} kg</Text>
                <Text>Weight</Text>
                </View>

                <View style={{flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20,}}>
                <Text>{data.height} m</Text>
                <Text>Height</Text>
                </View>

                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "column",
                    // backgroundColor: "green",
                    width: 70,
                    height: "100%",
                  }}
                >
                  <FlatList
                    contentContainerStyle={{
                      alignItems: "center",
                      gap: 5,
                      width: "100%",
                      backgroundColor:"white",
                    }}
                    data={data.abilities}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Text>{item.ability.name}</Text>}
                  />
                  <Text>Moves</Text>
                </View>
              </View>
            </View>

            {/* description */}
            <Text style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat
              ea tenetur libero alias nostrum harum nisi voluptate veniam ipsam
              natus beatae nobis deleniti sint, mollitia, debitis porro
              aspernatur maxime adipisci.
            </Text>

            {/* Base stats */}
            <Text style={{ textAlign: "center", fontSize: 20, paddingBottom: 20,}}>Base Stats</Text>
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "full",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  imgContainer: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    position: "absolute",
    zIndex: 1,
  },
  innerContainer: {
    height: "65%",
    flexDirection: "column",
    backgroundColor: "white",
    padding: 20,
    gap: 5,
    borderRadius: 5,
  },
  typesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
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
