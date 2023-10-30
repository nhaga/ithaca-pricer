import { Switch } from '@chakra-ui/react'
import { Leg, updateLeg } from './legsSlice'
import { useAppDispatch } from "../../store/hooks"

export default function LegSide(props: Leg) {
    const dispatch = useAppDispatch()
    return (
        <Switch
            value={props.long ? 1 : 0}
            isChecked={props.long}
            colorScheme='green'
            onChange={() => dispatch(updateLeg({ ...props, long: !props.long }))}
        />

    )
}