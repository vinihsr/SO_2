import { Tabs, TabList, Tab, TabPanels, TabPanel, Box, Img } from '@chakra-ui/react';
import SignInComponent from '../components/SignInComponent';
import SignUpComponent from '../components/SignUpComponent';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/soTeste.png'; // Ajuste o caminho com base na localização do seu arquivo logo.png


const MainPage = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/dashboard');
  };

  const handleSignUp = () => {
    // You can perform actions after signing up, such as displaying a success message
  };

  return (
    <Box display="flex" h="100vh" alignItems="center" justifyContent="center">
      <Box marginLeft={10}><Img src={logo} w='70%' py={1} mx={5} alt='logo' /></Box>
      <Box minW="40%" minH="50%">
        <Tabs
          isFitted
          variant="rouded"
          p={10}
          borderRadius={20}
          boxShadow={'20px 20px 1000px lightgrey'}
          marginRight={10}
        >
          <TabList mb="1rem">
            <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Sign In</Tab>
            <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* Pass handleSignIn function to SignInComponent */}
              <SignInComponent onSignIn={handleSignIn} />
            </TabPanel>
            <TabPanel>
              {/* Pass handleSignUp function to SignUpComponent */}
              <SignUpComponent onSignUp={handleSignUp} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default MainPage;

