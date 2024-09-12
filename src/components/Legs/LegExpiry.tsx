import { Leg, updateLeg } from './legsSlice'
import { useAppDispatch } from "../../store/hooks"
import { Select } from '@chakra-ui/react'

const strikes = [7, 14, 21, 30]


export default function LegExpiry(props: Leg) {
    const dispatch = useAppDispatch()

    return (
        <Select
            minW={'70px'}
            size='xs'
            value={props.expiry}
            onChange={(val) => dispatch(updateLeg({ ...props, expiry: parseInt(val.target.value) }))}
        >
            {strikes.map(item => <option key={item} value={item}>{item}</option>)}
        </Select>

    )
}

