import { Select } from '@chakra-ui/react'
import { useChains } from 'wagmi'

export default function ChainSelector({ value, onChange }) {
  const chains = useChains()

  return (
    <Select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      maxW="280px"
      cursor="pointer"
      h={'30px'}
      fontSize="lg"
      padding={15}

      bg="linear-gradient(135deg, rgba(102,126,234,0.2), rgba(246,135,179,0.2))"
      border="1px solid rgba(102,126,234,0.3)"
      borderRadius="12px"
      color="white"
      fontWeight="600"

      backdropFilter="blur(10px)"
      WebkitBackdropFilter="blur(10px)"

      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: '0 10px 40px rgba(102,126,234,0.3)',
        borderColor: 'rgba(102,126,234,0.5)',
        bg: 'linear-gradient(135deg, rgba(102,126,234,0.3), rgba(246,135,179,0.3))',
      }}
      _focus={{
        boxShadow: '0 0 0 2px rgba(183,148,246,0.6)',
        borderColor: 'rgba(183,148,246,0.8)',
      }}
      _active={{
        transform: 'translateY(0)',
      }}

      sx={{
        option: {
          background: '#0f1419',
          color: 'white',
        },
        '& option:hover': {
          background: 'rgba(102,126,234,0.3)',
        },
      }}
    >
      {chains.map((chain) => (
        <option key={chain.id} value={chain.id}>
          {chain.name}
        </option>
      ))}
    </Select>
  )
}
