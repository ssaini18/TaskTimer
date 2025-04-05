import Button from "@/components/Button";
import { FlatList, RefreshControl, SafeAreaView, Text, View } from "react-native";
import * as SecurStorage from 'expo-secure-store';
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useCallback, useEffect, useState } from "react";
import { Task } from "@/constants/interfaces";
import TaskCard from "@/components/TaskCard";
import ListEmptyComponent from "@/components/EmptyComponent";
import * as Notifications from 'expo-notifications';
import { get } from "@/utility/apiHelper";
import { useAuth } from "@/context/AuthContext";

const Tasks = () => {
    const {id} = useLocalSearchParams();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const {signOut} = useAuth();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            let token = await SecurStorage.getItemAsync('token');
            let taskList = await get<Task[]>(`/api/tasks/${id}`, token);
            setTasks(taskList)
        } catch (error) {
            if(error = 'Invalid refresh token') {
                signOut();
            }
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const getNextTask = async () => {
        try {
            setLoading(true);
            let token = await SecurStorage.getItemAsync('token');
            let newTask = await get<Task>(`/api/tasks/new/${id}`, token);
            setTasks((prev) => [...prev, newTask]);
            let {hours, minutes, seconds} = newTask.starts_in;
            let time = 3600*hours + minutes*60 + seconds;
            await schedulePushNotification(time, newTask.title);
        } catch (error) {
            if(error = 'Invalid refresh token') {
                signOut();
            }
            console.log(error);
        } finally {
            setLoading(false);
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
                <Button title={"Get Next Task"} onPress={getNextTask} disabled={loading} />
            </View>
        </View>
    </SafeAreaView>
}

export default Tasks;