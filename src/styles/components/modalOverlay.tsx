import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  header:{
    backgroundColor:'origem.500',
    borderTopRadius:7,
    display:'flex',
    justifyContent:'center',
    color:'white',
    fontSize:'12px',
    fontWeight:'700',
    padding: "10px 10px"
  },
  body:{
    paddingTop:5,
    paddingBottom:3,
  },
  footer:{
    justifyContent:'center',
  },
  overlay: {
    bg: 'rgba(0,0,0, 0.3)',
    backdropFilter: 'blur(5px)',
  },
  dialog: {
    borderRadius:10,
  },
  closeButton: {
    position: 'absolute',
    top: 1,
    right: 1,
    zIndex: 1,
    color: 'origem.500',
    borderRadius: '50%',
    _hover: {
      color: 'white',
      backgroundColor: "origem.500",
      transition: "all 0.4s",
    },
    _dark: {
      color: 'white',
    },
  }
})

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
})
