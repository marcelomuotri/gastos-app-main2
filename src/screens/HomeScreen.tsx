import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native'
import React, { useState } from 'react'
import PieChart from '../components/PieChart'
import Legend from '../components/Legend'
import ProfileModal from '../components/ProfileModal'
import { Button } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { useGetFromEndpointQuery } from '../state/api'
import DateButtonGroupSelector from '../components/DateButtonGroupSelector'

export interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation()

  const [date, setDate] = useState(new Date())
  const { data, isLoading } = useGetFromEndpointQuery({
    endpoint: 'transactions',
  })

  const [profileOpened, setProfileOpened] = useState(false)

  const transactions = data?.data || []

  const handleAddExpense = () => {
    ;(navigation as any).navigate('AddExpense', { transactions })
  }

  const handleOpenProfile = () => {
    setProfileOpened(true)
  }
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <ProfileModal
            isVisible={profileOpened}
            onClose={() => setProfileOpened(false)}
          ></ProfileModal>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.profileButton}
            onPress={handleOpenProfile}
          >
            <Image
              source={require('../../assets/profileAvatar.png')}
              style={styles.profileIcon}
            />
          </TouchableOpacity>
          <DateButtonGroupSelector date={date} setDate={setDate} />
          <PieChart transactions={transactions} />
          <Legend transactions={transactions} />
          <View style={styles.buttonContainer}>
            <Button color="success" buttonStyle={styles.button}>
              Agregar Ingreso
            </Button>
            <Button
              color="red"
              buttonStyle={styles.button}
              onPress={handleAddExpense}
            >
              Agregar Gasto
            </Button>
          </View>
        </>
      )}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    marginRight: 10,
  },
  profileButton: {
    width: 70,
    height: 70,
    position: 'relative',
    top: 25,
    left: 170,
    zIndex: 10,
  },
  profileIcon: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
})
