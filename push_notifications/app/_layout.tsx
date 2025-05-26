import { NotificationProvider } from "@/contexts/NotificationsContext";
import { Stack } from "expo-router";
import * as Notifications from "expo-notifications"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});


export default function RootLayout() {
  
  return (
    <NotificationProvider>
      <Stack />
    </NotificationProvider>
  )
}
