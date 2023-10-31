'use client';

import { DataGrid, GridColDef } from '@/components/mui';
import { Transaction } from '@/models';
import { green, red } from '@mui/material/colors';
import { useRouter } from 'next/navigation';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 300 },
  {
    field: 'created_at',
    headerName: 'Data',
    width: 200,
    renderCell: (params) => new Date(params.value as string).toLocaleString(),
  },
  { field: 'description', headerName: 'Descrição', width: 130 },
  {
    field: 'amount',
    headerName: 'Valor (R$)',
    width: 180,
    renderCell: (params) => {
      const amount = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(params.value as number);
      return (
        <span style={{ color: params.value < 0 ? red[500] : green[500] }}>
          {amount}
        </span>
      );
    },
  },
];

export const Transactions = (props: {
  accountId: string;
  transactions: Transaction[];
  pagination: { per_page: number; page: number };
}) => {
  const router = useRouter();
  return (
    <DataGrid
      initialState={{
        pagination: {
          paginationModel: {
            page: props.pagination.page,
            pageSize: props.pagination.per_page,
          },
        },
      }}
      rows={props.transactions}
      columns={columns}
      pageSizeOptions={[5, 10]}
      onPaginationModelChange={(paginationParams) => {
        router.push(
          `/bank-accounts/${props.accountId}/dashboard?page=${paginationParams.page}&page_size=${paginationParams.pageSize}`,
        );
      }}
    />
  );
};
