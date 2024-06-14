import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, RadioButton, Modal, Portal, Provider } from 'react-native-paper';
import { addTask, updateTask, getTask } from '../services/taskService';

interface TaskFormProps {
  route: any;
  navigation: any;
}

const TaskFormScreen: React.FC<TaskFormProps> = ({ route, navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (route.params && route.params.taskId) {
      const { taskId } = route.params;
      getTask(taskId).then((task: any) => {
        if (task) {
          setTitle(task.title);
          setDescription(task.description);
          setPriority(task.priority || '');
        }
      }).catch((error: any) => console.error("Error fetching task:", error));
    }
  }, [route.params]);

  const handleAddOrUpdateTask = async () => {
    if (!title.trim()) {
      alert('Por favor, insira um título para a tarefa.');
      return;
    }

    const task = { title, description, color: priority ? mapPriorityToColor(priority) : '' };
    const taskId = route.params && route.params.taskId;
    if (taskId) {
      await updateTask(taskId, task).then(() => navigation.goBack()).catch((error: any) => console.error("Error updating task:", error));
    } else {
      await addTask(task).then(() => navigation.goBack()).catch((error: any) => console.error("Error adding task:", error));
    }
  };

  const mapPriorityToColor = (priority: string) => {
    switch (priority) {
      case 'Baixa Prioridade':
        return 'green';
      case 'Média Prioridade':
        return 'yellow';
      case 'Alta Prioridade':
        return 'red';
      default:
        return '';
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <TextInput
          label="Título"
          value={title}
          onChangeText={setTitle}
          style={[styles.input, { backgroundColor: '#FFFFFF' }]}
          theme={{ colors: { text: '#0000CD' } }}
        />
        <TextInput
          label="Descrição"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, { backgroundColor: '#FFFFFF' }]}
          theme={{ colors: { text: '#0000CD' } }}
        />
        <Button mode="contained" onPress={() => setModalVisible(true)} style={[styles.priorityButton, { backgroundColor: '#0000CD' }]}>
          {priority ? `Prioridade: ${priority}` : 'Definir Prioridade'}
        </Button>
        <Portal>
          <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modalContent}>
            <RadioButton.Group onValueChange={(value) => setPriority(value)} value={priority}>
              <View style={{ backgroundColor: '#696969' }}>
                <RadioButton.Item labelStyle={{ color: '#FFFFFF' }} color="#0000CD" label="Baixa Prioridade" value="Baixa Prioridade" />
                <RadioButton.Item labelStyle={{ color: '#FFFFFF' }} color="#0000CD" label="Média Prioridade" value="Média Prioridade" />
                <RadioButton.Item labelStyle={{ color: '#FFFFFF' }} color="#0000CD" label="Alta Prioridade" value="Alta Prioridade" />
              </View>
            </RadioButton.Group>
            <Button mode="contained" onPress={() => setModalVisible(false)} style={styles.completeButton}>
              Concluir
            </Button>
          </Modal>
        </Portal>
        <Button mode="contained" onPress={handleAddOrUpdateTask} style={styles.addButton}>
          {route.params && route.params.taskId ? 'Salvar Alterações' : 'Adicionar Tarefa'}
        </Button>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#333333',
  },
  input: {
    marginBottom: 10,
    color: '#FFFFFF',
  },
  priorityButton: {
    marginBottom: 20,
  },
  modalContent: {
    backgroundColor: '#696969',
    padding: 20,
    margin: 30,
  },
  addButton: {
    backgroundColor: '#0000CD',
  },
  completeButton: {
    backgroundColor: '#0000CD',
  },
});

export default TaskFormScreen;
