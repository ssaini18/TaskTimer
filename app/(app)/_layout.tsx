import { useAuth } from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function AppLayout () {
    const {loading, isAuthenticated} = useAuth();

    if(loading) {
        return <View className="flex-1 justify-center items-center">
            <ActivityIndicator />
        </View>
    }

    if(!isAuthenticated) {
        return <Redirect href={"/login"} />
    }

    return <Stack>
        <Stack.Screen name="index"  options={{title: "Rooms"}}/>
        <Stack.Screen name="tasks/[id]" options={{title: 'Task List'}} />
    </Stack>
}