import { Leg, updateLeg } from './legsSlice'
import { useAppDispatch } from "../../store/hooks"
import { useNumberInput, HStack, Button, Input } from '@chakra-ui/react'
import { Show } from '@chakra-ui/react'


export default function LegPremium(props: Leg) {
    const dispatch = useAppDispatch()
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 0.5,
            defaultValue: 0.5,
            min: 0,
            max: 10,
            isReadOnly: false,
            onChange: (value) => dispatch(updateLeg({ ...props, premium: parseInt(value) }))
        })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()


    return (
        <HStack>
            <Show above='lg'>
                <Button size='xs' {...inc}>+</Button>
            </Show>
            <Input minW='50px' size='sm' {...input} value={props.premium} />
            <Show above='lg'>
                <Button size='xs' {...dec}>-</Button>
            </Show>
        </HStack>
    )
}

