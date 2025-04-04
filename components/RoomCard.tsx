import { TaskRoom } from "@/constants/interfaces";
import { router } from "expo-router";
import { Pressable, Text } from "react-native";

interface RoomCardProps {
    item: TaskRoom
}

const RoomCard = ({item}: RoomCardProps) => {

    const handlePress = () => router.navigate(`/tasks/${item.id}`);

    return <Pressable 
            className="p-5 border border-gray-200 rounded-lg mt-2 shadow-sm bg-white"
            onPress={handlePress}
        >
            <Text className="font-bold">{item.id}</Text>
        </Pressable>
}

export default RoomCard;