import { Table, Thead, Tbody, Tr, Th, Td, Image } from '@chakra-ui/react';

export default function ViewItems() {
  // Sample data for demonstration
  const items = [
    {
      id: 1,
      name: 'Item 1',
      photo: 'https://via.placeholder.com/150', // Example URL for placeholder image
      description: 'Description of item 1',
      sellPrice: 10.99,
      category: 'Category 1',
    },
    {
      id: 2,
      name: 'Item 2',
      photo: 'https://via.placeholder.com/150', // Example URL for placeholder image
      description: 'Description of item 2',
      sellPrice: 20.99,
      category: 'Category 2',
    },
    // Add more items as needed
  ];

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Photo</Th>
          <Th>Description</Th>
          <Th>Sell Price</Th>
          <Th>Category</Th>
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item) => (
          <Tr key={item.id}>
            <Td>{item.name}</Td>
            <Td>
              <Image src={item.photo} alt={item.name} boxSize="50px" />
            </Td>
            <Td>{item.description}</Td>
            <Td>{item.sellPrice}</Td>
            <Td>{item.category}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
