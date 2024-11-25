import React from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Portal, Text } from "react-native-paper";
import CustomTextInput from "./CustomTextInput";
import CustomButton from "./CustomButton";

const ViewTaskModal = ({ visible, onClose, task }) => {
    return (
        <Portal>
            <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
                <Text style={styles.modalTitle}>Visualizar Tarefa</Text>

                <View>
                    <View style={styles.inputContainer}>
                        <CustomTextInput
                            label="Título"
                            value={task?.title || ""}
                            editable={false}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <CustomTextInput
                            label="Descrição"
                            value={task?.description || ""}
                            editable={false}
                            multiline={true}
                            numberOfLines={5}
                            style={styles.textArea}
                        />
                    </View>

                    {task?.suporter?.email && (
                        <View style={styles.inputContainer}>
                            <CustomTextInput
                                label="E-mail do Suporte"
                                value={task?.suporter?.email || ""}
                                editable={false}
                            />
                        </View>
                    )}

                    <View style={styles.modalActions}>
                        <CustomButton onPress={onClose} title="Fechar" />
                    </View>
                </View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: "white",
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 15,
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
});

export default ViewTaskModal;
