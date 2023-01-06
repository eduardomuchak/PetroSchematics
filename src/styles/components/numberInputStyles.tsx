import { numberInputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(numberInputAnatomy.keys);

const origem = definePartsStyle({
  field: {
    fontSize: '14px',
    fontWeight: '400',
    color: '#2D2926',
    border: '1px solid',
    borderColor: 'gray.200',
    borderRadius: '8px',
    height: '56px',
    _placeholder: { color: 'gray.500' },
    _focus: {
      outline: 'solid 2px #1557fd',
      outlineOffset: '-2px',
    },
    _hover: {
      borderColor: 'hsl(0, 0%, 70%)',
      borderWidth: '1px',
    },
  },
});

export const NumberInputStyles = defineMultiStyleConfig({
  variants: { origem },
});
