import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { ConverterForm } from './ConverterForm';
import { lightTheme } from '../theme';
import type { ExchangeRate } from '../api/cnb';

const renderForm = (rates: ExchangeRate[]) =>
  render(
    <ThemeProvider theme={lightTheme}>
      <ConverterForm rates={rates} />
    </ThemeProvider>,
  );

const eur: ExchangeRate = {
  country: 'EMU',
  currency: 'euro',
  amount: 1,
  code: 'EUR',
  rate: 25,
  ratePerUnit: 25,
};

describe('ConverterForm', () => {
  it('converts an amount in CZK to the selected currency', async () => {
    const user = userEvent.setup();
    renderForm([eur]);

    await user.type(screen.getByLabelText(/amount in czk/i), '100');

    expect(screen.getByText(/4\.0000 EUR/)).toBeInTheDocument();
  });

  it('shows a validation error for a negative amount', async () => {
    const user = userEvent.setup();
    renderForm([eur]);

    await user.type(screen.getByLabelText(/amount in czk/i), '-5');

    expect(await screen.findByText(/zero or positive/i)).toBeInTheDocument();
  });
});
