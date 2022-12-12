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
    borderRadius: '8px',
    height: '56px',
    _placeholder: { color: "gray.500" },
    _focus: {
      borderColor: '#64A1DA',
      boxShadow: '0 0 0 1px #64A1DA',
    }
  },
})

export const InputStyles = defineMultiStyleConfig({
  variants: { origem },
})
