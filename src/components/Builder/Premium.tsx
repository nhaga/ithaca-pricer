// @ts-nocheck

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

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