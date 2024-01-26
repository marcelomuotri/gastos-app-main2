import React from 'react'
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { ListItem } from 'react-native-elements'
import { getFirstDayByMonth, getLastDayByMonth } from '../utils/dates'
import { months } from '../utils/constants'
import { DateAverage } from './DateButtonGroupSelector'

type MonthProps = {
  setDates: ({ dateFrom, dateTo }: DateAverage) => void
  setShowMonthModal: (prop: boolean) => void
}

const MonthModal: React.FC<MonthProps> = ({ setDates, setShowMonthModal }) => {
  const onHandleMonth = (month: number) => {
    setDates({
      dateFrom: getFirstDayByMonth(month),
      dateTo: getLastDayByMonth(month),
    })
    setShowMonthModal(false)
  }

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.container}>
        {months.map(({ month, index }) => (
          <TouchableOpacity key={index} onPress={() => onHandleMonth(index)}>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{month}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  )
}

const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.7, // 50% del ancho de la pantalla
    alignSelf: 'center',
  },
})

export default MonthModal
