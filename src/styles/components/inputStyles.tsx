import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const origem = definePartsStyle({
  field: {
    border: '1px solid',
    borderColor: 'gray.200',
    background: 'gray.50',
    borderRadius: '10px',
    height: '56px',

    _dark: {
      borderColor: 'gray.600',
      background: 'gray.800',
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
