import { useQuery } from '@tanstack/react-query';
import { fetchExchangeRates } from '../api/cnb';

export function useExchangeRates() {
  return useQuery({
    queryKey: ['exchangeRates'],
    queryFn: fetchExchangeRates,
    staleTime: 60 * 60 * 1000,
  });
}
