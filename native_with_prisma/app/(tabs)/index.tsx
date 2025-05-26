import { useEffect, useState } from "react";
import { Button, Keyboard, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

interface Todo {
  id: number,
  title: string,
  completed: boolean
}
export default function HomeScreen() {
  const [title, setTitle] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [edit, setEdit] = useState< number | null>(null)

  const handleEdit = async (todo: Todo) => { 
    setEdit(todo.id) 
    console.log('Todo on client:', todo.title);
    setTitle(todo.title)
    console.log('Title on client:', title)
  }

  const handleUpdate = async(id: number) => {
    await fetch(`/(api)/todo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })
    setEdit(null);
    setTitle('')
  }


  const handleDelete = async (id: number) => {
    console.log('Id on client:', id)
    await fetch(`/(api)/todo/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  useEffect(() => {
    (async () => {
      const response = await fetch("/(api)/todo")
      const data = await response.json()
      setTodos(data)
    })()
  }, [title, handleDelete])

  const handleTodo = async () => {
    console.log('Press is working');
    try {
      const response = await fetch("/(api)/todo", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      });

      setTitle('')

      if (!response.ok) {
        console.error('HTTP error:', response.status, response.statusText);
        return;
      }

      const data = await response.json();

      console.log('Response data:', data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 120,
          paddingTop: 40,
        }}
        showsVerticalScrollIndicator={false}
        bounces={true}
        scrollEventThrottle={16}
      >
        <SafeAreaView style={{ flex: 1, alignItems: 'center', }} >
          <View style={{ gap: 20, marginTop: 20, paddingHorizontal: 5 }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Hello Prisma</Text>
            <TextInput
              placeholder="Enter text"
              placeholderTextColor="#9CA3AF" // Tailwind gray-400
              style={{
                height: 50,
                paddingHorizontal: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#D1D5DB', // Tailwind gray-300
                backgroundColor: '#FFFFFF',
                fontSize: 16,
                color: '#111827', // Tailwind gray-900
              }}
              value={title}
              onChangeText={setTitle}
            />
            <TouchableOpacity style={{
              width: 300,
              backgroundColor: '#3B82F6',
              borderRadius: 5,
              padding: 5,

            }}>
              <Button
                title={edit? 'Update' : 'Add'}
                color='white'
                onPress={() => !edit  ? handleTodo() : handleUpdate(edit)} />
            </TouchableOpacity>
          </View>
          <View 
            style={{
              marginTop: 40,
            }}
          >
            <Text style={{
              textAlign: 'center',
              fontSize: 30,
              fontWeight: 'bold',
              color: 'white'
            }}>Todo - {todos.length}</Text>
            {todos.map((todo) => (
              <View
                key={todo.id}
                style={{
                  width: 300,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 15,
                  marginTop: 20,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: '#C1E1C1',
                }}
              >
                <Text style={{ color: 'white', fontSize: 18 }}>{todo.title}</Text>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 10
                }}>
                  <TouchableOpacity 
                    onPress={() => handleEdit(todo) }
                    style={{
                      backgroundColor: '#3B82F6',
                      padding: 8,
                      borderRadius: 8,
                      width: 50,
                    }}>
                    <Text style={{ color: 'white', textAlign:"center" }}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => handleDelete(todo.id)}
                    style={{
                      backgroundColor: '#FF0000',
                      padding: 8,
                      borderRadius: 8,
                    }}
                    >
                    <Text style={{ color: 'white' }}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}