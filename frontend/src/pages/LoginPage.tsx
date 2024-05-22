import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Box } from '@chakra-ui/react';
import SignInComponent from '../components/SignInComponent';
import SignUpComponent from '../components/SignUpComponent';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  // Function to handle successful sign-in
  const handleSignIn = (token) => {
    setToken(token);
    navigate('/dashboard');
  };

  // Function to handle successful sign-up
  const handleSignUp = () => {
    // You can perform actions after signing up, such as displaying a success message
  };

  return (
    <Box display="flex" h="100vh" alignItems="center" justifyContent="center">
      <Box minW="40%" minH="70%">
        <Tabs
          isFitted
          variant="rouded"
          backgroundColor="whitesmoke"
          p={10}
          borderRadius={20}
          boxShadow={'20px 20px 40px lightgrey'}
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

