import { useAuth } from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";

export default function AppLayout () {
    const {loading, isAuthenticated} = useAuth();

    if(loading) {
        return <Text>Loading..........</Text>
    }

    if(!isAuthenticated) {
        return <Redirect href={"/login"} />
    }

    return <Stack>
        <Stack.Screen name="index"  options={{title: "Rooms"}}/>
        <Stack.Screen name="tasks" options={{title: 'Task List'}} />
    </Stack>
}