import { useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import * as api from "../services/Api.js";

export default function ViewItemsComponent() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await api.getAllItems();
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
              <Td>{item.name}</Td>
              <Td>{item.photo}</Td>
              <Td>{item.description}</Td>
              <Td>{item.price}</Td>
              <Td>{item.sellPrice}</Td>
              <Td>{item.amount}</Td>
              <Td>{item.minStock}</Td>
              <Td>{item.category}</Td>
              <Td>{item.location}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
