import { IconButton } from '@chakra-ui/react'
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'
import { useContractWrite } from 'wagmi'
import USYCTeller from '../../abis/USYCTeller.json'
import { parseUnits } from 'viem'

export default function USYCDeposit() {
  const { write: deposit } = useContractWrite({
    address: '0xE182E029462c848cfa0AdD4ceC2563306FA3a787',
    abi: USYCTeller,
    functionName: 'buy',
    args: [parseUnits('1', 6)],
  })

  const { write: withdraw } = useContractWrite({
    address: '0xE182E029462c848cfa0AdD4ceC2563306FA3a787',
    abi: USYCTeller,
    functionName: 'sell',
    args: [parseUnits('1', 6)],
  })


  return (
    <>
      <IconButton aria-label='Search database' onClick={() => withdraw()} icon={<ArrowBackIcon />} />
      <IconButton aria-label='Search database' onClick={() => deposit()} icon={<ArrowForwardIcon />} />

    </>
  )
}
