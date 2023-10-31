import { Transaction } from '@/models';

export const getTransactions = async (id: string): Promise<Transaction[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bank-accounts/${id}/transactions`,
    {
      next: { revalidate: 10, tags: [`bank-accounts/${id}`] },
    },
  );

  return response.json();
};
