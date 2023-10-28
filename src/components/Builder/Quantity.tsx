import React from 'react'
import { useNumberInput, HStack, Button, Input } from '@chakra-ui/react'

export function Quantity(props) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 50000,
      precision: 0,
      isReadOnly: false,
      onChange: (value) => props.updateAttribute(props.leg.id, "quantity", value)
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  return (
    <HStack>
      <Button size='xs' {...inc}>+</Button>
      <Input minW='50px' size='sm' {...input} onChange={(val) => console.log(val)} />
      <Button size='xs' {...dec}>-</Button>
    </HStack>
  )
}

