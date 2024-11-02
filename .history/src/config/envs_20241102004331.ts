import 'dotenv/config';
import * as joi from 'joi';
import * as process from 'process';
import {string} from "joi";

interface EnvVars {
  PORT: number;
  PRODUCTS_MICROSERVICES_HOST: string;
  PRODUCTS_MICROSERVICES_PORT: number;
  ORDERS_MICROSERVICICES_HOST
}

const envsSchema = joi.object(
  {
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICES_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICES_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config Validation ERROR: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  productsMSHost: envVars.PRODUCTS_MICROSERVICES_HOST,
  productsMSPort: envVars.PRODUCTS_MICROSERVICES_PORT
}