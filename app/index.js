import NavbarPage from "../components/navbar";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";
import useGet from "../hooks/useGet";
import { Link } from "expo-router";
import Search from "../components/search";

export default function Home() {
  // fetched data stored
  const { data, error, loading } = useGet("https://pokeapi.co/api/v2/pokemon/");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <NavbarPage />
        <Search />
      </View>
      <View style={styles.innerContainer}>
        <SafeAreaView>
          {loading && (
            // indicate loading
            <ActivityIndicator size="large" />
          )}
          {data && (
            // show pokemon list
            <FlatList
              // horizontal={true}
              style={styles.listContainer}
              numColumns={3}
              data={data.results}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View>
                  <Link
                    style={styles.pokemon}
                    href={{
                      pathname: "./details/[id]",
                      params: { id: item.name },
                    }}
                  >
                    {item.name}
                  </Link>
                </View>
              )}
            />
          )}
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#DC0A2D",
  },
  innerContainer: {
    flex: 2,
    backgroundColor: "white",
    borderRadius: 5,
  },
  header: {
    flexDirection: "column",
    gap: 15,
    paddingBottom: 20,
  },
  listContainer: {
    flexDirection: "column",
  },
  pokemon: {
    backgroundColor: "grey",
    width: 100,
    height: 100,
    margin: 10,
  },
});
