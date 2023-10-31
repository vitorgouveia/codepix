import { BankAccount, PixKey } from '@/models';

export const getPixKeys = async (bankAccountId: string): Promise<PixKey[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bank-accounts/${bankAccountId}/pix-keys`,
    {
      next: {
        tags: [`pix-keys-${bankAccountId}`],
      },
    },
  );

  return response.json();
};
