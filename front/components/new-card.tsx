import {
  Heading,
  Box,
  Center,
  Text,
  Stack,
  VStack,
  Button,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { RoundImage } from './round-image';
import { PhoneIcon } from '@chakra-ui/icons';

interface Props {
  petImageUrl: string;
  petName: string;
  petDescription: string;
  ongName: string;
  ongPhone: string;
}

export const SocialProfileSimple: React.FC<Props> = ({
  ongName,
  ongPhone,
  petDescription,
  petImageUrl,
  petName,
}) => {
  return (
    <Center py={6}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Center>
          <RoundImage
            src={petImageUrl}
            alt={'Avatar Alt'}
            mb={4}
            pos={'relative'}
            height={100}
            width={100}
          />
        </Center>
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {petName}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          {ongName}
        </Text>
        <Text
          textAlign={'center'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}
        >
          {petDescription}
        </Text>

        <Text
          textAlign={'left'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}
        >
          <PhoneIcon /> {ongPhone}
        </Text>
      </Box>
    </Center>
  );
};
