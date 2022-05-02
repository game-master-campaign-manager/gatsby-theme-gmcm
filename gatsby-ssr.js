/* eslint-disable import/prefer-default-export */
import React from 'react';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className';
import TopLayout from './src/components/TopLayout/TopLayout';

ClassNameGenerator.configure((componentName) => componentName.replace('Mui', 'gmcm-'));

export const wrapRootElement = ({ element }) => <TopLayout>{element}</TopLayout>;
