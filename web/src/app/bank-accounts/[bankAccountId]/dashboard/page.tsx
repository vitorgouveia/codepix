import { CardAction } from '@/components/CardAction';
import { CurrentBalance } from '@/components/CurrentBalance';
import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Link from 'next/link';

export default async function Page({
  params,
}: {
  params: { bankAccountId: string };
}) {
  return (
    <>
      <Grid2 xs={12} lg={6}>
        <div>
          <CurrentBalance bankAccountId={params.bankAccountId} />
        </div>
      </Grid2>

      <Grid2 container xs={12} lg={6} spacing={1}>
        <Grid2 xs={6}>
          <Link
            href={`/bank-accounts/${params.bankAccountId}/withdraw`}
            style={{ textDecoration: 'none' }}
          >
            <CardAction sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography component="span" color={'primary'}>
                Transferência
              </Typography>
            </CardAction>
          </Link>
        </Grid2>

        <Grid2 xs={6}>
          <Link
            href={`/bank-accounts/${params.bankAccountId}/pix`}
            style={{ textDecoration: 'none' }}
          >
            <CardAction sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography component="span" color={'primary'}>
                Nova chave pix
              </Typography>
            </CardAction>
          </Link>
        </Grid2>
      </Grid2>
    </>
  );
}
