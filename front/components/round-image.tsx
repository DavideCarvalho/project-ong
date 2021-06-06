import { Box } from '@chakra-ui/react';
import * as React from 'react';
import NextImage from 'next/image';
import styled from '@emotion/styled';

const StyledImage = styled(NextImage)`
  border-radius: 50%;
`;

export const RoundImage: React.FC<
  any & {
    src: string;
    alt: string;
  }
> = (props) => {
  const { src, alt, ...rest } = props;
  return (
    <Box {...rest}>
      <StyledImage layout="fill" src={src} alt={alt} />
    </Box>
  );
};
