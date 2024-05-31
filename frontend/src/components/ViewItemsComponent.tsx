import { Box, SimpleGrid, Image, Button, Input, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as api from "../services/Api";
import { DeleteIcon, RepeatIcon, ViewIcon } from '@chakra-ui/icons';
import ModalDescription from '../components/ModalDescription';

export default function ViewItemsComponent() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDescription, setModalDescription] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.newItem) {
      setItems([...items, location.state.newItem]);
    } else {
      fetchItems();
    }
  }, [location.state]); // Run useEffect whenever location state changes

  const fetchItems = async (query = "") => {
    try {
      const response = query ? await api.SearchItem(query) : await api.getAll();
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await api.deleteItem(itemId);
      const updatedItems = items.filter(item => item.id !== itemId);
      setItems(updatedItems);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    fetchItems(searchQuery);
  };

  const handleR = async () => {
    window.location.reload();
  };

  const handleOpenModal = (description) => {
    setModalDescription(description);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalDescription("");
  };

  return (
    <Box display='flex' flexDir='column' maxW={'95%'} mx="auto" mt={8} p={6} borderWidth="2px" borderRadius="lg">
      <Box as="form" onSubmit={handleSearch} display="flex" mb={4}>
        <Input
          placeholder="Search by item name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" colorScheme="blue" ml={2}>Search</Button>
        <Button colorScheme='blue' ml={2} onClick={() => handleR()}><RepeatIcon /></Button>
      </Box>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6}>
        {items.map(item => (
          <Box key={item.id} p={5} shadow="md" borderWidth="1px" borderRadius="lg">
            <Box justifyContent="space-between" alignItems="center">
              <Box color="gray">
                <Box color="black" fontWeight="bold" as="h4" lineHeight="tight">
                  {item.nameItem}
                </Box>
                <Box display="flex" flexDir="column" alignItems="center">
                  {item.photo && <Image src={item.photo} alt="Item" boxSize="150px" />}
                </Box>
                <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }}>
                  <Box mt={4} display="flex" alignItems="center">
                    Description: 
                    <Text ml={1} color="black" isTruncated>{item.descriptionItem}</Text>
                    {item.descriptionItem.length > 15 && (
                      <Button size="sm" p={1} ml={2} onClick={() => handleOpenModal(item.descriptionItem)}>
                        <ViewIcon />
                      </Button>
                    )}
                  </Box>
                  <Box display="flex" flexDir="column" pl={10} mt={4}>
                    Sell Price:
                    <Box color="black">{item.sell_price}</Box>
                  </Box>
                  <Box mt={4}>
                    Category:
                    <Box color="black">{item.category}</Box>
                  </Box>
                  <Box display="flex" justifyContent="right" mt={4}>
                    <Button colorScheme='red' onClick={() => handleDeleteItem(item.id)}><DeleteIcon /></Button>
                  </Box>
                </SimpleGrid>
              </Box>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <ModalDescription
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        description={modalDescription}
      />
    </Box>
  );
}
