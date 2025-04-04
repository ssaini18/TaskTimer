import Button from "@/components/Button"
import { BASE_URL } from "@/constants/urls";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View, SafeAreaView, FlatList, Pressable } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { TaskRoom } from "@/constants/interfaces";
import RoomCard from "@/components/RoomCard";
import ListEmptyComponent from "@/components/EmptyComponent";

const Rooms = () => {
    const [rooms, setRooms] = useState<TaskRoom[]>([]);

    const createRoom = async () => {
        try {
            let token = await SecureStore.getItemAsync('token');
            let response = await fetch(BASE_URL+'/api/tasks/new', {
                headers: {
                    "Authorization": "Bearer "+token
                }
            });
            const data = await response.json();

            if(response.status == 200) {
                setRooms(prev => [...prev, data]);
            } else if(response.status == 401) {
                //refresh token
            }

        } catch (error) {
            console.log(error);
        }
    }

    const openRoomDetail = () => router

    return <SafeAreaView className="flex-1">
        <View className="flex-1 px-5">
            <FlatList 
                data={rooms}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <RoomCard item={item} />}
                ListEmptyComponent={<ListEmptyComponent title="No rooms found, click on the button below to create a room" />}
            />
            <View className="mt-2">
                <Button title={"Create Room"} onPress={createRoom} />
            </View>
        </View>
    </SafeAreaView>
}

export default Rooms;