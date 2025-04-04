import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { FlatList, RefreshControl, SafeAreaView, Text, View } from "react-native";
import * as SecurStorage from 'expo-secure-store';
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { useCallback, useEffect, useState } from "react";
import { Task } from "@/constants/interfaces";
import { BASE_URL } from "@/constants/urls";
import TaskCard from "@/components/TaskCard";
import ListEmptyComponent from "@/components/EmptyComponent";
import * as Notifications from 'expo-notifications';

const Tasks = () => {
    const {signOut} = useAuth();
    const {id} = useLocalSearchParams();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);

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
                let {hours, minutes, seconds} = data.starts_in;
                let time = 3600*hours + minutes*60 + seconds;
                await schedulePushNotification(time, data.title);
            } else if(response.status == 401) {
                //refresh token
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }, []);

    const schedulePushNotification = async (time: number, title: string) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                categoryIdentifier: 'ACTIONABLE'
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: time,
            },
        });
      }

    return <SafeAreaView className="flex-1">
        <View className="flex-1 px-5 pt-2">
            <Text className="font-bold">Room id - {id}</Text>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <TaskCard item={item} />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListEmptyComponent={<ListEmptyComponent title="No tasks found, click on the button below to get next task" />}
            />
            <View className="mt-2">
                <Button title={"Get Next Task"} onPress={getNextTask} />
            </View>
        </View>
    </SafeAreaView>
}

export default Tasks;