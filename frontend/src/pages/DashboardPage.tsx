import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Img, Text, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react'
import logo from '../assets/logo.png'; // Adjust the path based on the location of your logo.png file
import { HamburgerIcon } from '@chakra-ui/Icons'
import CadItems from '../components/CadItemsComponent';
import ViewItems from '../components/ViewItemsComponent';
import { useNavigate } from 'react-router-dom';


export default function DrawerExample() {
    const navigate = useNavigate();

    const handleLogin = () =>{
        navigate('/')
    } 

    return (
        <Box w='100%' > 
            <Box display='flex' justifyContent='space-between'  borderBottom='solid 1px lightgray' boxShadow="0px 1px lightgray">
            <Box alignItems='center' display='flex' h='12vh'>
                <Img src={logo} w='4vw' py={1} mx={3} alt='logo'/>
                <Text fontSize='4.5vh' letterSpacing="4px" fontWeight='bold' color='#06145A'>SO TEST</Text>
            </Box>
            <Box alignItems='center' display='flex' mx={5}>
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
            </Box>
            <Tabs>
                <TabList h='8vh'>
                    <Tab color='#06145A' w='50vw'>item registration</Tab>
                    <Tab color='#06145A' w='50vw'>item view</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <CadItems/>
                    </TabPanel>
                    <TabPanel>
                        <ViewItems/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}