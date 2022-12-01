import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const origem = definePartsStyle({
  field: {
    fontSize: "14px",
    fontWeight: "400",
    color: "#2D2926",
    border: '1px solid',
    borderColor: 'gray.200',
    background: 'gray.50',
    borderRadius: '10px',
    height: '56px',
    _placeholder: { color: "gray.500" },

    _dark: {
      borderColor: 'gray.600',
      background: 'gray.800',
      color: 'white',
    },
  },
  addon: {
    border: '1px solid',
    borderColor: 'gray.200',
    background: 'gray.200',
    borderRadius: '10px',
    color: 'gray.500',

    _dark: {
      borderColor: 'gray.600',
      background: 'gray.600',
      color: 'gray.400',
    },
  },
})

export const InputStyles = defineMultiStyleConfig({
  variants: { origem },
})
