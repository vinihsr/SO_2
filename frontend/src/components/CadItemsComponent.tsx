import * as React from 'react';
import { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Select, useToast } from '@chakra-ui/react';
import { createItem } from '../services/Api';

export default function CadItemsComponent() {
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    price: '',
    sellPrice: '',
    amount: '',
    minimumStock: '',
    category: '',
    location: '',
    description: '',
  });

  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const itemId = await createItem(formData);
      console.log('Item created successfully with ID:', itemId);
      toast({
        title: 'Item created',
        description: 'Item was successfully created.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Clear form after successful submission
      setFormData({
        name: '',
        photo: null,
        price: '',
        sellPrice: '',
        amount: '',
        minimumStock: '',
        category: '',
        location: '',
        description: '',
      });
    } catch (error) {
      console.error('Error creating item:', error);
      toast({
        title: 'Error',
        description: error.message || 'An error occurred while creating the item. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <Box display='flex' flexDir='column' maxW={'80%'} gap={10} justifyContent={'center'} mx="auto" mt={8} p={6} borderWidth="2px" borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <Box display='contents'>
          <Box display='flex' gap={10} mb={10}>
          <FormControl id="name" mb={4}>
            <FormLabel>Name</FormLabel>
            <Input variant='flushed' type="text" onChange={handleChange} />
            </FormControl>
            <FormControl id="photo" mb={4}>
            <FormLabel>Photo</FormLabel>
            <Input variant='flushed' type="file" onChange={handleChange} />
            </FormControl>
            <FormControl id="price" mb={4}>
            <FormLabel>Price</FormLabel>
            <Input variant='flushed' type="number" onChange={handleChange} />
            </FormControl>
          </Box>
        <Box display='flex' gap={10} mb={10}>
            <FormControl id="sellPrice" mb={4}>
            <FormLabel>Sell Price</FormLabel>
            <Input variant='flushed' type="number" onChange={handleChange} />
            </FormControl>
            <FormControl id="amount" mb={4}>
            <FormLabel>Amount</FormLabel>
            <Input variant='flushed' type="number" onChange={handleChange} />
            </FormControl>
            <FormControl id="minimumStock" mb={4}>
            <FormLabel>Minimum Stock</FormLabel>
            <Input variant='flushed' type="number" onChange={handleChange} />
            </FormControl>
        </Box>
        <Box display='flex' alignItems='center' gap={10} mb={5}>
        <FormControl id="category" mb={4}>
            <FormLabel>Category</FormLabel>
            <Select onChange={handleChange}>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
            </Select>
            </FormControl>
          <FormControl id="location" mb={4}>
            <FormLabel>Location</FormLabel>
            <Input variant='flushed' type="text" onChange={handleChange} />
            </FormControl>
            <FormControl id="description" mb={4}>
            <FormLabel>Description</FormLabel>
            <Input variant='flushed' type="text" onChange={handleChange} />
            </FormControl>
        </Box>
        <Box display='flex' alignItems='center' justifyContent={'end'} gap={10}>
        <Button p={7} colorScheme="blue" type="submit">
            Submit
        </Button>
        </Box>
        </Box>
      </form>
    </Box>
  );
}
