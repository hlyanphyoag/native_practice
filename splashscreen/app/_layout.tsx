import SplashLayout from "@/components/SplashLayout";
import splashHook from "@/hooks/splashHook";
import { Stack } from "expo-router";

export default function RootLayout() {
  const {isAppReady, setIsAppReady} = splashHook()
  if(!isAppReady) return <SplashLayout setIsAppReady= {setIsAppReady}/>
  return <Stack />;
}
