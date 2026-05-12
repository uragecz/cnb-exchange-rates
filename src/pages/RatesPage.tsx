import styled from 'styled-components';
import { ConverterForm } from '../components/ConverterForm';
import { ErrorBox } from '../components/ErrorBox';
import { RatesTable } from '../components/RatesTable';
import { Spinner } from '../components/Spinner';
import { useExchangeRates } from '../hooks/useExchangeRates';

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Heading = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

const Subheading = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

export const RatesPage = () => {
  const { data, isLoading, error } = useExchangeRates();

  return (
    <>
      <Header>
        <Heading>CNB Exchange Rates</Heading>
        <Subheading>
          Today&rsquo;s rates from the Czech National Bank. Convert any amount in CZK to
          a foreign currency.
        </Subheading>
      </Header>
      {isLoading && <Spinner />}
      {error && <ErrorBox message={error.message} />}
      {data && (
        <>
          <ConverterForm rates={data} />
          <RatesTable rates={data} />
        </>
      )}
    </>
  );
};
