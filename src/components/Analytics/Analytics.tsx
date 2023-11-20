import { 
    SimpleGrid,
    Grid,
    GridItem,
    Box,
    VStack,
    Stat,
    StatLabel,
    StatNumber,
    Heading,
    useColorModeValue
} from "@chakra-ui/react"
import TradeCount from "./TradeCount"
import OpenInterest from "./OpenInterest"
import TradingVolumes  from "./TradingVolumes"
import MaxPain from "./MaxPain"

export default function Analytics() {
    const bg = useColorModeValue('green.50', 'gray.800');


  return (
    <Box>
    <Grid templateRows='repeat(4, 1fr)' templateColumns='repeat(5, 1fr)' gap={8} maxHeight={"500px"}>

        <GridItem rowSpan={4} colSpan={1}>
        <VStack spacing={8} align={"start"}>
                <Box bg={bg} p="4" rounded={"xl"} boxShadow='xs' w="100%">
                    <Stat>
                        <StatLabel>Total Trading Volume</StatLabel>
                        <StatNumber>583.1k</StatNumber>
                        {/* <StatHelpText>Feb 12 - Feb 28</StatHelpText> */}
                    </Stat>
                </Box>
                <Box bg={bg} p="4" rounded={"xl"} boxShadow='xs' w="100%">
                <Stat>
                    <StatLabel>Total Contracts Traded</StatLabel>
                    <StatNumber>3.1k</StatNumber>
                    {/* <StatHelpText>Feb 12 - Feb 28</StatHelpText> */}
                </Stat>
                </Box>
                <Box bg={bg} p="4" rounded={"xl"} boxShadow='xs' w="100%">
                    <Stat>
                        <StatLabel>Total Value Locked (TVL)</StatLabel>
                        <StatNumber>583M</StatNumber>
                        {/* <StatHelpText>Feb 12 - Feb 28</StatHelpText> */}
                    </Stat>
                </Box>
                <Box bg={bg} p="4" rounded={"xl"} boxShadow='xs' w="100%">
                <Stat>
                    <StatLabel>Open Interest</StatLabel>
                    <StatNumber>283.1k</StatNumber>
                    {/* <StatHelpText>Feb 12 - Feb 28</StatHelpText> */}
                </Stat>
                </Box>

            </VStack>
        </GridItem>




        <GridItem colSpan={4} rowSpan={4}>
        <Box bg={bg} rounded={"xl"} boxShadow='xs' h="100%" p="8">
            <Heading fontSize={"md"} mb="4">
                Trades
            </Heading>
            <TradeCount />
            <Box py="4">

            </Box>
        </Box>

        </GridItem>

    </Grid>

    <SimpleGrid columns={2} spacing={10} mt="6">
        <Box bg={bg} p="8" rounded="xl" h="96">
        <Heading fontSize={"md"} mb="4">
                Open Interest
            </Heading>
            <OpenInterest />
        </Box>
        <Box  bg={bg}  p="8" rounded="xl" h="96">
        <Heading fontSize={"md"} mb="4">
                Trading Volumes
            </Heading>
            <TradingVolumes />
        </Box>

    </SimpleGrid>
    <SimpleGrid columns={1} spacing={10} mt="8">
        <Box h="96" bg={bg} rounded="xl" p="8">
        <Heading fontSize={"md"} mb="4">
                Trading Volumes
            </Heading>
            <MaxPain />
        </Box>
    </SimpleGrid>


    </Box>
  )
}
