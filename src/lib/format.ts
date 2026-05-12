const amountFormatter = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const rateFormatter = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
});

export const formatAmount = (value: number): string =>
  Number.isFinite(value) ? amountFormatter.format(value) : '—';

export const formatRate = (value: number): string =>
  Number.isFinite(value) ? rateFormatter.format(value) : '—';
