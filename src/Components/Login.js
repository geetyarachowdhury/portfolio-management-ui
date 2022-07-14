import React, {useState} from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
  Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
//import axios from "axios";
function Login() {
  let navigate = useNavigate();

  const initialState = {
    username: "",
    password: "",
  };

  const [ state,setState ] = useState( initialState );

  const handleClick = async ( event ) => {
    event.preventDefault();
   
    console.log( state.username,state.password );
    console.log( JSON.stringify( { userid: state.username,upassword: state.password } ) );
    
    if ( state.username !== "" && state.password !== "" ) {
      try {
        const response = await fetch( "http://localhost:9095/login",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( { userid: state.username,upassword: state.password } )
        } );
        const json = await response.json();
        //console.log( json );
        if ( json.authToken !== undefined ) {
          //console.log( json.authToken );
          localStorage.setItem( 'token',json.authToken );
          localStorage.setItem( 'pid',json.userid );
          // setTimeout( () => {
          //   if ( localStorage.getItem( 'token' ) != null ) {
          //     localStorage.removeItem( 'token' );
          //   } else {
          //     alert( "token expired" );
          //     navigate("/");
          //   }
          // },1000 * 60 * 15 )
          navigate( "/PortfolioManager" );
        }
        else {
          alert( "not match found" );
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert( "all fields are required" );
    }
  }


  const handleOnChange = ( e ) => {
    setState( { ...state,[ e.target.name ]: e.target.value } );
    //console.log( state.username,state.password );
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          
        </Stack>
        <Box
         
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>User Id</FormLabel>
              <Input type="text"
                id="username"
                name='username'
                onChange={ handleOnChange }
                value={ state.username } />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password"
                id="password"
                onChange={ handleOnChange }
                value={ state.password}
                name='password' />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                
                
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleClick}  
                >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login