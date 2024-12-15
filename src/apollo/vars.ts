import { makeVar } from '@apollo/client';
import { CustomizationSchema } from '../core';

export const customizationSchemaVar = makeVar<CustomizationSchema>({});
