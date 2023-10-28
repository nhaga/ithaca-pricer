import { Tr, Td, Select, Switch, Button } from '@chakra-ui/react'
import { Quantity } from './Quantity';
import Product from './Product';
import Premium from './Premium';

export function BuilderRow(props) {
  const strikes = [1500, 1600, 1700, 1800, 1900, 2000]

  return (
    <Tr>
      <Td>
        <Switch
          value={props.leg.long}
          isChecked={props.leg.long}
          colorScheme='green'
          onChange={(val) => props.updateAttribute(props.leg.id, "long", "")} />
      </Td>
      <Td>
        <Quantity updateAttribute={props.updateAttribute} leg={props.leg} />
      </Td>
      <Td>
        <Product updateAttribute={props.updateAttribute} leg={props.leg} />
      </Td>
      <Td>
        <Select minW={'70px'} size='xs' value={props.leg.strike} onChange={(val) => props.updateAttribute(props.leg.id, "strike", val.target.value)} >
          {strikes.map(item => <option key={item} value={item}>{item}</option>)}
        </Select>
      </Td>
      <Td>
        <Premium updateAttribute={props.updateAttribute} leg={props.leg} />
      </Td>
      <Td>
        <Button onClick={() => props.removeLeg(props.leg.id)} size="xs">X</Button>
      </Td>
    </Tr>
  )
}