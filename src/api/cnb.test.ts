import { describe, it, expect } from 'vitest';
import { parseCnbText } from './cnb';

const makeFixture = (...dataRows: string[]) =>
  ['12 May 2026 #90', 'Country|Currency|Amount|Code|Rate', ...dataRows].join('\n');

describe('parseCnbText', () => {
  it('computes ratePerUnit correctly for JPY (amount=100)', () => {
    const text = makeFixture('Japan|yen|100|JPY|16.234');
    const rates = parseCnbText(text);
    expect(rates).toHaveLength(1);
    expect(rates[0]?.ratePerUnit).toBeCloseTo(0.16234);
  });

  it('computes ratePerUnit correctly for EUR (amount=1)', () => {
    const text = makeFixture('EMU|euro|1|EUR|25.300');
    const rates = parseCnbText(text);
    expect(rates).toHaveLength(1);
    expect(rates[0]?.ratePerUnit).toBe(25.3);
  });

  it('skips the two header lines and returns only data rows', () => {
    const text = makeFixture('EMU|euro|1|EUR|25.300');
    const rates = parseCnbText(text);
    expect(rates).toHaveLength(1);
  });

  it('skips blank lines between data rows and parses all non-blank rows', () => {
    const text = makeFixture('EMU|euro|1|EUR|25.300', '', 'Japan|yen|100|JPY|16.234');
    const rates = parseCnbText(text);
    expect(rates).toHaveLength(2);
  });

  it('handles CRLF line endings from the CNB endpoint', () => {
    const text = [
      '12 May 2026 #90',
      'Country|Currency|Amount|Code|Rate',
      'EMU|euro|1|EUR|25.300',
      'Japan|yen|100|JPY|16.234',
    ].join('\r\n');
    const rates = parseCnbText(text);
    expect(rates).toHaveLength(2);
    expect(rates[0]?.code).toBe('EUR');
    expect(rates[1]?.code).toBe('JPY');
  });

  it('skips malformed rows with the wrong number of columns', () => {
    const text = makeFixture(
      'EMU|euro|1|EUR|25.300',
      'incomplete|row',
      'Japan|yen|100|JPY|16.234',
    );
    const rates = parseCnbText(text);
    expect(rates).toHaveLength(2);
  });

  it('skips rows where amount is zero or non-numeric (no Infinity/NaN in output)', () => {
    const text = makeFixture(
      'Bogus|x|0|XXX|10.000',
      'Other|y|notanumber|YYY|5.000',
      'EMU|euro|1|EUR|25.300',
    );
    const rates = parseCnbText(text);
    expect(rates).toHaveLength(1);
    expect(rates[0]?.code).toBe('EUR');
  });

  it('returns an empty array for empty input', () => {
    expect(parseCnbText('')).toEqual([]);
  });
});
