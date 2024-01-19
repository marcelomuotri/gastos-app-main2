import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { HomeStackParamList } from '../Navigation'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import CategoryButton from '../components/CategoryButton'
import { iCategory } from '../types'
import { useGetFromEndpointQuery, useAddEntityMutation } from '../state/api'
import { useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker'

type iAddExpenseProps = {
  route: RouteProp<HomeStackParamList, 'AddExpense'>
}

const AddExpense: React.FC<iAddExpenseProps> = ({ route }) => {
  const navigation = useNavigation()
  const transactions = route?.params?.transactions || []
  const [amount, setAmount] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<iCategory>()

  const [addTransaction] = useAddEntityMutation()
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const { data } = useGetFromEndpointQuery('categories')
  const categories: iCategory[] = data?.data || []

  const handleAddCategory = () => {
    console.log('agregar categoria')
  }

  const handleAddTransaction = async () => {
    console.log('guardando...')
    const transactionToSave = {
      description,
      amount,
      category: selectedCategory?._id,
      transactionDate: date,
    }
    try {
      await addTransaction({
        endpoint: 'transactions',
        entity: transactionToSave,
      })
      ;(navigation as any).navigate('HomeScreen')
    } catch (error) {
      console.error('Error al agregar la transacción:', error)
    }
  }

  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date
    //setShow(Platform.OS === 'ios')
    setDate(currentDate)
    setShowPicker(false)
  }

  const formatDate = (date: Date) => {
    // Puedes ajustar el formato según tus necesidades
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }

  return (
    <ScrollView style={styles.container}>
      <Input
        placeholder="Ingresa la cantidad"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        leftIcon={<Icon name="logo-euro" size={30} color="#4a4a4a" />}
        inputStyle={styles.inputText}
      />
      <Input
        placeholder="Descripcion"
        keyboardType="default"
        value={description}
        onChangeText={setDescription}
        leftIcon={<Icon name="document" size={30} color="#4a4a4a" />}
        inputStyle={styles.inputText}
      />
      <TouchableWithoutFeedback onPress={() => setShowPicker(true)}>
        <View>
          <TextInput
            value={formatDate(date)}
            style={{ borderWidth: 1, padding: 10 }}
            editable={false} // Hace que el TextInput no sea editable manualmente
          />
        </View>
      </TouchableWithoutFeedback>

      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <View style={styles.categoryContainer}>
        {categories?.map((category, index) => (
          <View key={index} style={styles.categoryButtonWrapper}>
            <CategoryButton
              key={index}
              label={category.label}
              iconName={category.icon}
              selected={selectedCategory?.label === category.label}
              onPress={() => setSelectedCategory(category)}
              color={category.color}
            />
          </View>
        ))}
      </View>
      <Button
        title="Añadir Categoria"
        onPress={handleAddCategory}
        buttonStyle={styles.addButton}
        titleStyle={styles.buttonText}
      />
      <Button
        title="Añadir Gasto"
        onPress={handleAddTransaction}
        buttonStyle={styles.addButton}
        titleStyle={styles.buttonText}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4', // Un fondo claro
  },
  inputText: {
    color: '#4a4a4a',
    fontSize: 18,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  categoryButtonWrapper: {
    width: '32%',
    margin: 1,
  },
  addButton: {
    backgroundColor: '#3498db', // Un tono de azul agradable
    marginVertical: 10,
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 18,
  },
})

export default AddExpense
