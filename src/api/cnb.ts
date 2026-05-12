export type ExchangeRate = {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
  ratePerUnit: number;
};

const EXPECTED_COLUMN_COUNT = 5;
const HEADER_LINE_COUNT = 2;

const parseRow = (line: string): ExchangeRate | null => {
  const parts = line.split('|');
  if (parts.length !== EXPECTED_COLUMN_COUNT) return null;

  const [country, currency, amountRaw, code, rateRaw] = parts as [
    string,
    string,
    string,
    string,
    string,
  ];

  const amount = Number.parseFloat(amountRaw);
  const rate = Number.parseFloat(rateRaw);

  if (!Number.isFinite(amount) || !Number.isFinite(rate) || amount <= 0) {
    return null;
  }

  return {
    country: country.trim(),
    currency: currency.trim(),
    amount,
    code: code.trim(),
    rate,
    ratePerUnit: rate / amount,
  };
};

export const parseCnbText = (text: string): ExchangeRate[] => {
  const lines = text.split(/\r?\n/);
  return lines
    .slice(HEADER_LINE_COUNT)
    .map((line) => line.trim())
    .filter((line) => line !== '')
    .map(parseRow)
    .filter((row): row is ExchangeRate => row !== null);
};

const CNB_URL =
  '/api/cnb/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

export const fetchExchangeRates = async (): Promise<ExchangeRate[]> => {
  const response = await fetch(CNB_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch CNB rates: ${response.status}`);
  }
  const text = await response.text();
  return parseCnbText(text);
};
