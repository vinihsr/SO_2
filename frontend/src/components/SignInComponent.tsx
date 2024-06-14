import { useState, useEffect } from 'react';
import { Box, Button, Input, Text, useToast} from '@chakra-ui/react';
import { signIn } from '../services/Api.js'; // Certifique-se de que signIn faz uma requisição POST

const SignInComponent = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar a submissão
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
      onSignIn(response.user); // Pass the user data to the parent component or handle accordingly
    } catch (error) {
      toast({
        title: "Erro no login",
        description: error.response?.data?.message || 'Erro interno do servidor',
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error('Login failed:', error);
    } finally {
      setIsSubmitting(false); // Marca a submissão como concluída, independentemente do resultado
    }
  };

  useEffect(() => {
    const handleKeyPress = async (event) => {
      if (event.key === "Enter" && document.activeElement.tagName === "INPUT" && document.activeElement.closest('.signin-form')) {
        setIsSubmitting(true); // Marca a submissão como iniciada
        await handleSignIn();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleSignIn]);

  const handleSubmitClick = async () => {
    if (!isSubmitting) {
      setIsSubmitting(true); // Marca a submissão como iniciada
      await handleSignIn();
    }
  };

  return (
    <Box>
    <Box className="signin-form" h="40vh" textAlign='center'>
      <Text mb={5} fontSize="xx-large">Sign In</Text>
      <Box display="flex" flexDir="column" gap={5} mb={8}>
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Box>
      <Button colorScheme="blue" mb={5} onClick={handleSubmitClick}>Sign In</Button>
      <Text color='gray'>Don't have an account? Click on Sign Up</Text>
    </Box>
    </Box>
  );
};

export default SignInComponent;
