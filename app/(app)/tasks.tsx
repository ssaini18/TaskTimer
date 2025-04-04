import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { Text, View } from "react-native";
import * as SecurStorage from 'expo-secure-store';

const Tasks = () => {
    const {signOut} = useAuth();

    const handleLogout = async () => {
        await Promise.all([
            SecurStorage.deleteItemAsync('token'),
            SecurStorage.deleteItemAsync('refreshToken')
        ]);
        signOut();
    }

    return <View className="flex-1 justify-center items-center">
        <Text>Tasks</Text>
        <Button title={"Logout"} onPress={handleLogout} />
    </View>
}

export default Tasks;