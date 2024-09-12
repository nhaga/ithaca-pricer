import { Leg, updateLeg } from './legsSlice'
import { useAppDispatch } from "../../store/hooks"
import { Select } from '@chakra-ui/react'

const strikes = [2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000]


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

