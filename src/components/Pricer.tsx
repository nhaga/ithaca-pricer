// @ts-nocheck
import { useState, useEffect } from 'react'
import {
  Box,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Select,
  Switch,
  HStack,
  SimpleGrid,
} from '@chakra-ui/react'
import { BlackScholes } from "../ithacaPricer";


const blackScholes = new BlackScholes();

interface InputProps {
  title: string,
  value: number,
  fn: (value: number) => void,

}

const CustomInput = (props: InputProps) => {
  return (
    <HStack spacing={4} align="center">
      <FormLabel w="40">{props.title}</FormLabel>
      <Input
        w="20"
        type='text'
        onChange={(event: Event) => props.fn((event.target as HTMLInputElement).value)}
        value={props.value}
        bg={'gray.100'}
        border={0}
        color={'gray.500'}
        _placeholder={{
          color: 'gray.500',
        }}
      />
    </HStack>
  )
}


function Pricer() {
  const [optionType, setOptionType] = useState('call')
  const [underlying, setUnderlying] = useState(1800)
  const [strike, setStrike] = useState(1800)
  const [size] = useState(1)
  const [expiry, setExpiry] = useState('1')
  const [sigma, setSigma] = useState(0.485)
  const [rate] = useState(0.0)

  const [option, setOption] = useState(
    blackScholes.option({
      rate,
      sigma,
      strike,
      time: parseInt(expiry) / 52,
      type: optionType,
      underlying,
    })
  )

  useEffect(() => {
    const newOption = blackScholes.option({
      rate,
      sigma,
      strike,
      time: parseInt(expiry) / 52,
      type: optionType,
      underlying,
    });
    setOption(newOption)



  }, [optionType, underlying, strike, size, expiry, sigma, rate])

  return (
    <>
      <SimpleGrid px="6" columns={{ md: 1, lg: 2 }}>

        <Box as={'form'} >
          <Stack spacing={4}>
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='email-alerts' mb='0'>
                Call
              </FormLabel>
              <Switch colorScheme="green" defaultValue={optionType} onChange={() => setOptionType(optionType == 'call' ? 'put' : 'call')} />
              <FormLabel htmlFor='email-alerts' mb='0' ml='5'>
                Put
              </FormLabel>
            </FormControl>
            {/* <CustomInput title='Size' value={size} fn={setSize} /> */}
            <CustomInput title='Underlying' value={underlying} fn={setUnderlying} />
            <CustomInput title='Strike' value={strike} fn={setStrike} />
            <CustomInput title='Sigma' value={sigma} fn={setSigma} />

            <HStack spacing={4} align="center">
              <FormLabel w="40">Expiry</FormLabel>
              <Select
                w="20"
                placeholder='Select expiry'
                defaultValue={expiry} onChange={(val: any) => setExpiry(val.target.value)}
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}

              >
                <option value='1'>1W</option>
                <option value='2'>2W</option>
                <option value='3'>3W</option>
                <option value='4'>4W</option>
              </Select>
            </HStack>
          </Stack>
        </Box>

        <Box as={'form'} mt={{ sm: 0, lg: 10 }} w="52">
          <Stack spacing={2}>

            <HStack spacing={4} align="center">
              <FormLabel w="40">Price</FormLabel>
              <Input readOnly value={option.price.toFixed(2)} />
            </HStack>
            <HStack spacing={4} align="center">
              <FormLabel w="40">Delta</FormLabel>
              <Input readOnly value={option.delta.toFixed(3)} />
            </HStack>
            <HStack spacing={4} align="center">
              <FormLabel w="40">Gamma</FormLabel>
              <Input readOnly value={option.gamma.toFixed(3)} />
            </HStack>
            <HStack spacing={4} align="center">
              <FormLabel w="40">Vega</FormLabel>
              <Input readOnly value={option.vega.toFixed(3)} />
            </HStack>
            <HStack spacing={4} align="center">
              <FormLabel w="40">Theta</FormLabel>
              <Input readOnly value={option.theta.toFixed(3)} />
            </HStack>
          </Stack>
        </Box>
      </SimpleGrid>
    </>

  )
}

export default Pricer