import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import * as SecurStorage from 'expo-secure-store';
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Task } from "@/constants/interfaces";
import { BASE_URL } from "@/constants/urls";
import TaskCard from "@/components/TaskCard";
import ListEmptyComponent from "@/components/EmptyComponent";

const Tasks = () => {
    const {signOut} = useAuth();
    const {id} = useLocalSearchParams();
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            let token = await SecurStorage.getItemAsync('token');
            let response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
                headers: {
                    "Authorization": "Bearer "+token
                }
            });
            let data = await response.json();

            if(response.status == 200) {
                setTasks(data);
            } else if(response.status == 401) {
                //refresh token
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getNextTask = async () => {
        try {
            let token = await SecurStorage.getItemAsync('token');
            let response = await fetch(`${BASE_URL}/api/tasks/new/${id}`, {
                headers: {
                    "Authorization": "Bearer "+token
                }
            });
            let data = await response.json();

            if(response.status == 200) {
                setTasks(prev => [...prev, data]);
            } else if(response.status == 401) {
                //refresh token
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogout = async () => {
        await Promise.all([
            SecurStorage.deleteItemAsync('token'),
            SecurStorage.deleteItemAsync('refreshToken')
        ]);
        signOut();
    }

    return <SafeAreaView className="flex-1">
        <View className="flex-1 px-5 pt-2">
            <Text className="font-bold">Room id - {id}</Text>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <TaskCard item={item} />}
                ListEmptyComponent={<ListEmptyComponent title="No tasks found, click on the button below to get next task" />}
            />
            <View className="mt-2">
                <Button title={"Get Next Task"} onPress={getNextTask} />
            </View>
        </View>
    </SafeAreaView>
}

export default Tasks;