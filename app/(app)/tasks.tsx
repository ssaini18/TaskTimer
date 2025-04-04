import Button from "@/components/Button"
import { useAuth } from "@/context/AuthContext"
import { Text, View } from "react-native"

const Tasks = () => {
    const {signOut} = useAuth();

    return <View className="flex-1 justify-center items-center">
        <Text>Tasks</Text>
        <Button title={"Logout"} onPress={signOut} />
    </View>
}

export default Tasks;