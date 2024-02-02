import React, { useState } from 'react'
import { Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, ButtonGroup, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'
import DateTimePicker from '@react-native-community/datetimepicker'
import { TextInput } from 'react-native-gesture-handler'
import { getMonthName } from '../utils/dates'
import MonthModal from './MonthModal'
import { useTheme } from '@rneui/themed'

export interface DateAverage {
  dateFrom: string
  dateTo: string
}
interface DateButtonGroupSelectorProps {
  dates: DateAverage
  setDates: ({ dateFrom, dateTo }: DateAverage) => void
}

const DateButtonGroupSelector: React.FC<DateButtonGroupSelectorProps> = ({
  dates,
  setDates,
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  const [selectedIndex, setSelectedIndex] = useState(1)
  const [showPicker, setShowPicker] = useState(false)
  const [showMonthModal, setShowMonthModal] = useState(false)

  const onChangeDate = (event: any, selectedDate: string) => {
    setDates({ dateFrom: selectedDate, dateTo: selectedDate }) // Actualiza el estado con la nueva fecha
  }

  const onPressButton = (value: number) => {
    if (value === 0) {
      setShowPicker(true)
    }
    if (value === 1) {
      setShowMonthModal(true)
    }
    setSelectedIndex(value)
  }

  return (
    <>
      <ButtonGroup
        buttons={['DIA', 'MES', 'PERSONALIZADO']}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          onPressButton(value)
        }}
        containerStyle={styles.containerStyle}
        textStyle={styles.textStyle}
        selectedButtonStyle={styles.selectedButtonStyle}
      />
      {showMonthModal && (
        <MonthModal setShowMonthModal={setShowMonthModal} setDates={setDates} />
      )}
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}
      <Text>{getMonthName(dates?.dateFrom).toUpperCase()}</Text>
    </>
  )
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    containerStyle: {
      marginBottom: 20,
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
    },
    textStyle: {
      color: 'white',
    },
    selectedButtonStyle: {
      backgroundColor: '#c004c7',
    },
  })

export default DateButtonGroupSelector
