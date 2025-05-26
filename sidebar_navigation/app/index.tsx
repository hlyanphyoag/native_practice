import { DrawerToggleButton } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { Stack, useNavigation } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  const navigation = useNavigation()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Stack.Screen 
        options={{
          headerRight: () => <DrawerToggleButton />
        }}
      />
      <Button 
        title="Toggle Button"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      /> */}
      <Text>Home</Text>
    </View>
  );
}
