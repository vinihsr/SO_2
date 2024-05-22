import { useState } from 'react';
import { Box, Button, Input, Text  } from '@chakra-ui/react';
import { signUp } from '../services/Api.js'; // Import the signUp function from Api.js

const SignUpComponent = ({ onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (userData) => {
    try {
      const response = await signUp(userData);
      const message = response.data.message; // Assuming a success message is returned
      // Handle successful sign-up (e.g., display success message, redirect user)
    } catch (error) {
      // Handle sign-up error (e.g., display error message)
      console.error('Sign-up failed:', error);
    }
  };


  return (
    <Box minH="40vh" textAlign='center'>
      <Text mb={5} fontSize="xx-large">Sign Up</Text>
      <Box display="flex" flexDir="column" gap={5} mb={8}>
      <Input placeholder="Username" value={email} onChange={e => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Box>
      <Button colorScheme="blue" onClick={handleSignUp}>Sign Up</Button>
    </Box>
  );
};

export default SignUpComponent;

