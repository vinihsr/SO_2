import { useState } from "react";
import { Box, Input, Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Hardcoded email and password
    const validEmail = "teste@teste.com";
    const validPassword = "1234";

    // Check if the entered email and password match the hardcoded values
    if (email === validEmail && password === validPassword) {
      // If match, redirect to the dashboard
      navigate('/dashboard');
    } else {
      // If not match, display error message
      setError("Invalid email or password. Please try again.");
    }
  };

  return(
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box bg="white" w={400} p={8} borderRadius={20} boxShadow="lg">
        <Heading mb={8} textAlign="center">Log in to Your Account</Heading>
        <Input 
          placeholder="Email" 
          mb={4} 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <Input 
          type="password" 
          placeholder="Password" 
          mb={6} 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        {error && <Text color="red.500" mb={4}>{error}</Text>}
        <Button colorScheme="blue" size="lg" width="100%" onClick={handleLogin}>Log In</Button>
      </Box>
    </Box>
  );
}
