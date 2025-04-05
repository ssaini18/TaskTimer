import Button from "@/components/Button"
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, SafeAreaView, FlatList, Pressable } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { TaskRoom } from "@/constants/interfaces";
import RoomCard from "@/components/RoomCard";
import ListEmptyComponent from "@/components/EmptyComponent";
import { useAuth } from "@/context/AuthContext";
import { get } from "@/utility/apiHelper";

const Rooms = () => {
    const [rooms, setRooms] = useState<TaskRoom[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const {signOut} = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <Pressable onPress={signOut}><Text>Logout</Text></Pressable>
        })
    }, [navigation]);

    const createRoom = async () => {
        try {
            setLoading(true);
            let token = await SecureStore.getItemAsync('token');
            let newRoom = await get<TaskRoom>('/api/tasks/new', token);
            setRooms((prev) => [...prev, newRoom]);
        } catch (error) {
            if(error = 'Invalid refresh token') {
                signOut();
            }
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return <SafeAreaView className="flex-1">
        <View className="flex-1 px-5">
            <FlatList 
                data={rooms}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <RoomCard item={item} />}
                ListEmptyComponent={<ListEmptyComponent title="No rooms found, click on the button below to create a room" />}
            />
            <View className="mt-2">
                <Button title={"Create Room"} onPress={createRoom} disabled={loading} />
            </View>
        </View>
    </SafeAreaView>
}

export default Rooms;