import Button from "@/components/Button"
import { router } from "expo-router";
import { Text, View } from "react-native"

const Rooms = () => {

    return <View className="flex-1 justify-center items-center">
        <Text>Rooms</Text>
        <Button title={"Go to tasks"} onPress={() => router.navigate('/tasks')} />
    </View>
}

export default Rooms;