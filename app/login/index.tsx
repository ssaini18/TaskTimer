import Button from "@/components/Button"
import { useAuth } from "@/context/AuthContext"
import { Text, View } from "react-native"

const Login = () => {
    const {signIn} = useAuth();

    return <View className="flex-1 justify-center p-10">
        <Text className="text-center mb-5 text-lg font-bold">Login</Text>
        <Button title={"Login"} onPress={signIn} />
    </View>
}

export default Login;