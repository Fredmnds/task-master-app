import React from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Portal, Text, MD3Colors } from "react-native-paper";
import CustomTextInput from "./CustomTextInput";
import ErrorMessage from "./ErrorMessageFormik";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../contexts/Auth";
import CustomButton from "./CustomButton";

const TaskSchema = Yup.object().shape({
    title: Yup.string().required("O título é obrigatório"),
    description: Yup.string(),
    supporterEmail: Yup.string().email("E-mail inválido"),
});

const CreateTaskModal = ({ visible, onClose, onSave, initialTask, status = null }) => {
    const { authData } = useAuth();
    const userId = authData.user.id;

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
                <Text style={styles.modalTitle}>
                    {initialTask ? "Editar Tarefa" : "Criar Nova Tarefa"}
                </Text>
                <Formik
                    initialValues={{
                        title: initialTask?.title || "",
                        description: initialTask?.description || "",
                        creatorId: userId,
                        supporterEmail: initialTask?.suporter?.email || "",
                        id: initialTask?.id || null,
                    }}
                    validationSchema={TaskSchema}
                    onSubmit={(values, { resetForm }) => {
                        onSave(values);
                        resetForm();
                        onClose();
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <View style={styles.inputContainer}>
                                <CustomTextInput
                                    label="Título"
                                    value={values.title}
                                    onChangeText={handleChange("title")}
                                    onBlur={handleBlur("title")}
                                />
                                {touched.title && errors.title && (
                                    <ErrorMessage error={errors.title} />
                                )}
                            </View>

                            <View style={styles.inputContainer}>
                                <CustomTextInput
                                    label="Descrição"
                                    value={values.description}
                                    onChangeText={handleChange("description")}
                                    onBlur={handleBlur("description")}
                                    multiline={true}
                                    numberOfLines={5}
                                    style={styles.textArea}
                                />
                            </View>
                            {
                                initialTask &&
                                <View style={styles.inputContainer}>
                                    <CustomTextInput
                                        label="E-mail do Suporte"
                                        value={values.supporterEmail}
                                        onChangeText={handleChange("supporterEmail")}
                                        onBlur={handleBlur("supporterEmail")}
                                        keyboardType="email-address"
                                    />
                                    {touched.supporterEmail && errors.supporterEmail && (
                                        <ErrorMessage error={errors.supporterEmail} />
                                    )}
                                </View>
                            }

                            <View style={styles.modalActions}>
                                <CustomButton onPress={onClose} title="Cancelar" color={MD3Colors.error40} />
                                <CustomButton onPress={handleSubmit} title="Salvar" disabled={status === "Finalizada"} />
                            </View>
                        </View>
                    )}
                </Formik>
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
    input: {
        marginBottom: 5,
        backgroundColor: "#f0f0f0",
    },
    inputContainer: {
        marginBottom: 15,
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
});

export default CreateTaskModal;
