import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import { Input, Text } from 'react-native-elements'
import CategoryButton from '../components/CategoryButton'
import { ScrollView } from 'react-native-gesture-handler'
import CButton from '../components/Basics/CButton'

export interface HomeScreenProps {}

const AddCategoryScreen = () => {
  const [description, setDescription] = useState<string>('')
  const [selectedIcon, setSelectedIcon] = useState<string>('')

  const iconList = [
    'american-football',
    'analytics',
    'bandage',
    'barbell',
    'basket',
    'basketball',
    'battery-charging',
    'bed',
    'bicycle',
    'body',
    'bulb',
    'camera',
    'car',
    'card',
    'cart',
    'fast-food',
    'film',
    'flashlight',
  ]

  const onAddCategory = () => {
    console.log('RERERERERERERERE')
  }

  return (
    <>
      <Header title={'Añadir categoria'} />
      <View style={styles.container}>
        <Input
          placeholder="Descripcion"
          keyboardType="default"
          value={description}
          onChangeText={setDescription}
          //leftIcon={<Icon name="document" size={30} color="#4a4a4a" />}
          inputStyle={styles.inputText}
        />
        <Text>Selecciona un Icono</Text>
        <ScrollView>
          <View style={styles.categoryContainer}>
            {iconList?.map((icon, index) => (
              <View key={index} style={styles.categoryButtonWrapper}>
                <CategoryButton
                  key={index}
                  iconName={icon}
                  //selected={selectedCategory?.label === category.label}
                  onPress={() => setSelectedIcon(icon)}
                  //color={category.color}
                />
              </View>
            ))}
          </View>
        </ScrollView>
        <CButton label={'Agregar categoria'} handlePress={onAddCategory} />
      </View>
    </>
  )
}

export default AddCategoryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4', // Un fondo claro
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
  inputText: {
    color: '#4a4a4a',
    fontSize: 18,
  },
})
