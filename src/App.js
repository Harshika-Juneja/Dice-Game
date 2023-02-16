import { Box, Flex, Heading, List, ListItem, Stack } from "@chakra-ui/layout";
import { Button, Image,Text } from "@chakra-ui/react";
import { useState } from "react";

const App = () => {
  const [gameStarted,setGameStarted] = useState(false);
  const numbers = [1,2,3,4,5,6]
  const [selectedNumber,setSelectedNumber] = useState();
  const [dice,setDice] = useState(1);
  const[error,setError]= useState(null);
  const[score,setScore]=useState(0);

  const startGameHandler = () =>{
    setGameStarted(true);
  };
  
  const onNumberClicked =(value)=>{
  setSelectedNumber(value);
  setError(null);
  };

  const genRandomNumber = () => {
    if(selectedNumber){
    const generatedNumber = Math.ceil(Math.random() * 6);
    setDice(generatedNumber);

    if(selectedNumber === generatedNumber){
      setScore((prev) => prev + generatedNumber);
    }
    else{
      setScore((prev) => prev - 2);
    }
   }
   else{
    setError("Please Select Number");
   }
 };
  return ( 
  <>
  {gameStarted ? (
    <>
    <Stack justify="center" align="center" maxW="1100px" mx="auto" h="100vh">
    <Button  onClick={()=>{setGameStarted(false)}}>Back</Button>
      <Heading as="h1" fontSize="6xl" mb="7" color={error ? "red" : "black"}> {error ? error : "Select Number"}
      </Heading>
      <Flex pb="7">
      {numbers.map((value)=>(
      <Flex justify="center" align="center" h="50px"
       w="50px" bg={selectedNumber === value ? 'green':'black'} color="white" fontSize="2xl" key={value}
       mr={4} borderRadius="md" onClick={ () =>{onNumberClicked(value)}}>{value}</Flex>))}
       </Flex>
       <Box h="150px" w="150px" onClick={genRandomNumber}>
        <Image src={`/dice/dice${dice}.png`} />
       </Box>
       <Text as="p" fontSize="2xl">Click on dice to roll</Text>
       <Text color={score > 0 ? "green" : "red"} fontSize="5xl" fontWeight="bold">{score}</Text>
       <Text fontSize="3xl">Total Score</Text>
       <Button onClick={() => setScore(0)}>Reset Score</Button>
    </Stack>
    <Stack>
      <Heading as="h2">Game Rules :-</Heading>
      <List>
        <ListItem>Select any Dice Number</ListItem>
        <ListItem>Click on dice image to roll it</ListItem>
        <ListItem>If Selected dice number is equal to obtained dice result then you will get same points added to total score as the number on the dice</ListItem>
        <ListItem>Otherwise 2 points will be deducted from total score</ListItem>
      </List>
    </Stack>
    </>
  ) : ( 
   <Flex justify="center" align="center">
    <Image width=" 50%" src="dice/dices.png" />
    <Stack>
      <Heading fontSize="6xl" as="h1">{""}The Dice Game</Heading>
      <Button alignSelf="flex-end" bg="black" color="white" 
      _hover={{bg:"grey"}}
      onClick={startGameHandler}>Start Game</Button>
    </Stack>
   </Flex>
   )}
  </>

);
};
export default App;
