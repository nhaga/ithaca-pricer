import { Leg, updateLeg } from './legsSlice'
import { useAppDispatch } from "../../store/hooks"
import { useNumberInput, HStack, Button, Input } from '@chakra-ui/react'
import { Show } from '@chakra-ui/react'


export default function LegQuantity(props: Leg) {
    const dispatch = useAppDispatch()
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: 1,
            min: 1,
            max: 50000,
            precision: 0,
            isReadOnly: false,
            onChange: (value) => dispatch(updateLeg({ ...props, quantity: parseInt(value) }))
        })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()


    return (
        <HStack>
            <Show above='lg'>
                <Button size='xs' {...inc}>+</Button>
            </Show>
            <Input minW='50px' size='sm' {...input} value={props.quantity} />
            <Show above='lg'>
                <Button size='xs' {...dec}>-</Button>
            </Show>
        </HStack>
    )
}

