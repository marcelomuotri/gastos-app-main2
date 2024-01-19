import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { iTransaction } from '../types'
import { groupTransactionsByCategory } from '../utils/transactions'
import { ListItem, Icon } from 'react-native-elements'
import { useDeleteEntityMutation } from '../state/api'
import ConfirmationModal from './ConfimationModal'
import ConfirmationSuccessModal from './ConfirmationSuccessModal'

type iLegendProps = {
  transactions: iTransaction[]
}

const Legend: React.FC<iLegendProps> = ({ transactions }) => {
  const groupedTransactions = groupTransactionsByCategory(transactions)
  const [selectedTransaction, setSelectedTransaction] = useState('')
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [successModalVisible, setSuccessModalVisible] = useState(false)

  const [deleteTransaction, { isLoading }] = useDeleteEntityMutation()

  const onDeleteTransaction = async () => {
    setModalVisible(true)
    try {
      await deleteTransaction({
        endpoint: 'transactions',
        id: selectedTransaction,
      })
      setExpandedIndex(null)
    } catch (error) {
      console.log('delete failed')
    }
    setModalVisible(false)
    setSuccessModalVisible(true)
  }

  const onPressDelete = (id: string) => {
    setModalVisible(true)
    setSelectedTransaction(id)
  }

  return (
    <>
      {isLoading && <ActivityIndicator size="large" />}
      <ConfirmationSuccessModal
        isVisible={successModalVisible}
        onClose={() => setSuccessModalVisible(false)}
      />
      <ConfirmationModal
        isVisible={modalVisible}
        title="Confirmación"
        message="¿Estás seguro de que quieres eliminar la transacción?"
        onConfirm={() => onDeleteTransaction()}
        onCancel={() => setModalVisible(false)}
      />
      <ScrollView style={styles.container}>
        {groupedTransactions.map((item, index) => (
          <ListItem.Accordion
            key={index}
            content={
              <View style={styles.accordionHeader}>
                <View
                  style={[styles.colorBox, { backgroundColor: item.color }]}
                />
                <ListItem.Content>
                  <ListItem.Title>
                    {item.category} - ${item.price.toFixed(2)}
                  </ListItem.Title>
                </ListItem.Content>
              </View>
            }
            isExpanded={expandedIndex === index}
            onPress={() => {
              setExpandedIndex(expandedIndex !== index ? index : null)
            }}
          >
            {transactions
              .filter((t) => t.category.name === item.category)
              .map((transaction, tIndex) => (
                <ListItem key={tIndex} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title style={styles.subItem}>
                      {transaction.description}
                    </ListItem.Title>
                    <ListItem.Subtitle style={styles.subItem}>
                      ${transaction.amount.toFixed(2)}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <Icon
                    name="close"
                    type="antdesign"
                    onPress={() => onPressDelete(transaction._id)}
                  />
                </ListItem>
              ))}
          </ListItem.Accordion>
        ))}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  accordionHeader: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3.5,
    paddingHorizontal: 2,
  },
  subItem: {
    fontSize: 13,
  },
})

export default Legend
