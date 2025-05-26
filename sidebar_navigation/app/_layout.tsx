import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Image, Text, View } from 'react-native';
import { usePathname, useRouter } from 'expo-router';


const menuItems = [
  {
    id: 42,
    title: 'Item 42'
  },
  {
    id: 43,
    title: 'Item 43'
  },
  {
    id: 44,
    title: 'Item 44'
  }
]


function DrawerContent(props: DrawerContentComponentProps) {
  const router = useRouter()
  const pathName = usePathname()
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ height: 100, width: 100, borderRadius: 50 }}
        />
      </View>
      <DrawerItemList {...props} />

      <View style={{ padding: 16, paddingTop: 40 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Items</Text>
      </View>

      {menuItems.map((item) => {
        const isActive = pathName === `/${item.id}`;
        return (
          <DrawerItem
            focused={isActive ? true : false}
            key={item.id}
            label={item.title}
            onPress={() => router.push(`/${item.id}`)}
          />
        )
      })}
    </DrawerContentScrollView>
  )
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={DrawerContent}
        screenOptions={{
          // drawerActiveTintColor: '#e84393',
          drawerHideStatusBarOnOpen: true
        }}
      >
        <Drawer.Screen name="index" options={{
          drawerLabel: 'Home',
          title: 'My app',
          drawerIcon: ({ color, size }) => (<Ionicons name="home" size={size} color={color} />)
        }} />
        <Drawer.Screen name="news" options={{
          drawerLabel: 'News',
          title: 'News',
          drawerIcon: ({ color, size }) => (<Ionicons name="newspaper" size={size} color={color} />)
        }} />
        <Drawer.Screen
          name='[id]'
          options={{
            drawerItemStyle: {
              display: 'none'
            }
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}