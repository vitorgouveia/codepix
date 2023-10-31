import { BankAccount } from '@/models';

export const getBankAccount = async (id: string): Promise<BankAccount> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bank-accounts/${id}`,
    {
      next: { revalidate: 20, tags: [`bank-accounts/${id}`] },
    },
  );

  return response.json();
};
