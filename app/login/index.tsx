import Button from "@/components/Button"
import CustomTextInput from "@/components/TextInput";
import { BASE_URL } from "@/constants/urls";
import { useAuth } from "@/context/AuthContext"
import { useState } from "react";
import { Text, View } from "react-native";
import * as SecureStorage from 'expo-secure-store';

const Login = () => {
    const {signIn} = useAuth();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSignIn = async () => {
        console.log(`${username}-${password}`);
        try {
            const response = await fetch(BASE_URL+'/api/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
    
            if(response.status != 200) {
                alert(data.detail);
            } else {
                await Promise.all([
                    SecureStorage.setItemAsync('token', data.access_token),
                    SecureStorage.setItemAsync('refreshToken', data.refresh_token)
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