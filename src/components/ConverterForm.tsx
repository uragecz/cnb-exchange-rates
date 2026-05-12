import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import type { ExchangeRate } from '../api/cnb';
import { AmountInput } from './AmountInput';
import { CurrencySelect } from './CurrencySelect';
import { Paper } from './Paper';
import { formatAmount, formatRate } from '../lib/format';

type ConverterFormProps = {
  rates: ExchangeRate[];
};

type FormValues = {
  amount: string;
  code: string;
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Row = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;

  > * {
    flex: 1;
    min-width: 220px;
  }
`;

const ResultRow = styled.div`
  min-height: ${({ theme }) => theme.fontSizes.xl};
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ResultLabel = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const ResultValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  font-variant-numeric: tabular-nums;
`;

const parseAmount = (raw: string): number => {
  const normalized = raw.trim().replace(',', '.');
  if (normalized === '') return Number.NaN;
  return Number.parseFloat(normalized);
};

export const ConverterForm = ({ rates }: ConverterFormProps) => {
  const defaultCode = rates[0]?.code ?? '';

  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      amount: '',
      code: defaultCode,
    },
  });

  const amount = watch('amount');
  const code = watch('code');

  const selectedRate = rates.find((r) => r.code === code);
  const numericAmount = parseAmount(amount);
  const result =
    selectedRate && selectedRate.ratePerUnit > 0 && Number.isFinite(numericAmount)
      ? formatRate(numericAmount / selectedRate.ratePerUnit)
      : null;

  return (
    <Paper>
      <Form
        onSubmit={(e) => e.preventDefault()}
        aria-label="Convert CZK to foreign currency"
      >
        <Row>
        <AmountInput
          label="Amount in CZK"
          placeholder="0.00"
          error={errors.amount?.message}
          {...register('amount', {
            validate: (value) => {
              if (value === '') return true;
              const num = parseAmount(value);
              if (Number.isNaN(num)) return 'Enter a valid number';
              if (num < 0) return 'Amount must be zero or positive';
              return true;
            },
          })}
        />
        <Controller
          control={control}
          name="code"
          render={({ field }) => (
            <CurrencySelect
              label="Convert to"
              value={field.value}
              onChange={field.onChange}
              options={rates}
              name={field.name}
            />
          )}
        />
        </Row>
        <ResultRow aria-live="polite" aria-atomic="true">
          {result !== null ? (
            <>
              <ResultLabel>
                {formatAmount(numericAmount)} CZK =
              </ResultLabel>
              <ResultValue>
                {result} {code}
              </ResultValue>
            </>
          ) : (
            <ResultLabel>Enter an amount to see the conversion</ResultLabel>
          )}
        </ResultRow>
      </Form>
    </Paper>
  );
};
