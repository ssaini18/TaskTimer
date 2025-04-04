import { Task } from "@/constants/interfaces";
import { View, Text } from "react-native";

interface TaskCardProps {
    item: Task
}

const TaskCard = ({item}: TaskCardProps) => {

    return <View className="border border-gray-200 rounded-lg shadow-sm px-3 py-4 bg-white mt-2 gap-5">
        <Text className="font-bold">{item.title}</Text>
        <Text>Start Time - {item.starts_at}</Text>
    </View>
}

export default TaskCard;