import { useGetFromEndpointQuery } from '../api'

const base = 'transactions'

const useGetTransactionsQuery = ({ filters }) => {
  const { data, error, isLoading } = useGetFromEndpointQuery({
    endpoint: base,
    filters: filters,
  })

  return { data, error, isLoading }
}

export default useGetTransactionsQuery
