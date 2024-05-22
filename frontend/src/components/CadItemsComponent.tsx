import { useState } from 'react'; 
import { Box, FormControl, FormLabel, Input, Button, Select, useToast } from '@chakra-ui/react';
import * as api from '../services/Api';

export default function CadItemsComponent() {
  const [item, setItem] = useState([]);
  const [nameItem, setNameItem] = useState("");
  const [photo, setPhoto] = useState("");
  const [descItem, setDescItem] = useState("");
  const [price, setPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [minStock, setMinStock] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!nameItem || !photo || !descItem || !price || !sellPrice || !minStock || !amount || !category || !location) {
        throw new Error("Por favor, preencha todos os campos.");
      }
      await handleAddItems();
    } catch (error) {
      console.error("Error handling submit:", error);
      toast({
        title: "Erro ao enviar dados",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddItems = async () => {
    try {
      const response = await api.addItem({ name: nameItem, photo, description: descItem, price, sell_price: sellPrice, amount, minimum_stock: minStock, category, location });
      setItem([...item, response.data]);
      toast({
        title: "Item adicionado com sucesso! Veja em ItemsView",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      resetForm();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const resetForm = () => {
    setNameItem("");
    setPhoto("");
    setDescItem("");
    setPrice("");
    setSellPrice("");
    setAmount("");
    setMinStock("");
    setCategory("");
    setLocation("");
  };

  return (
    <Box display='flex' flexDir='column' maxW={'80%'} height={'100%'} gap={10} justifyContent={'center'} mx="auto" mt={8} p={6} borderWidth="2px" borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <Box display='contents'>
          <Box display='flex' gap={10} mb={10}>
            <FormControl w='30%' id="name" mb={3}>
              <FormLabel>Name</FormLabel>
              <Input variant='flushed' type="text" onChange={(e) => setNameItem(e.target.value)} value={nameItem} />
            </FormControl>
            <FormControl w='30%' id="photo" mb={3}>
              <FormLabel>Photo</FormLabel>
              <Input variant='flushed' type="text" onChange={(e) => setPhoto(e.target.value)} value={photo} />
            </FormControl>
            <FormControl w='30%' id="price" mb={3}>
              <FormLabel>Price</FormLabel>
              <Input variant='flushed' type="number" onChange={(e) => setPrice(e.target.value)} value={price} />
            </FormControl>
          </Box>
          <Box display='flex' gap={10} mb={10}>
            <FormControl w='30%' id="sellPrice" mb={3}>
              <FormLabel>Sell Price</FormLabel>
              <Input variant='flushed' type="number" onChange={(e) => setSellPrice(e.target.value)} value={sellPrice} />
            </FormControl>
            <FormControl w='30%' id="amount" mb={3}>
              <FormLabel>Amount</FormLabel>
              <Input variant='flushed' type="number" onChange={(e) => setAmount(e.target.value)} value={amount} />
            </FormControl>
            <FormControl w='30%' id="minStock" mb={3}>
              <FormLabel>Minimum Stock</FormLabel>
              <Input variant='flushed' type="number" onChange={(e) => setMinStock(e.target.value)} value={minStock} />
            </FormControl>
          </Box>
          <Box display='flex' alignItems='center' gap={10} mb={5}>
            <FormControl w='30%' id="category" mb={3}>
              <FormLabel>Category</FormLabel>
              <Select onChange={(e) => setCategory(e.target.value)} value={category}>
                <option value="">Select a category</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
              </Select>
            </FormControl>
            <FormControl w='30%' id="location" mb={3}>
              <FormLabel>Location</FormLabel>
              <Input variant='flushed' type="text" onChange={(e) => setLocation(e.target.value)} value={location} />
            </FormControl>
            <FormControl w='30%' id="description" mb={3}>
              <FormLabel>Description</FormLabel>
              <Input variant='flushed' type="text" onChange={(e) => setDescItem(e.target.value)} value={descItem} />
            </FormControl>
          </Box>
          <Box display='flex' alignItems='center' justifyContent={'end'} gap={10}>
            <Button p={5} colorScheme="blue" type="submit">
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
