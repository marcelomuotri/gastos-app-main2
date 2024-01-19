import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Button, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'

interface CategoryButtonProps {
  label: string
  iconName: string
  selected: boolean
  onPress: () => void
  color: string
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  label,
  iconName,
  selected,
  onPress,
  color,
}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <LinearGradient
      colors={[color, color]}
      style={{
        padding: 10,
        borderRadius: 5,
        margin: 5,
        flexBasis: '33%',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: selected ? 1 : 0.7,
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Icon name={iconName} size={30} color="white" />
      <Text style={{ color: 'white', marginTop: 5 }}>{label}</Text>
    </LinearGradient>
  </TouchableOpacity>
)

export default CategoryButton
