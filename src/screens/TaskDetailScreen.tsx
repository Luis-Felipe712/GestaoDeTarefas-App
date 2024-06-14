import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { getTask, deleteTask } from '../services/taskService';

type TaskDetailScreenProps = StackScreenProps<RootStackParamList, 'TaskDetail'>;

const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState<{ title: string; description: string; color: string } | null>(null);

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const fetchTask = async () => {
    const fetchedTask = await getTask(taskId);
    setTask(fetchedTask);
  };

  const handleDelete = async () => {
    await deleteTask(taskId);
    navigation.goBack();
  };

  const confirmDelete = () => {
    Alert.alert(
      "Deletar tarefa",
      "Tem certeza que deseja deletar a tarefa?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Deletar",
          onPress: handleDelete,
          style: "destructive",
        },
      ],
    );
  };

  if (!task) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
        <Button mode="contained" onPress={confirmDelete} style={styles.deleteButton}>
          Deletar
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFFFFF',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: '#FFFFFF',
  },
  deleteButton: {
    backgroundColor: '#b00020',
  },
});

export default TaskDetailScreen;
