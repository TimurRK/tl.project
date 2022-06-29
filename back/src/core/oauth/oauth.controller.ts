import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { validateDTO } from '../../helpers/validate.helper';
import { authorization_failed } from '../../errors';

import { OAuthService } from './oauth.service';
import { SignInByPasswordDTO } from './dto/sign-in-by-password.dto';
import { SignInByRefreshTokenDTO } from './dto/sign-in-by-refresh-token.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { RegistrationDTO } from './dto/registration.dto';

@ApiTags('oauth')
@Controller('oauth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  @ApiOperation({
    summary: 'Регистрация нового пользователя',
  })
  @ApiBody({
    type: RegistrationDTO,
    required: true,
  })
  @Post('registration')
  public async registration(@Body() body: RegistrationDTO) {
    return await this.oauthService.registration(body.login, body.password);
  }

  @ApiOperation({
    summary: 'Получение JWT токена',
  })
  @ApiQuery({
    name: 'grand_type',
    description: 'Тип авторизации',
    enum: ['password', 'refresh_token'],
    required: true,
  })
  @ApiQuery({
    name: 'username',
    description: 'Логин пользователя. Передавать если grand_type = password',
    required: false,
  })
  @ApiQuery({
    name: 'password',
    description: 'Пароль пользователя. Передавать если grand_type = password',
    required: false,
  })
  @ApiQuery({
    name: 'refresh_token',
    description: 'Токен для обновления JWT токена. Передавать если grand_type = refresh_token',
    required: false,
  })
  @Post('token')
  public async token(@Req() req: Request) {
    if (Object.keys(req.query).length) {
      switch (req.query.grand_type) {
        case 'password':
          const sign_in_by_password_dto = {
            login: req.query.username as string,
            password: req.query.password as string,
          };

          validateDTO(SignInByPasswordDTO, sign_in_by_password_dto);

          return await this.oauthService.signInByPassword(sign_in_by_password_dto.login, sign_in_by_password_dto.password);
        case 'refresh_token':
          const sign_in_by_refresh_token_dto = {
            refresh_token: req.query.refresh_token as string,
          };

          validateDTO(SignInByRefreshTokenDTO, sign_in_by_refresh_token_dto);

          return await this.oauthService.signInByRefreshToken(sign_in_by_refresh_token_dto.refresh_token);
      }
    }

    authorization_failed({ raise: true });
  }

  @ApiOperation({
    summary: 'Восстановление пароля',
  })
  @ApiBody({
    type: ChangePasswordDTO,
    required: true,
  })
  @Post('change_password')
  public async changePassword(@Body() body: ChangePasswordDTO) {
    return await this.oauthService.changePassword(body.recovery_key, body.new_password);
  }
}
