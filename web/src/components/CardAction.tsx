import { Button, SxProps } from '@mui/material';
import { Card } from './Card';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { PropsWithChildren } from 'react';
import { ArrowForwardIos } from '@mui/icons-material';

type Props = PropsWithChildren<{
  sx?: SxProps;
  action?: (formData: FormData) => void;
}>;

export const CardAction = (props: Props) => {
  return (
    <Card>
      <Grid2 container spacing={2}>
        <Grid2 xs={12} sm={9} sx={props.sx}>
          {props.children}
        </Grid2>

        <Grid2
          xs={12}
          sm={3}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'flex-end'}
        >
          <form action={props.action}>
            <Button type="submit" color="primary">
              <ArrowForwardIos />
            </Button>
          </form>
        </Grid2>
      </Grid2>
    </Card>
  );
};
