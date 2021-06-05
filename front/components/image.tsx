import { Box } from '@chakra-ui/react';
import * as React from 'react';
import NextImage from 'next/image';

export const ChakraNextImage: React.FC<any> = (props) => {
  const { src, alt, objectFit, layout, height, width, ...rest } = props;
  return (
    <Box {...rest}>
      <NextImage objectFit={objectFit} layout={layout} src={src} alt={alt} height={height} width={width} />
    </Box>
  );
};
