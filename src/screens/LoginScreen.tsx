import { StyleSheet, View } from 'react-native'
import { Input, Button, Text, Image } from 'react-native-elements'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@rneui/themed'
import { useAuthService } from '../state/services/authService'
import { useSelector } from 'react-redux'
import { RootState } from '../types'

export interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const { theme } = useTheme()
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [incorrectLogin, setIncorrectLogin] = useState(false)

  const authenticated = useSelector((state: RootState) => !!state.auth.user)
  const { loginUser } = useAuthService()

  useEffect(() => {
    goToHomeScreen()
  }, [])

  const goToHomeScreen = () => {
    if (authenticated) {
      ;(navigation as any).navigate('HomeScreen')
    }
  }

  const handleLogin = async () => {
    const successLogin = await loginUser({ email, password })
    if (successLogin) goToHomeScreen()
    setIncorrectLogin(!successLogin)
  }

  const handleCreateUser = () => {}

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo-demo.png')} // Asegúrate de cambiar esto por la ruta real de tu imagen
        style={styles.logo}
      />
      <Text h3 style={styles.title}>
        Iniciar Sesión
      </Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        leftIcon={{ type: 'material', name: 'email' }}
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        leftIcon={{ type: 'material', name: 'lock' }}
      />
      <Button
        title="Iniciar Sesión"
        onPress={handleLogin}
        //buttonStyle={{ backgroundColor: theme.colors.primary }}
      />
      <Button
        title="Crear nuevo usuario"
        onPress={handleCreateUser}
        buttonStyle={styles.newUser}
      />
      {incorrectLogin && (
        <Text style={styles.incorrectPassword}>
          {' '}
          El usuario o contraseña con incorrectos
        </Text>
      )}
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  newUser: {
    marginTop: 20,
  },
  incorrectPassword: {
    marginTop: 20,
    color: 'red',
  },
})
