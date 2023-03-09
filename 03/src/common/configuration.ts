import dotenv from 'dotenv';
import { isKeyInObject } from '../utility/is-key-in-object.js';

dotenv.config();

type Value = string;
type ConvertedValue = number | boolean;
type ValueOrConvertedValue = Value | ConvertedValue;
type Converter = (value: Value) => ValueOrConvertedValue;
type VariableSpecification = { default?: Value; converter?: Converter };

const specificationSet = {
  NODE_ENV: {},
  PORT: { converter: Number },
} as const satisfies Record<string, VariableSpecification>;

type Key = keyof typeof specificationSet;
type GetValueOrConvertedValue<T extends VariableSpecification> =
  T['converter'] extends Converter ? ReturnType<T['converter']> : Value;
type Variable = {
  -readonly [K in Key]: typeof specificationSet[K] extends VariableSpecification
    ? GetValueOrConvertedValue<typeof specificationSet[K]>
    : never;
};

const keyToVariableSpecification: Record<Key, VariableSpecification> =
  specificationSet;
const keyToValueOrConvertedValue: Partial<Record<Key, ValueOrConvertedValue>> =
  {};

Object.keys(keyToVariableSpecification).forEach((key) => {
  if (!isKeyInObject(key, keyToVariableSpecification)) {
    return;
  }

  let valueOrDefaultValue = process.env[key];

  if (valueOrDefaultValue === undefined) {
    const defaultValue = keyToVariableSpecification[key].default;

    if (defaultValue === undefined) {
      throw new Error(`Environment variable ${key} not found`);
    }

    valueOrDefaultValue = defaultValue;
  }

  const valueConverter = keyToVariableSpecification[key]?.converter;

  if (valueConverter === undefined) {
    keyToValueOrConvertedValue[key] = valueOrDefaultValue;

    return;
  }

  const convertedValue = valueConverter(valueOrDefaultValue);

  keyToValueOrConvertedValue[key] = convertedValue;
});

const variable = keyToValueOrConvertedValue as Variable;
const appVariable = { isDevelopment: variable.NODE_ENV === 'development' };

type Configuration = Readonly<Variable & typeof appVariable>;

export const configuration: Configuration = {
  ...variable,
  ...appVariable,
} as const;
