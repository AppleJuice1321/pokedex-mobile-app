import { StyleSheet, View, Text } from "react-native";
import { Stack, Link } from "expo-router";

export default function NavbarPage() {
  return (
      <View style={styles.container}>
        <Link
          style={styles.links}
          href={{ pathname: "#", params: { name: "Pokemon List" } }}
        >
          Pokémon List
        </Link>
        <Link
          style={styles.links}
          href={{ pathname: "poke-hunt", params: { name: "Pokemon List" } }}
        >
          Pokémon Hunt
        </Link>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  links: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
  }
});
