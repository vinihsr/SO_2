import { useEffect } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Img, Text, Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import CadItems from '../components/CadItemsComponent';
import ViewItems from '../components/ViewItemsComponent';
import logo from '../assets/soTeste.png'; // Ajuste o caminho com base na localização do seu arquivo logo.png

export default function DrawerExample() {
  const navigate = useNavigate();
  const activeTab = parseInt(localStorage.getItem('activeTab')) || 0;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redireciona para a página de login se não estiver autenticado
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    navigate('/'); // Redireciona para a página de login
  };

  const handleTabChange = (index) => {
    localStorage.setItem('activeTab', index);
  };

  return (
    <Box w='100%'>
      <Flex borderBottom='solid 1px lightgray' boxShadow="0px 1px lightgray" h='10vh' alignItems='center' position="relative">
        <Center w='90vw' position="absolute" left="51%" transform="translateX(-50%)">
          <Text fontSize='4.5vh' letterSpacing="4px" fontWeight='bold' color='#3182ce' mr={2}>S.O</Text>
          <Img src={logo} w='4%' py={1} mx={5} alt='logo' />
          <Text fontSize='4.5vh' letterSpacing="4px" fontWeight='bold' color='#3182ce' ml={2}>TEST</Text>
        </Center>
        <Box ml="auto" mr={5}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='outline'
            />
            <MenuList>
              <MenuItem onClick={handleLogout}>
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <Tabs defaultIndex={activeTab} onChange={handleTabChange}>
        <TabList h='8vh'>
          <Tab color='#3182ce' w='50vw'>Item Registration</Tab>
          <Tab color='#3182ce' w='50vw'>Item View</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CadItems />
          </TabPanel>
          <TabPanel>
            <ViewItems />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
