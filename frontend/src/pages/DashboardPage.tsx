import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Img, Text, Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Center } from '@chakra-ui/react'
import logo from '../assets/soTeste.png'; // Adjust the path based on the location of your logo.png file
import { HamburgerIcon } from '@chakra-ui/icons'
import CadItems from '../components/CadItemsComponent';
import ViewItems from '../components/ViewItemsComponent';
import { useNavigate } from 'react-router-dom';

export default function DrawerExample() {
    const navigate = useNavigate();
    const activeTab = parseInt(localStorage.getItem('activeTab')) || 0;

    const handleLogin = () => {
        navigate('/')
    }

    const handleTabChange = (index) => {
        localStorage.setItem('activeTab', index);
    }

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
                            <MenuItem onClick={handleLogin}>
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
    )
}
