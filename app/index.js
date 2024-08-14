import NavbarPage from "../components/navbar";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Text,
  TextInput,
} from "react-native";
import useGet from "../hooks/useGet";
import { Link } from "expo-router";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  // function SHOW_DATA() {
  //   if(search = String) {
  //     data.forms
  //   } else if (search = Number)  {
  //     data.results
  //   } else (search = null | undefined)

  // }
  
  // fetched data stored
  const { data, loading } = useGet(
    `https://pokeapi.co/api/v2/pokemon/${search}`
  );


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* navigation */}
        <NavbarPage />

        {/* Searchbar */}
        <View style={styles.searchBarContainer}>
          <View style={styles.searchContainer}>
            <TextInput style={styles.searchInput} placeholder="Search" onChangeText={setSearch} value={search}/>
            <Text style={styles.searchIconSearch}>S</Text>
            <Text style={styles.searchIconDelete} onPress={setSearch("")}>X</Text>
          </View>
          <Text style={styles.filter}>#</Text>
        </View>
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
                <View style={styles.boxContainer}>
                  {/* <Text>#{data.id}</Text> */}
                  {/* <Image style={styles.imgContainer} source={{ uri: `${SPRITES}` }} /> */}
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
    columnGap: 1000,
  },
  boxContainer: {
    // backgroundColor: "grey",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "flex-end",
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 5,
    backgroundColor: "white",
  },
  pokemon: {
    backgroundColor: "lightgrey",
    height: 50,
    textAlign: "center",
    textAlignVertical: "bottom",
    borderRadius: 10,
  },
  imgContainer: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    backgroundColor: "blue",
    position: "absolute",
    zIndex: 1,
  },

  // Searchbar
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchContainer: {
    position: "relative",
    width: 250,
  },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 4,
    paddingLeft: 30,
  },
  filter: {
    width: 34,
    height: 34,
    backgroundColor: "white",
    borderRadius: 20,
    color: "#DC0A2D",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
  },
  searchIconSearch: {
    width: 30,
    height: 30,
    borderRadius: 15,
    color: "#DC0A2D",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    position: "absolute",
    top: 2,
    left: 0,
  },
  searchIconDelete: {
    width: 30,
    height: 30,
    borderRadius: 15,
    color: "#DC0A2D",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    position: "absolute",
    top: 2,
    right: 0,
  },
});
