import { Box } from '@chakra-ui/react';
import * as React from 'react';
import NextImage from 'next/image';

export const ChakraNextImage: React.FC<
  any & {
    src: string;
    alt: string;
  }
> = (props) => {
  const { src, alt, ...rest } = props;
  return (
    <Box {...rest}>
      <NextImage layout="fill" src={src} alt={alt} />
    </Box>
  );
};
