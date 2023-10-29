// @ts-nocheck
import { useRadio, useRadioGroup, Box, HStack } from '@chakra-ui/react'

function RadioCard(props) {
  const { getInputProps, getRadioProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'gray.600',
          color: 'white',
        }}
        fontSize={10}
        px={2}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  )
}
// @ts-ignore
function Product(props) {
  const options = ['F', 'BP', 'P', 'C', 'BC']

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: props.leg.product,
    onChange: (value) => props.updateAttribute(props.leg.id, "product", value),
  })

  const group = getRootProps()

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        )
      })}
    </HStack>
  )
}



export default Product