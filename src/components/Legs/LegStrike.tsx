import { Leg, updateLeg } from './legsSlice'
import { useAppDispatch } from "../../store/hooks"
import { Select } from '@chakra-ui/react'

const strikes = [1500, 1600, 1700, 1800, 1900, 2000]


export default function LegStrike(props: Leg) {
    const dispatch = useAppDispatch()

    return (
        <Select
            minW={'70px'}
            size='xs'
            value={props.strike}
            onChange={(val) => dispatch(updateLeg({ ...props, strike: parseInt(val.target.value) }))}
        >
            {strikes.map(item => <option key={item} value={item}>{item}</option>)}
        </Select>

    )
}

