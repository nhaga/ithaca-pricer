import { useState, useEffect } from 'react'
import {
    Box,
    Stack,
    Heading,
    Input,
    FormControl,
    FormLabel,
    Select,
    Switch,
    HStack,
  } from '@chakra-ui/react'
import { BlackScholes } from "../ithacaPricer";


const blackScholes = new BlackScholes();


const CustomInput = (props:InputProps) => {
    return (
      <HStack spacing={4} align="center">
      <FormLabel w="40">{ props.title }</FormLabel>
      <Input 
      type='number'
      onChange={(val: number) => props.fn(val.target.value)}
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
    const [size, setSize] = useState(1)
    const [expiry, setExpiry] = useState('1')
    const [sigma, setSigma] = useState(0.485)
    const [rate, setRate] = useState(0.0)
  
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
    <HStack bg={'gray.50'} px="6" spacing={"20"}>

        <Box as={'form'} >
        <Stack spacing={4}>
            <FormControl display='flex' alignItems='center'>
            <FormLabel htmlFor='email-alerts' mb='0'>
                Call
            </FormLabel>
            <Switch defaultValue='optionType' onChange={() => setOptionType(optionType == 'call' ? 'put' : 'call')}/>
            <FormLabel htmlFor='email-alerts' mb='0' ml='5'>
                Put
            </FormLabel>
        </FormControl>
        {/* <CustomInput title='Size' value={size} fn={setSize} /> */}
            <CustomInput title='Underlying'  value={underlying} fn={setUnderlying} />
            <CustomInput title='Strike'  value={strike} fn={setStrike} />
            <CustomInput title='Sigma'  value={sigma} fn={setSigma} />

            <HStack spacing={4} align="center">
            <FormLabel w="40">Expiry</FormLabel>
            <Select 
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

        <Box as={'form'} mt={10} w="52">
            <Stack spacing={2}>

            <HStack spacing={4} align="center">
            <FormLabel w="40">Price</FormLabel>
            <Input readOnly value={option.price.toFixed(2)}/>
            </HStack>
            <HStack spacing={4} align="center">
            <FormLabel w="40">Delta</FormLabel>
            <Input readOnly value={option.delta.toFixed(3)}/>
            </HStack>
            <HStack spacing={4} align="center">
            <FormLabel w="40">Gamma</FormLabel>
            <Input readOnly value={option.gamma.toFixed(3)}/>
            </HStack>
            <HStack spacing={4} align="center">
            <FormLabel w="40">Vega</FormLabel>
            <Input readOnly value={option.vega.toFixed(3)}/>
            </HStack>
            <HStack spacing={4} align="center">
            <FormLabel w="40">Theta</FormLabel>
            <Input readOnly value={option.theta.toFixed(3)}/>
            </HStack>
            </Stack>
            </Box>
    </HStack>
    </>
    
  )
}

export default Pricer