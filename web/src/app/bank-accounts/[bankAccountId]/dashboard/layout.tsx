import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

export default async function Layout(props: {
  transactions: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Grid2 container spacing={2}>
      {props.children}

      <Grid2 xs={12}>
        <Typography variant="h5">Últimos Lançamentos</Typography>

        {props.transactions}
      </Grid2>
    </Grid2>
  );
}
