import { Module } from '@nestjs/common';
import { FixturesCommand } from './fixtures.command';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccount } from 'src/bank-accounts/entities/bank-account.entity';
import { PixKey } from 'src/pix-keys/entities/pix-key.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccount, PixKey, Transaction])],
  providers: [FixturesCommand],
})
export class FixturesModule {}
