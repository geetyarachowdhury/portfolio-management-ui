import React, {useEffect, useState} from 'react'

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
  Checkbox,
  Input,
  TableContainer,
  Thead,
  Table,
  Th,
  Tr,
  Tbody,
  Td,

} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';

function SellAssets() {
  useEffect( () => {
    const vt = sellValid();
    if ( !vt ) {
      navigate( "/" );
    } 
  
  }, [])
  let navigate = useNavigate();
  const [ details,setdetails ] = useState( { abc: 0,amz: 0,axis: 0,ggl: 0,sbi: 0 } );
  const [ stockDetails,setstockDetails ] = useState( {ABC: 0, AMZ: 0, GGL: 0} );
  const [ mutualDetails,setmutualDetails ] = useState( { AXIS: 0,SBI: 0 } );
  const [ checkDetails,setcheckDetails ] = useState( { abc: false,amz: false,axis: false,ggl: false,sbi: false } );
  
  
  const handleOnChange = ( e ) => {
    console.log( e );
    setdetails( { ...details, [ e.target.name ]: e.target.value } );
    
    //console.log( stockDetails );
  //console.log( mutualDetails );
    
    
  }

  console.log( details );
  const checkBoxValueMapping = (e) => {
    if ( checkDetails.abc && e.target.name === "abc") {
      setstockDetails( {...stockDetails, ABC : details.abc} );
    } else if ( checkDetails.amz && e.target.name === "amz") {
      setstockDetails( {...stockDetails, AMZ : details.amz} );
    } else if ( checkDetails.ggl && e.target.name === "ggl") {
      setstockDetails( {...stockDetails, GGL : details.ggl}  );
    } else if ( checkDetails.axis && e.target.name === "axis") {
      setmutualDetails( {...mutualDetails, AXIS : details.axis} );
    } else if ( checkDetails.sbi && e.target.name === "sbi") {
      setmutualDetails( {...mutualDetails, SBI : details.sbi} );
    }
   }
  
  const checkBoxHandler = (e) => {
    //console.log( "message ");
    setcheckDetails( { ...checkDetails,[ e.target.name ]: e.target.checked } );
  }
  
  console.log( stockDetails );
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
  const numberFunc = ( objt ) => Object.keys( objt ).reduce( ( acc,curr ) => ( { ...acc,[ curr ]: Number( objt[ curr ] ) } ),{} );
  //console.log( numberFunc( mutualDetails ) );
  const handleClick = async (e) => {
    numberFunc( details ) ;
    numberFunc( stockDetails ) ;
    numberFunc( mutualDetails );
    console.log(numberFunc( details )) ;
    console.log(numberFunc( stockDetails )) ;
    console.log( numberFunc( mutualDetails ) );
    validation();
    e.preventDefault();
    const userid = localStorage.getItem( "pid" );
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
            const response = await fetch( "http://localhost:8000/NetWorth/SellAssets",{
              method: 'POST',
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem( "token" ),
                'Content-Type': 'application/json',
              },
              body: JSON.stringify( { pid: userid,stockIdList: stockDetails,mfAssetList: mutualDetails } )
            } );
            const data = await response.json();
            console.log("data: " +data );
            localStorage.setItem( "networth",data );
            if ( validation() ) {
              navigate( "/CalculatePortfolio" )
            } else {
              navigate( "/SellAssets" );
            }
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
  const validation = () => {
    if ( stockDetails.AMZ < 0 ) {
      alert( "invalid input" );
      return false;
    } else if ( stockDetails.ABC < 0 ) {
      alert( "invalid input" );
      return false;
    } else if ( stockDetails.AXIS < 0 ) {
      alert( "invalid input" );
      return false;
    } else if ( stockDetails.GGL < 0 ) {
      alert( "invalid input" );
      return false;
    } else if ( stockDetails.SBI < 0 ) {
      alert( "invalid input" );
      return false;
    } else {
      return true;
    }
  }

  return (
    <Box >
            <nav>
          <Flex minWidth='70' alignItems='center' gap='2' paddingTop={5} paddingLeft={5} paddingBottom={3} bg={useColorModeValue('grey.200', 'gray.900')}>
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
      </Flex >
          </nav>
      <Flex paddingTop={10} paddingLeft={500} paddingRight={300} paddingBottom={50} backgroundColor={"purple.100"}>
      <Box  border={"1px"} borderRadius={'lg'} backgroundColor={"white"}>
        <VStack>
          <Box>
            <Image 
              src='./img4.jpeg'
              boxSize='420px'
            />
          </Box>
          <Box paddingBottom={5}>
          <Text fontSize='25px' paddingLeft={120}>Sell Assets</Text>
          <Text paddingBottom={3}  paddingLeft={20}>Select the assets you want to sell</Text>
          <VStack>
            <Box>
            <TableContainer >
            <Table variant='simple' size={"sm"}>
              
              <Thead>
                <Tr>
                  <Th>Asset Name</Th>
                  <Th>Units to be sold</Th>
                  
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>   <Checkbox onChange={checkBoxHandler} name="abc" borderColor={'black'} paddingRight={20}>ABC</Checkbox></Td>
                          <Td>   <Input onChange={ handleOnChange} onKeyUp={checkBoxValueMapping} disabled={!checkDetails.abc} name="abc" type={ 'number' } borderColor={ 'black' } value={ details.abc} /></Td>
                 
                </Tr>
                <Tr>
                  <Td>   <Checkbox onChange={checkBoxHandler} name="amz" borderColor={'black'} paddingRight={20}>AMZ</Checkbox></Td>
                          <Td>   <Input onChange={ handleOnChange } onKeyUp={checkBoxValueMapping} disabled={!checkDetails.amz} name="amz" type={ 'number' } borderColor={ 'black' } value={ details.amz} /></Td>
                 
                </Tr>
                <Tr>
                  <Td>   <Checkbox onChange={checkBoxHandler} name="axis" borderColor={'black'} paddingRight={20}>AXIS</Checkbox></Td>
                          <Td>   <Input onChange={ handleOnChange } onKeyUp={checkBoxValueMapping} disabled={!checkDetails.axis} name="axis" type={ 'number' } borderColor={ 'black' } value={ details.axis} /></Td>
                 
                </Tr>
                <Tr>
                  <Td>   <Checkbox onChange={checkBoxHandler} name="ggl" borderColor={'black'} paddingRight={20}>GGL</Checkbox></Td>
                          <Td>   <Input onChange={ handleOnChange } onKeyUp={checkBoxValueMapping} disabled={!checkDetails.ggl} name="ggl" type={ 'number' } borderColor={ 'black' } value={ details.ggl} /></Td>
                 
                </Tr>
                <Tr>
                  <Td>   <Checkbox onChange={checkBoxHandler}  name="sbi" borderColor={'black'} paddingRight={20}>SBI</Checkbox></Td>
                          <Td>   <Input onChange={ handleOnChange } onKeyUp={checkBoxValueMapping} disabled={!checkDetails.sbi} name="sbi" type={ 'number' } borderColor={ 'black' } value={ details.sbi} /></Td>
                 
                </Tr>
              </Tbody>
              
            </Table>
              </TableContainer>
            </Box>
            <Button
             colorScheme='blue' variant='solid'
            // outlineColor={'blackAlpha.400'}
             onClick={handleClick}
            >
              Networth
            </Button>
          </VStack>
          
          </Box>
          </VStack>
      </Box>
      </Flex>
    </Box>
  )
}

export default SellAssets