import { useContractRead, useAccount, erc20ABI } from 'wagmi'
import { formatUnits } from 'viem'

function USDCBalance() {
  const { address } = useAccount()
  const { data } = useContractRead({
    address: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
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

export default USDCBalance