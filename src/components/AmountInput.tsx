import { forwardRef, useId } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

type AmountInputProps = {
  label?: string | undefined;
  error?: string | undefined;
} & ComponentPropsWithoutRef<'input'>;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Input = styled.input<{ $hasError: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  outline: none;
  transition: border-color 120ms ease;

  &:focus {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.primary};
  }
`;

const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.error};
`;

export const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  ({ label, error, id, ...rest }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const errorId = `${inputId}-error`;

    return (
      <Wrapper>
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <Input
          id={inputId}
          ref={ref}
          $hasError={Boolean(error)}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? errorId : undefined}
          inputMode="decimal"
          {...rest}
        />
        {error && <ErrorText id={errorId}>{error}</ErrorText>}
      </Wrapper>
    );
  },
);

AmountInput.displayName = 'AmountInput';
