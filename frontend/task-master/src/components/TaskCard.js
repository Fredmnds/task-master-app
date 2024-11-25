import React from "react";
import { Card, Title, Paragraph, IconButton, MD3Colors } from "react-native-paper";
import { View, StyleSheet } from "react-native";

const TaskCard = ({ task, onEdit, onDelete, updateStatus, onViewTask }) => {

    const getCardColor = (status) => {
        if (status === "Pendente") {
            return "#f0e332";
        } else if (status === "Finalizada") {
            return "#6ee674";
        }
        return "#f9f9f9";
    };

    const status = task.status;
    const cardColor = getCardColor(task.status);

    return (
        <Card style={[styles.card, { backgroundColor: cardColor }]}>
            <Card.Content style={styles.cardContent}>
                <View style={styles.taskInfo}>
                    <View style={styles.titleContainer}>
                        <Title style={styles.title}>{task.title}</Title>
                        {task.suporter && (
                            <Paragraph style={styles.suporter}>
                                {task.suporter.name}
                            </Paragraph>
                        )}
                    </View>
                    <Paragraph style={styles.description}>
                        {task.description}
                    </Paragraph>
                </View>

                {status === "Pendente" ? (
                    <View style={styles.actionButtons}>
                        <IconButton
                            icon="check"
                            size={22}
                            iconColor="green"
                            onPress={() => updateStatus(task)}
                        />
                        <IconButton
                            icon="pencil"
                            size={22}
                            onPress={() => onEdit(task)}
                        />
                        <IconButton
                            icon="delete"
                            size={22}
                            iconColor={MD3Colors.error40}
                            onPress={() => onDelete(task.id)}
                        />
                    </View>
                ) : (
                    <View style={styles.actionButtons}>
                        <IconButton
                            icon="eye"
                            size={22}
                            onPress={() => onViewTask(task)}
                        />
                    </View>
                )}
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
        width: "100%",
        height: 100,
        borderRadius: 12,
        elevation: 5,
        padding: 5,
    },
    cardContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
    },
    taskInfo: {
        flex: 1,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginRight: 8,
    },
    description: {
        fontSize: 14,
        color: "#555",
        marginTop: 6,
    },
    actionButtons: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default TaskCard;
