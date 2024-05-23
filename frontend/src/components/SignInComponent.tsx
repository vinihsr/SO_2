// SignInComponent.js
import { useState } from 'react';
import { Box, Button, Input, Text, useToast } from '@chakra-ui/react';
import { signIn } from '../services/Api.js'; // Certifique-se de que signIn faz uma requisição POST

const SignInComponent = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleSignIn = async () => {
    try {
      const response = await signIn({ email, senha: password });
      toast({
        title: "Login bem-sucedido",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onSignIn(response.data.user); // Pass the user data to the parent component or handle accordingly
    } catch (error) {
      toast({
        title: "Erro no login",
        description: error.response?.data?.message || 'Erro interno do servidor',
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error('Login failed:', error);
    }
  };

  return (
    <Box h="40vh" textAlign='center'>
      <Text mb={5} fontSize="xx-large">Sign In</Text>
      <Box display="flex" flexDir="column" gap={5} mb={8}>
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Box>
      <Button colorScheme="blue" mb={5} onClick={handleSignIn}>Sign In</Button>
      <Text color='gray'>Don't have an account? Click on Sign Up</Text>
    </Box>
  );
};

export default SignInComponent;

