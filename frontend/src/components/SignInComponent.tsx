import { useState } from 'react';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { signIn } from '../services/Api.js'; // Import the signIn function from Api.js

const SignInComponent = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async (credentials) => {
    try {
      const response = await signIn(credentials);
      const token = response.data.token; // Assuming the token is returned in the response
      // Handle successful sign-in (e.g., store token in local storage, redirect user)
    } catch (error) {
      // Handle sign-in error (e.g., display error message)
      console.error('Sign-in failed:', error);
    }
  };

  return (
    <Box h="40vh" textAlign='center'>
      <Text mb={5} fontSize="xx-large">Sign In</Text>
      <Box display="flex" flexDir="column" gap={5} mb={8}>
      <Input placeholder="Username" value={email} onChange={e => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Box>
      <Button colorScheme="blue" mb={5} onClick={handleSignIn}>Sign In</Button>
      <Text color='gray'>You doesn't have an account? click in Sign Up</Text>
    </Box>
  );
};

export default SignInComponent;

