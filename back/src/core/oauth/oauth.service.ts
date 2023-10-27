import { Injectable } from '@nestjs/common';

import { Algorithm, sign, verify } from 'jsonwebtoken';
import { DataSource, DeepPartial } from 'typeorm';
import config from 'config';
import { nanoid } from 'nanoid';

import { checkPassword, passwordToHash } from '../../helpers/password.helper';
import {
  access_token_expired_signature,
  account_blocked,
  authorization_failed,
  bad_request,
  refresh_token_expired_signature,
} from '../../errors';

import { IJwtPayload, User } from './user/user.entity';
import { RecoveryKey } from './recovery-key/recovery-key.entity';
import { RefreshToken } from './refresh-token/refresh-token.entity';

const JWT_SETTINGS = config.get<IJwtSettings>('JWT_SETTINGS');

export interface IJwtToken {
  iat: number;
  exp: number;
  jti: string;
}

export interface IAccessToken extends IJwtToken {
  current_user: IJwtPayload;
  token_type: 'access';
}

export interface IRefreshToken extends IJwtToken {
  current_user: { id: string };
  token_type: 'refresh';
}

@Injectable()
export class OAuthService {
  constructor(private readonly dataSource: DataSource) {}

  public async registration(login: string, password: string) {
    const exist_user = await this.dataSource.getRepository(User).findOne({ where: { login: login.trim().toLowerCase() } });

    if (exist_user) {
      bad_request({ raise: true, msg: 'LOGIN_ALREADY_EXISTS' });
    }

    const user_obj: DeepPartial<User> = {
      login,
      password: passwordToHash(password),
    };

    const inserted_user = await this.dataSource.getRepository(User).insert(user_obj);

    return await this.reGenerateRecoveryKeys(inserted_user.identifiers[0].id);
  }

  public async signInByPassword(login: string, password: string) {
    const user = await this.dataSource.getRepository(User).findOne({ where: { login: login.trim().toLowerCase() } });

    if (!user || !checkPassword(user.password, password)) {
      authorization_failed({ raise: true });
    }

    if (user.is_blocked) {
      account_blocked({ raise: true });
    }

    return await this.genereteJwt(user);
  }

  public async signInByRefreshToken(refresh_token: string) {
    const { current_user, token_type, jti } = this.verifyToken<IRefreshToken>(refresh_token, false);

    if (!token_type || token_type !== 'refresh') {
      authorization_failed({ raise: true });
    }

    const deleted_token = await this.dataSource.getRepository(RefreshToken).delete({ id: jti, user_id: current_user.id });

    if (!deleted_token.affected) {
      authorization_failed({ raise: true });
    }

    const user = await this.dataSource.getRepository(User).findOne({ where: { id: current_user.id } });

    if (!user) {
      authorization_failed({ raise: true });
    }

    if (user.is_blocked) {
      account_blocked({ raise: true });
    }

    return await this.genereteJwt(user);
  }

  public async changePassword(recovery_key: string, new_password: string) {
    const recovery_key_entity = await this.dataSource.getRepository(RecoveryKey).findOne({ where: { id: recovery_key } });

    if (!recovery_key_entity) {
      authorization_failed({ raise: true });
    }

    await this.dataSource.getRepository(User).update(recovery_key_entity.user_id, { password: passwordToHash(new_password) });

    await this.dataSource.getRepository(RecoveryKey).delete(recovery_key);

    return { message: 'OK' };
  }

  private async genereteJwt(user: User) {
    const refresh = await this.dataSource.getRepository(RefreshToken).save({ user_id: user.id }, { transaction: false });

    const access_token = sign({ current_user: user.json_for_jwt(), token_type: 'access' }, JWT_SETTINGS.secret_key, {
      jwtid: nanoid(16),
      expiresIn: `${JWT_SETTINGS.access_token_expires_in}m`,
      algorithm: JWT_SETTINGS.algorithm as Algorithm,
    });

    const refresh_token = sign({ current_user: { id: user.id }, token_type: 'refresh' }, JWT_SETTINGS.secret_key, {
      jwtid: refresh.id,
      expiresIn: `${JWT_SETTINGS.refresh_token_expires_in}m`,
      algorithm: JWT_SETTINGS.algorithm as Algorithm,
    });

    return {
      access_token,
      access_token_expires_at: new Date(
        new Date().setMinutes(new Date().getMinutes() + JWT_SETTINGS.access_token_expires_in)
      ).toISOString(),
      refresh_token,
      refresh_token_expires_at: new Date(
        new Date().setMinutes(new Date().getMinutes() + JWT_SETTINGS.refresh_token_expires_in)
      ).toISOString(),
    };
  }

  public async reGenerateRecoveryKeys(user_id: string) {
    await this.dataSource.getRepository(RecoveryKey).delete({ user_id });

    const keys = [];

    for (let i = 0; i < 5; i++) {
      keys.push({ user_id: user_id });
    }

    return (await this.dataSource.getRepository(RecoveryKey).save(keys, { transaction: false })).map((r) => r.id);
  }

  public verifyToken<T>(jwt_token: string, is_access_token = true) {
    try {
      return verify(jwt_token, JWT_SETTINGS.secret_key) as T;
    } catch (error) {
      if (is_access_token) {
        access_token_expired_signature({ raise: true });
      } else {
        refresh_token_expired_signature({ raise: true });
      }
    }
  }
}
