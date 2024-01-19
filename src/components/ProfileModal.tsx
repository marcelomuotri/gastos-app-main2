import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Overlay, Button, Icon, Avatar } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { RootState } from '../types'
import { useNavigation } from '@react-navigation/native'
import { useAuthService } from '../state/services/authService'

type iProfileModalProps = {
  isVisible: boolean
  onClose: () => void
}
const ProfileModal: React.FC<iProfileModalProps> = ({ isVisible, onClose }) => {
  const { logoutUser } = useAuthService()
  const navigation = useNavigation()
  const authenticated = useSelector((state: RootState) => state.auth.user)
  console.log(authenticated)
  const userName = authenticated?.name ?? 'unknown'
  const userAvatar =
    'https://ui-avatars.com/api/?name=Jon+Snow&background=0D8ABC&color=fff&size=128'
  const defaultAvatar =
    'https://ui-avatars.com/api/?name=Jon+Snow&background=0D8ABC&color=fff&size=128'

  const onLogout = () => {
    ;(navigation as any).navigate('LoginScreen')
    logoutUser()
  }
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onClose}
      overlayStyle={styles.overlay}
    >
      <View style={styles.modalView}>
        <Avatar
          size="large"
          rounded
          source={{ uri: userAvatar || defaultAvatar }}
          containerStyle={styles.avatar}
        />
        <Text style={styles.modalTitle}>Perfil de Usuario</Text>
        <Text style={styles.userName}>Hola {userName}!</Text>
        <Button
          title="Cerrar Sesión"
          buttonStyle={styles.logoutButton}
          titleStyle={styles.buttonTitle}
          onPress={() => {
            onLogout()
          }}
          icon={
            <Icon name="logout" type="material-community" color="#ffffff" />
          }
        />

        {/* Botón para cerrar el modal */}
        <Button
          title="Cerrar"
          buttonStyle={styles.closeButton}
          titleStyle={styles.buttonTitle}
          onPress={onClose}
        />
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  overlay: {
    width: '90%',
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  modalView: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  avatar: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 18,
    marginBottom: 25,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    width: 200,
  },
  closeButton: {
    backgroundColor: '#4caf50',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 200,
  },
  buttonTitle: {
    color: '#ffffff',
    fontSize: 16,
  },
})

export default ProfileModal
