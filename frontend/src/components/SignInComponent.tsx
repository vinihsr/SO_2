import { useState } from 'react';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import * as api from '../services/Api.js'; // Import the signIn function from Api.js
import { useNavigate } from 'react-router-dom';


const SignInComponent = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
      event.preventDefault();
      try {
          const response = await api('/api/login', { email, password });
          const { token } = response.data;
          localStorage.setItem('authToken', token);
          navigate('/dashboard');
      } catch (error) {
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

