import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, useTheme, HelperText } from 'react-native-paper';

interface TaskFormProps {
  initialTitle?: string;
  initialDescription?: string;
  initialColor?: string;
  onSubmit: (title: string, description: string, color: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialTitle = '', initialDescription = '', initialColor = '', onSubmit }) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [color, setColor] = useState(initialColor);
  const theme = useTheme();

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setColor(initialColor);
  }, [initialTitle, initialDescription, initialColor]);

  const handlePress = () => {
    if (title.trim() === '') {
      alert('necessário título.');
      return;
    }
    onSubmit(title, description, color);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Título da Tarefa"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <HelperText type="error" visible={title.trim() === ''}>
        O título da tarefa é obrigatório.
      </HelperText>
      <TextInput
        label="Descrição"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <TextInput
        label="Cor"
        value={color}
        onChangeText={setColor}
        style={[styles.input, { color: 'gray' }]}
      />
      <Button mode="contained" onPress={handlePress} style={[styles.button, { color: 'cyan' }]}>
        Salvar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginTop: 16,
    color: '#333333'
  },
});

export default TaskForm;
