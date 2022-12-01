import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  overlay: {
    bg: 'rgba(0,0,0, 0.3)',
    backdropFilter: 'blur(5px)',
  },
  dialog: {},
  closeButton: {
    position: 'absolute',
    top: 2,
    right: 2,
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
