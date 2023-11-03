import { useContractRead, useAccount, erc20ABI } from 'wagmi'
import { formatUnits } from 'viem'

export default function USYCBalance() {
  const { address } = useAccount()
  const { data } = useContractRead({
    address: '0xb265020C1E8841b0e16e2f8E8d21D2B45ab2df42',
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    watch: true
  })
  return (
    <>
      {data && formatUnits(data, 6)}
    </>
  )
}
