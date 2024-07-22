import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { Passwords } from './security.entities';

@Injectable()
export class SecurityService {
  constructor() {}

  async comparePassword(data: Passwords): Promise<boolean> {
    return await compare(data.loginPassword, data.password);
  }
}
