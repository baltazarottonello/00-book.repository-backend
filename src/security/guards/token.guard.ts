import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

//TODO : CREATE A GUARD MODULE FOR SERVICES INTERACTIONS
@Injectable()
export default class TokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req['Authorization'];
    console.log(token);
    return true;
  }
}
