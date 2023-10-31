import { getTransactions } from '@/queries/get-transactions.query';
import { Transactions } from './transactions.component';

export default async function Page({
  params,
  searchParams,
}: {
  params: { bankAccountId: string };
  searchParams: {
    page: string;
    per_page: string;
  };
}) {
  const page = Number(searchParams.page) || 1;
  const per_page = Number(searchParams.per_page) || 10;

  const transactions = await getTransactions(params.bankAccountId);

  return (
    <>
      <Transactions
        accountId={params.bankAccountId}
        pagination={{ page, per_page }}
        transactions={transactions}
      />
    </>
  );
}
