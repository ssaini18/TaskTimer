import Button from "@/components/Button"
import CustomTextInput from "@/components/TextInput";
import { useAuth } from "@/context/AuthContext"
import { useState } from "react";
import { Text, View } from "react-native";
import * as SecureStorage from 'expo-secure-store';
import { post } from "@/utility/apiHelper";
import { LoginFailResponse, LoginRequestBody, LoginSuccessResponse } from "@/constants/interfaces";

const Login = () => {
    const {signIn} = useAuth();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSignIn = async () => {
        try {
            let body = {username, password};
            let response = await post<LoginRequestBody, LoginSuccessResponse | LoginFailResponse>('/api/auth/login', body);

            if('detail' in response) {
                alert(response.detail);
            } else {
                await Promise.all([
                    SecureStorage.setItemAsync('token', response.access_token),
                    SecureStorage.setItemAsync('refreshToken', response.refresh_token)
                ]);
                signIn();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <View className="flex-1 justify-center p-10">
        <Text className="text-center mb-5 text-lg font-bold">Login</Text>
        <CustomTextInput
            placeholder="Enter email or username"
            value={username}
            onChangeText={setUsername}
        />
        <CustomTextInput
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
        />
        <Button title={"Login"} onPress={handleSignIn} disabled={!username || !password} />
    </View>
}

export default Login;