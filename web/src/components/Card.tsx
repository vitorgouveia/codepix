import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';

export const Card = (props: PropsWithChildren) => {
  return (
    <Box
      sx={{
        borderLeft: '4px solid',
        borderColor: 'primary.main',
        p: 2,
        boxShadow: 1,
        backgroundColor: 'primary.constrastText',
      }}
    >
      {props.children}
    </Box>
  );
};
