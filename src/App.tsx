'use client'

import {
  Box,
  Stack,
  Heading,
  Container,
  Input,
  SimpleGrid,
  FormControl,
  FormLabel,
  Select,
  Switch,
  HStack,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { BlackScholes, Option } from "./ithacaPricer";


interface InputProps {
  title: string,
  placeholder: string,
  value: number,
  fn: (value: number) => void,

}

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

const blackScholes = new BlackScholes();


export default function JoinOurTeam() {
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
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}>
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
            Ithaca Pricer
          </Heading>
          <Box as={'form'}>
            <Stack spacing={4}>
              <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor='email-alerts' mb='0'>
                  Call
                </FormLabel>
              <Switch id='email-alerts' onChange={() => setOptionType(optionType == 'call' ? 'put' : 'call')}/>
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
                value={expiry} onChange={(val: any) => setExpiry(val.target.value)}
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

        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}>
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Output
            </Heading>
          </Stack>
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
            <HStack spacing={4} align="center">
                <FormLabel w="40">Price</FormLabel>
                <Input value={option.price.toFixed(2)}/>
              </HStack>
              <HStack spacing={4} align="center">
                <FormLabel w="40">Delta</FormLabel>
                <Input value={option.delta.toFixed(3)}/>
              </HStack>
              <HStack spacing={4} align="center">
                <FormLabel w="40">Gamma</FormLabel>
                <Input value={option.gamma.toFixed(3)}/>
              </HStack>
              <HStack spacing={4} align="center">
                <FormLabel w="40">Vega</FormLabel>
                <Input value={option.vega.toFixed(3)}/>
              </HStack>
              <HStack spacing={4} align="center">
                <FormLabel w="40">Theta</FormLabel>
                <Input value={option.theta.toFixed(3)}/>
              </HStack>



            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}