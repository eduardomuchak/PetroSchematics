import { mode } from '@chakra-ui/theme-tools'

export const ButtonStyles = {
  baseStyle: {},
  sizes: {},
  variants: {
    origemSolid: (props: any) => ({
      height: "56px",
      bg: mode("origem.500", "origem.300")(props),
      boxShadow: "0px 6px 6px rgba(2, 57, 195, 0.30)",
      color: mode("white", "white")(props),
      _hover: {
        bg: mode("origem.600", "origem.400")(props),
      },
    }),
  },
  defaultProps: {},
}