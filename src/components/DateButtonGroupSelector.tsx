import React, { useState } from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import { Button, ButtonGroup, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'
import DateTimePicker from '@react-native-community/datetimepicker'
import { TextInput } from 'react-native-gesture-handler'

interface DateButtonGroupSelectorProps {
  date: Date
  setDate: (date: Date) => void
}

const DateButtonGroupSelector: React.FC<DateButtonGroupSelectorProps> = ({
  date,
  setDate,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showPicker, setShowPicker] = useState(false)
  //const [date, setDate] = useState(new Date())

  const onChangeDate = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date
    setShowPicker(Platform.OS === 'ios') // Esto mantendrá el picker abierto en iOS después de la selección
    setDate(currentDate) // Actualiza el estado con la nueva fecha
  }

  const onPressButton = (value: number) => {
    console.log(value)
    if (value === 0) {
      setShowPicker(true)
    }
    setSelectedIndex(value)
  }

  return (
    <>
      <ButtonGroup
        buttons={['DIA', 'SEMANA', 'PERSONALIZADO']}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          onPressButton(value)
        }}
        containerStyle={{ marginBottom: 20 }}
      />
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}
      <Text>{date.toLocaleDateString('es-ES')}</Text>
    </>
  )
}

export default DateButtonGroupSelector
