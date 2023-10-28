import React from 'react'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'

  // @ts-ignore
function Premium(props) {
  return (
<NumberInput size='xs' value={props.leg.premium} min={0} max={20} minW={"60px"} 
onChange={(val) => props.updateAttribute(props.leg.id, "premium", val)}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
    )
}

export default Premium