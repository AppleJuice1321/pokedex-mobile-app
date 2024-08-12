import { Button, TextInput, View, StyleSheet, Text } from "react-native";

export default function Search() {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search" />
        <Text style={styles.searchIconSearch}>S</Text>
        <Text style={styles.searchIconDelete}>X</Text>
      </View>
        <Text style={styles.filter}>#</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
