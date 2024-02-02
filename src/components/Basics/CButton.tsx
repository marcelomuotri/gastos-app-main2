import { Button } from '@rneui/base'
import { useTheme } from '@rneui/themed'
import React from 'react'
import { StyleSheet } from 'react-native'

interface iButton {
  label: string
  handlePress: () => void
}

const CButton: React.FC<iButton> = ({ label, handlePress }) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  return (
    <Button
      title={label}
      onPress={handlePress}
      buttonStyle={styles.addButton}
      titleStyle={styles.buttonText}
    />
  )
}

export default CButton

const createStyles = (theme: any) =>
  StyleSheet.create({
    addButton: {
      backgroundColor: theme.colors.primary,
      marginVertical: 10,
      borderRadius: 8,
      paddingVertical: 12,
    },
    buttonText: {
      fontSize: 18,
    },
  })
