// eslint-disable-next-line
import React, { useEffect } from 'react'
import {
  Flex,
  Box,
  Spacer,
  ButtonGroup,
  Heading,
  Button,
  useColorModeValue,
  Image,
  VStack,
  Text,
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom'


function CalculatePortfolio() {
  useEffect(() => {
    const vt = validToken();
    if ( !vt ) {
      navigate( "/" );
    }
    
  
  }, [])
  const validToken = async () => {
    if ( localStorage.getItem( "token" ) !== undefined ) {
      //console.log( localStorage.getItem( "token" ) );
      try {
        const response = await fetch( "http://localhost:9095/validate",{
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem( "token" ),
            'Content-Type': 'application/json',
          },
        } );
        const json = await response.json();
        //console.log( json );
        if ( response.ok ) {
          //console.log( json.valid );
          return json.valid;
        } if ( response.status === 403 ) {
          console.log( json.valid );
          navigate( "/" );
        }
        else {
          navigate( "/" );
        }
      } catch ( err ) {
        console.log( err );
      }
    } else {
      navigate( "/" );
    }
  }
  let navigate = useNavigate();
  const networth = localStorage.getItem( "networth" );
  return (
    <Box>
      <nav>
    <Flex minWidth='70' alignItems='center' gap='2' paddingTop={5} paddingLeft={5} paddingBottom={3} bg={useColorModeValue('gray.100', 'gray.900')}>
<Box p='2'>
  <Heading size='md'>Portfolio Manager</Heading>
</Box>
<Spacer />
<ButtonGroup gap='2' paddingRight={10}>
  <Button colorScheme='teal'
              onClick={ () => {
                localStorage.removeItem( "networth" );
    navigate('/PortfolioManager');
  }}
  >
    Home
  </Button> 
</ButtonGroup>
</Flex>
      </nav>
    
    <Flex paddingTop={10} paddingLeft={430} paddingRight={300} style={{backgroundColor:"#FFE5B4"}}>
      <Box paddingBottom={5} bg='purple.200' border={"1px"} borderRadius={'lg'}>
        <VStack>
          <Box>
            <Image 
              src='./img3.jpeg'
              boxSize='400px'
            />
          </Box>
          <Box>
          <Text fontSize='25px'>Calculate Networth</Text>
              <Text>Your Networth is { networth }</Text>
          
          </Box>
          </VStack>
      </Box>
      </Flex>
      </Box>
    

  )
}

export default CalculatePortfolio