import { useTheme } from '@rneui/themed'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface iHeaderProps {
  title: string
}

const Header: React.FC<iHeaderProps> = ({ title }) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  )
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
      height: 60,
      backgroundColor: theme.colors.primary,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
    },
    headerText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
  })

export default Header
