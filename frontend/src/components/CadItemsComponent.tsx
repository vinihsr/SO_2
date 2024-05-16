import * as React from 'react';
import { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Select, useToast } from '@chakra-ui/react';
import * as api from "../services/Api.js";


export default function VehiclePage() {
  const [item, setItem] = useState([])
  const [nameItem, setNameItem] = useState("");
  const [photo, setPhoto] = useState("");
  const [descItem, setDescItem] = useState("");
  const [price, setPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [minStock, setMinStock] = useState("");
  const [category, setCategory] = useState(["1", "2", "3"]);
  const [location, setLocation] = useState("");
  const toast = useToast();

  React.useEffect(() => {
    fetchItems();
  }, []);

  React.useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    };
  
    document.addEventListener("keydown", handleKeyPress);
  
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const fetchItems = async () => {
    try {
      const response = await api.getAllItems();
      setItem(response.data);
    } catch (error) {
      console.error("Error fetching veiculos:", error);
    }
  };

  const handleSubmit = async () => {
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
    const response = await api.addVeiculo({ nameItem, photo, descItem, price, sellPrice, minStock, amount, category, location });
    setItem([...item, response.data]);
    toast({
      title: "Veículo adicionado com sucesso!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    resetForm();
  };

  const resetForm = () => {
  };


  return (
    <Box display='flex' flexDir='column' maxW={'80%'} height={'100%'} gap={10} justifyContent={'center'} mx="auto" mt={8} p={6} borderWidth="2px" borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <Box display='contents'>
          <Box display='flex' gap={10} mb={10}>
            <FormControl w='30%' id="name" mb={4}>
              <FormLabel>Name</FormLabel>
              <Input variant='flushed' type="text" onChange={(e) => setNameItem(e.target.value)} value={nameItem} />
            </FormControl>
            <FormControl w='30%' id="photo" mb={4}>
              <FormLabel>Photo</FormLabel>
              <Input variant='flushed' type="text" onChange={(e) => setPhoto(e.target.value)} value={photo} />
            </FormControl>
            <FormControl w='30%' id="price" mb={4}>
              <FormLabel>Price</FormLabel>
              <Input variant='flushed' type="number" onChange={(e) => setPrice(e.target.value)} value={price} />
            </FormControl>
          </Box>
          <Box display='flex' gap={10} mb={10}>
            <FormControl w='30%' id="sellPrice" mb={4}>
              <FormLabel>Sell Price</FormLabel>
              <Input variant='flushed' type="number" onChange={(e) => setSellPrice(e.target.value)} value={sellPrice} />
            </FormControl>
            <FormControl w='30%' id="amount" mb={4}>
              <FormLabel>Amount</FormLabel>
              <Input variant='flushed' type="number" onChange={(e) => setAmount(e.target.value)} value={amount} />
            </FormControl>
            <FormControl w='30%' id="minimumStock" mb={4}>
              <FormLabel>Minimum Stock</FormLabel>
              <Input variant='flushed' type="number" onChange={(e) => setMinStock(e.target.value)} value={minStock} />
            </FormControl>
          </Box>
          <Box display='flex' alignItems='center' gap={10} mb={5}>
            <FormControl w='30%' id="category" mb={4}>
              <FormLabel>Category</FormLabel>
              <Select onChange={(e) => setCategory(e.target.value)} value={category}>
                <option value={category}> </option>
                <option value={category}> </option>
                <option value={category}> </option>
              </Select>
            </FormControl>
            <FormControl w='30%' id="location" mb={4}>
              <FormLabel>Location</FormLabel>
              <Input variant='flushed' type="text" onChange={(e) => setLocation(e.target.value)} value={location} />
            </FormControl>
            <FormControl w='30%' id="description" mb={4}>
              <FormLabel>Description</FormLabel>
              <Input variant='flushed' type="text" onChange={(e) => setDescItem(e.target.value)} value={descItem} />
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
