import { Leg, updateLeg } from './legsSlice'
import { useAppDispatch } from "../../store/hooks"
import { useRadio, useRadioGroup, RadioProps, Box, HStack } from '@chakra-ui/react'


function RadioCard(props: RadioProps) {
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

export default function LegProduct(props: Leg) {
    const dispatch = useAppDispatch()
    const options = ['F', 'BP', 'P', 'C', 'BC']

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: props.product,
        onChange: (val) => dispatch(updateLeg({ ...props, product: val }))
    })
    const group = getRootProps()

    return (
        <HStack {...group} spacing={{ sm: 0, lg: 2 }}>
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

