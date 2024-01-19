import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { VictoryPie } from 'victory-native'
import { iTransaction } from '../types'
import { groupTransactionsByCategory } from '../utils/transactions'

const PieChart = (transactionsData: any) => {
  if (!transactionsData || transactionsData.length === 0) {
    return null // No renderizar nada si transactions es undefined o está vacío
  }
  const { transactions } = transactionsData
  const groupedData = groupTransactionsByCategory(transactions)
  const colorScale = groupedData.map((item) => item.color)
  const totalAmount = groupedData.reduce((acc, item) => acc + item.price, 0)

  return (
    <View style={styles.container}>
      <VictoryPie
        data={groupedData}
        x="category" // Property representing the category
        y="price" // Property representing the value
        labels={() => null}
        colorScale={colorScale} // Paleta de colores más claros
        innerRadius={80} // Inner radius (0 for a complete circle)
        padAngle={() => 3}
        animate={{
          duration: 2000, // Duración de la animación en milisegundos
          onLoad: { duration: 1000 }, // Duración de la animación cuando se carga el gráfico
          easing: 'bounce', // Tipo de animación (puedes probar con diferentes valores)
          onExit: {
            duration: 1000,
            before: () => ({ opacity: 0.3, _y: 0 }),
          },
        }}
      />
      <View style={styles.totalAmountContainer}>
        <Text style={styles.totalAmountText}>${totalAmount}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'relative',
  },
  totalAmountContainer: {
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  totalAmountText: {
    fontSize: 24, // O cualquier tamaño que te parezca adecuado
    fontWeight: 'bold',
  },
})

export default PieChart
