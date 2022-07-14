//eslint-disable-next-line
import React,{ useEffect } from 'react'
import {
  Flex,
  Box,
  Spacer,
  ButtonGroup,
  Heading,
  Button,
  useColorModeValue,
  HStack,
  Image,
  VStack,
  Text,
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';


function PortfolioManager() {
  
  useEffect( () => {
    const vt = sellValid();
    if ( !vt ) {
      navigate( "/" );
    } 
  
  }, [])
  let navigate = useNavigate();
  
const handleLogout = ( e ) => {
  e.preventDefault();
  localStorage.clear();
  navigate( "/" );
}
  const sellValid = async () => {
    if ( localStorage.getItem( "token" ) !== undefined ) {
      console.log( localStorage.getItem( "token" ) );
      try {
        const response = await fetch( "http://localhost:9095/validate",{
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem( "token" ),
            'Content-Type': 'application/json',
          },
        } );
        const json = await response.json();
        console.log( json );
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
  const handleCalPortfolio = async (e) => {
    e.preventDefault();
    const pid = localStorage.getItem( "pid" );
    if ( localStorage.getItem( "token" ) !== undefined ) {
      console.log( localStorage.getItem( "token" ) );
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
        if ( json.valid === true ) {
          try {
            const response = await fetch( `http://localhost:8000/NetWorth/calculateNetworth/${pid}`,{
              method: 'GET',
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem( "token" ),
                'Content-Type': 'application/json',
              },
            } );
            const json = await response.json();
            //console.log( json );
            localStorage.setItem( "networth",json );
      navigate("/CalculatePortfolio")
          } catch ( err ) {
            console.log( err );
          }
        } else {
          localStorage.clear();
          alert( "invalid token" );
          navigate( "/" );
        }
      } catch ( err ) {
        console.log( err );
      }
    }
  }

  const handleSellAsset = async ( e ) => {
    e.preventDefault();
    const sv = sellValid();
    if ( sv ) {
      navigate( "/SellAssets" );
    } else {
      navigate( "/" );
    }
    }

  return (
    
    <Box>
      <Flex minWidth='70' alignItems='center' gap='2' paddingTop={5} paddingLeft={5} paddingBottom={3} bg={useColorModeValue('gray.100', 'gray.900')}>
  <Box p='2'>
    <Heading size='md'>Portfolio Manager</Heading>
  </Box>
  <Spacer />
  <ButtonGroup gap='2' paddingRight={10}>
    <Button colorScheme='teal'
    onClick={handleLogout}
    >
      Logout
    </Button> 
  </ButtonGroup>
  </Flex>

     <HStack spacing={200} paddingLeft={200} paddingRight={200} paddingTop={10} paddingBottom={20} alignContent="center" style={{backgroundColor: "#D3EBCD"}}>
      <Box paddingBottom={5} bg='purple.100' border={"1px"} borderRadius={'lg'}>
        <VStack>
          <Box>
            <Image 
              src='./img1.jpg'
              boxSize='350px'
            />
          </Box>
          <Box>
          <Text fontSize='25px' >Calculate Portfolio</Text>
          <Text paddingBottom={2}>Click to view my Portfolio</Text>
          <Button
           colorScheme='gray' variant='solid'
           
           outlineColor={'blackAlpha.400'}
          onClick={handleCalPortfolio}
          >
            Calculate Portfolio
          </Button>
          </Box>
          </VStack>
      </Box>
      
      <Box paddingBottom={5} bg='purple.100' border={"1px"} borderRadius={'lg'}>
        <VStack>
          <Box>
            <Image 
              src='./img2.jpeg'
              boxSize='350px'
            />
          </Box>
          
          <Box display={"box"} alignContent={"center"}>
    
          <Text fontSize='25px' paddingLeft={7}>Sell</Text>
          <Text paddingBottom={2}>Click to sell a stock</Text>
          <Button
           colorScheme='gray' variant='solid'
           
           outlineColor={'blackAlpha.400'}
           onClick={handleSellAsset}
          >
          Sell Stock
          </Button>
        
          </Box>
          
        </VStack>
      </Box >
     </HStack>

     </Box>
   
    
  
  )
}

export default PortfolioManager