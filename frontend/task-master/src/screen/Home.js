import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, RefreshControl, View, Alert } from "react-native";
import { Text, FAB, Provider as PaperProvider } from "react-native-paper";
import LoadingModal from "../components/LoadingModal";
import CreateTaskModal from "../components/CreateTaskModal";
import ViewTaskModal from "../components/ViewTaskModal";
import TaskCard from "../components/TaskCard";
import { makeGetRequest, makePostRequest, makePutRequest, makeDeleteRequest } from "../services/apiRequests";
import { useAuth } from "../contexts/Auth";

const Home = () => {
    const { authData } = useAuth();

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [viewTaskModalVisible, setViewTaskModalVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const userId = authData.user.id;

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await makeGetRequest(`tasks/${userId}`);
            setTasks(response.reverse());
        } catch (error) {
            console.error("Erro ao buscar as tarefas:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            Alert.alert(
                "Confirmação",
                "Você tem certeza que deseja excluir essa tarefa?",
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Excluir", onPress: async () => { await makeDeleteRequest(`task/${taskId}`); fetchTasks(); } },
                ]
            );
        } catch (error) {
            console.error("Erro ao excluir a tarefa:", error);
        }
    };

    const handleSaveTask = async (task) => {
        try {
            setLoading(true);
            if (task.id) {
                await makePutRequest(`task/${task.id}`, task);
            } else {
                await makePostRequest("task", task);
            }
            fetchTasks();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
            setModalVisible(false);
        }
    };

    const handleEditTask = (task) => {
        setSelectedTask(task);
        setModalVisible(true);
    };

    const handleViewTask = (task) => {
        setSelectedTask(task);
        setViewTaskModalVisible(true);
    };

    const handleChangeStatus = async (task) => {
        try {
            Alert.alert(
                "Confirmação",
                "Você tem certeza que deseja finalizar a tarefa?",
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Finalizar", onPress: async () => { task.status = "Finalizada"; await makePutRequest(`task/${task.id}`, task); fetchTasks(); } },
                ]
            );
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <PaperProvider>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchTasks} />}
            >
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                            updateStatus={handleChangeStatus}
                            onViewTask={handleViewTask}
                        />
                    ))
                ) : (
                    <Text style={styles.noTasksText}>Nenhuma tarefa encontrada</Text>
                )}
                <LoadingModal visible={loading} />
            </ScrollView>

            <CreateTaskModal
                visible={modalVisible}
                onClose={() => { setModalVisible(false); setSelectedTask(null); }}
                onSave={handleSaveTask}
                initialTask={selectedTask}
            />

            <ViewTaskModal
                visible={viewTaskModalVisible}
                onClose={() => { setViewTaskModalVisible(false); setSelectedTask(null); }}
                task={selectedTask}
            />

            <FAB
                style={styles.fab}
                icon="plus"
                label="Nova Tarefa"
                onPress={() => { setSelectedTask(null); setModalVisible(true); }}
            />
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    scrollContainer: { flexGrow: 1, padding: 16, marginTop: 20 },
    fab: { position: "absolute", right: 16, bottom: 16, backgroundColor: "#dedcdc", color: "#000" },
    noTasksText: { textAlign: "center", fontSize: 16, color: "#888", marginTop: 20 },
});

export default Home;
