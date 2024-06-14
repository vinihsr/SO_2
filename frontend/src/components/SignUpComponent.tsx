// SignUpComponent.js
import { useState } from 'react';
import { Box, Button, Input, Text, useToast  } from '@chakra-ui/react';
import * as api from '../services/Api.js';

const SignUpComponent = ({ onSignUp }) => { // Corrigido para receber corretamente onSignUp como parâmetro
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!email || !senha) {
        throw new Error("Por favor, preencha todos os campos.");
      }
      await handleAddUser();
    } catch (error) {
      console.error("Error handling submit:", error);
      toast({
        title: "Erro ao enviar dados",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await api.signUp({ email, senha });
      // Aqui chamamos a função onSignUp com os dados do novo usuário
      onSignUp(response.data);
      toast({
        title: "Usuário cadastrado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      resetForm();
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
      toast({
        title: "Erro ao cadastrar usuário",
        description: error.response?.data?.message || 'Erro interno do servidor',
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const resetForm = () => {
    setEmail("");
    setSenha("");
  };

  return (
    <Box minH="40vh" textAlign='center'>
      <Text mb={5} fontSize="xx-large">Sign Up</Text>
      <Box display="flex" flexDir="column" gap={5} mb={8}>
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={senha} onChange={e => setSenha(e.target.value)} />
      </Box>
      <Button colorScheme="blue" onClick={handleSubmit}>Sign Up</Button>
    </Box>
  );
};

export default SignUpComponent;
