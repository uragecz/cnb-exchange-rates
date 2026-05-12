import styled from 'styled-components';
import type { ExchangeRate } from '../api/cnb';
import { formatRate } from '../lib/format';
import { Paper } from './Paper';

type RatesTableProps = {
  rates: ExchangeRate[];
};

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const Th = styled.th<{ $numeric?: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: ${({ $numeric }) => ($numeric ? 'right' : 'left')};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: 600;
`;

const Td = styled.td<{ $numeric?: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  text-align: ${({ $numeric }) => ($numeric ? 'right' : 'left')};
  font-variant-numeric: ${({ $numeric }) => ($numeric ? 'tabular-nums' : 'normal')};
`;

const Tr = styled.tr`
  &:last-child td {
    border-bottom: none;
  }

  &:hover td {
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const RatesTable = ({ rates }: RatesTableProps) => (
  <Paper>
    <Table>
      <thead>
        <tr>
          <Th scope="col">Code</Th>
          <Th scope="col">Currency</Th>
          <Th scope="col">Country</Th>
          <Th scope="col" $numeric>Rate per 1 unit (CZK)</Th>
        </tr>
      </thead>
      <tbody>
        {rates.map((rate) => (
          <Tr key={rate.code}>
            <Td>{rate.code}</Td>
            <Td>{rate.currency}</Td>
            <Td>{rate.country}</Td>
            <Td $numeric>{formatRate(rate.ratePerUnit)}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  </Paper>
);
