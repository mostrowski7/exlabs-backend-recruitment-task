import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

export enum Environment {
  Test = 'test',
  Development = 'development',
  Production = 'production',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  nodeEnv: Environment;

  @IsNumber()
  port: number;

  @IsString()
  pgHost: string;

  @IsNumber()
  pgPort: number;

  @IsString()
  pgUser: string;

  @IsString()
  pgPassword: string;

  @IsString()
  pgDatabase: string;

  @IsString()
  jwtSecret: string;

  @IsString()
  jwtExpirationTime: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
