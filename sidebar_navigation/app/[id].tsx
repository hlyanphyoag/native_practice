import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
    const { id } = useLocalSearchParams()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack.Screen options={{ title : `Page ${id}`}} />
      <Text>You're on page {id}</Text>
    </View>
  );
}
