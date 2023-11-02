import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePixKeyDto } from './dto/create-pix-key.dto';
// import { UpdatePixKeyDto } from './dto/update-pix-key.dto';
import { Repository } from 'typeorm';
import { PixKey, PixKeyKind } from './entities/pix-key.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from 'src/bank-accounts/entities/bank-account.entity';
import { ClientGrpc } from '@nestjs/microservices';
import {
  PixKeyClientGrpc,
  RegisterPixKeyRpcResponse,
} from './proto/pix-keys.grpc';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PixKeysService implements OnModuleInit {
  private pixGrpcService: PixKeyClientGrpc;

  constructor(
    @InjectRepository(PixKey) private pixKeyRepository: Repository<PixKey>,
    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>,
    @Inject('PIX_PACKAGE')
    private pixGrpcPackage: ClientGrpc,
  ) {}

  onModuleInit() {
    this.pixGrpcService = this.pixGrpcPackage.getService('PixService');
  }

  async create(bankAccountId: string, createPixKeyDto: CreatePixKeyDto) {
    await this.bankAccountRepository.findOneOrFail({
      where: {
        id: bankAccountId,
      },
    });

    const remotePixKey = await this.findRemotePixKey({
      key: createPixKeyDto.key,
      kind: createPixKeyDto.kind,
    });
    if (remotePixKey) {
      return this.createIfNotExists(bankAccountId, remotePixKey);
    } else {
      try {
        const createdRemotePixKey = await lastValueFrom(
          this.pixGrpcService.registerPixKey({
            accountId: bankAccountId,
            key: createPixKeyDto.key,
            kind: createPixKeyDto.kind,
          }),
        );

        return this.pixKeyRepository.save({
          id: createdRemotePixKey.id,
          bank_account_id: bankAccountId,
          ...createPixKeyDto,
        });
      } catch (error) {
        if (error.detail === 'No account found') {
          return null;
        }

        console.error(error.message);

        throw new Error('Failed to get key with gRPC');
      }
    }
  }

  private async createIfNotExists(
    bankAccountId: string,
    remotePixKey: RegisterPixKeyRpcResponse,
  ) {
    const hasLocalPixKey = await this.pixKeyRepository.find({
      where: {
        key: remotePixKey.key,
      },
    });

    if (hasLocalPixKey) {
      throw new Error('PixKey already exists');
    } else {
      return this.pixKeyRepository.save({
        id: remotePixKey.id,
        bank_account_id: bankAccountId,
        key: remotePixKey.key,
        kind: remotePixKey.kind as PixKeyKind,
      });
    }
  }

  private async findRemotePixKey(data: { key: string; kind: string }) {
    try {
      return await lastValueFrom(this.pixGrpcService.find(data));
    } catch (error) {
      if (error.details == 'No key found') {
        return null;
      }

      console.error(error.message);

      throw new Error('Failed to get key with gRPC');
    }
  }

  findAll(bankAccountId: string) {
    return this.pixKeyRepository.find({
      where: {
        bank_account_id: bankAccountId,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} pixKey`;
  // }

  // update(id: number, updatePixKeyDto: UpdatePixKeyDto) {
  //   return `This action updates a #${id} pixKey`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} pixKey`;
  // }
}

export class PixKeyGrpcUnknownError extends Error {}

export class PixKeyAlreadyExistsError extends Error {}
