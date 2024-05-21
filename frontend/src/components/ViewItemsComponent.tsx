import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import * as api from "../services/Api";

export default function ViewItemsComponent() {
  const [items, setItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.newItem) {
      // If new item data is passed from CadItemsComponent
      setItems([...items, location.state.newItem]);
    } else {
      fetchItems();
    }
  }, [location.state]); // Run useEffect whenever location state changes

  const fetchItems = async () => {
    try {
      const response = await api.getAll();
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <Box display='flex' flexDir='column' maxW={'80%'} mx="auto" mt={8} p={6} borderWidth="2px" borderRadius="lg">
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Photo</Th>
          <Th>Description</Th>
          <Th>Price</Th>
          <Th>Sell Price</Th>
          <Th>Amount</Th>
          <Th>Minimum Stock</Th>
          <Th>Category</Th>
          <Th>Location</Th>
        </Tr>
      </Thead>
      <Tbody>
        {items.map(item => (
          <Tr key={item.id}>
            <Td>{item.nameItem}</Td>
            <Td>{item.photo}</Td>
            <Td>{item.descriptionItem}</Td>
            <Td>{item.price}</Td>
            <Td>{item.sell_price}</Td>
            <Td>{item.amount}</Td>
            <Td>{item.minimum_stock}</Td>
            <Td>{item.category}</Td>
            <Td>{item.location}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
);
}