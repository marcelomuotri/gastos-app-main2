import { createTheme } from '@rneui/themed'

const theme = createTheme({
  components: {
    Button: {
      buttonStyle: {
        backgroundColor: 'red', // Establece el color de fondo del botón a rojo
      },
      raised: true,
    },
  },
  colors: {
    primary: 'blue',
    background: '#f0f0f0', // Tu color de fondo global
  },
})

export default theme
