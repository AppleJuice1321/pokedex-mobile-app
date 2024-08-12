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
          <Image
      source={require(data?.sprites.other["Official_Artwork"].front_default)}
      />

          {/* info container */}
          <View style={styles.innerContainer}>
          {/* Types */}
          <FlatList
            style={styles.types}
            numColumns={2}
            data={data.types}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Text>{item.type.name}</Text>}
          />

          {/* About */}
          <View style={styles.aboutContainer}>
            <Text>{data.weight} kg</Text>
            <Text>{data.height} m</Text>
            <FlatList
              data={data.abilities}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <Text>{item.ability.name}</Text>}
            />
          </View>
          
          {/* description */}
          <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat ea tenetur libero alias nostrum harum nisi voluptate veniam ipsam natus beatae nobis deleniti sint, mollitia, debitis porro aspernatur maxime adipisci.</Text>

          {/* Base stats */}
          <FlatList
            data={data.stats}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Text>{item.stat.name} {item.base_stat}</Text>}
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
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
  },
  types: {
    flexDirection: "row",
  },
  aboutContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
