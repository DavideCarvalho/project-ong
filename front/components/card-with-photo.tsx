import React from 'react';
// import Image from 'next/image';
import { Box, Center, Text, VStack, Img, Heading } from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import { ChakraNextImage } from './image';

interface Props {
  petImageUrl: string;
  petName: string;
  petDescription: string;
  ongName: string;
  ongPhone: string;
}

export const CardWithPhoto: React.FC<Props> = ({
  petDescription,
  petImageUrl,
  petName,
  ongName,
  ongPhone,
}) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <ChakraNextImage
        src={petImageUrl}
        alt="Dog Image"
        objectFit={'contain'}
        loading="lazy"
        height={400}
        width={400}
      />
      <Box p={6}>
        <Heading as="h2" size="xl" mt="1">
          {petName.toUpperCase()}
        </Heading>
        <Text mt={1} noOfLines={5}>{petDescription}</Text>
        <Box mt={1}>
          <PhoneIcon /> {ongPhone}
        </Box>
        <Text mt={1}>ONG {ongName}</Text>
      </Box>
    </Box>
  );
};
