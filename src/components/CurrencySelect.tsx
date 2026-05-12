import { useId } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import styled from 'styled-components';

export type CurrencyOption = {
  code: string;
  currency: string;
  country: string;
};

type CurrencySelectProps = {
  value: string;
  onChange: (code: string) => void;
  options: CurrencyOption[];
  label?: string | undefined;
  id?: string | undefined;
  name?: string | undefined;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Trigger = styled(RadixSelect.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  cursor: pointer;
  outline: none;
  transition: border-color 120ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }

  &[data-placeholder] {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const Icon = styled(RadixSelect.Icon)`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Content = styled(RadixSelect.Content)`
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  box-shadow: ${({ theme }) => theme.shadows.card};
  z-index: 50;
  min-width: var(--radix-select-trigger-width);
  max-width: var(--radix-select-trigger-width);
  max-height: var(--radix-select-content-available-height);
`;

const Viewport = styled(RadixSelect.Viewport)`
  padding: ${({ theme }) => theme.spacing.xs};
`;

const Item = styled(RadixSelect.Item)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
  user-select: none;
  outline: none;

  &[data-highlighted] {
    background: ${({ theme }) => theme.colors.primary}22;
    color: ${({ theme }) => theme.colors.text};
  }

  &[data-state='checked'] {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;

const ItemCode = styled.span`
  font-variant-numeric: tabular-nums;
`;

const ItemDetail = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ItemIndicator = styled(RadixSelect.ItemIndicator)`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
`;

const ScrollButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: default;
`;

export const CurrencySelect = ({
  value,
  onChange,
  options,
  label,
  id,
  name,
}: CurrencySelectProps) => {
  const autoId = useId();
  const triggerId = id ?? autoId;

  return (
    <Wrapper>
      {label && <Label htmlFor={triggerId}>{label}</Label>}
      <RadixSelect.Root
        value={value}
        onValueChange={onChange}
        {...(name !== undefined && { name })}
      >
        <Trigger id={triggerId} aria-label={label}>
          <RadixSelect.Value placeholder="Select currency" />
          <Icon>
            <ChevronDown size={16} aria-hidden />
          </Icon>
        </Trigger>
        <RadixSelect.Portal>
          <Content position="popper" sideOffset={4} collisionPadding={8}>
            <RadixSelect.ScrollUpButton asChild>
              <ScrollButton>
                <ChevronUp size={16} aria-hidden />
              </ScrollButton>
            </RadixSelect.ScrollUpButton>
            <Viewport>
              {options.map((opt) => (
                <Item key={opt.code} value={opt.code}>
                  <RadixSelect.ItemText>
                    <ItemCode>{opt.code}</ItemCode>{' '}
                    <ItemDetail>
                      — {opt.currency} ({opt.country})
                    </ItemDetail>
                  </RadixSelect.ItemText>
                  <ItemIndicator>
                    <Check size={14} aria-hidden />
                  </ItemIndicator>
                </Item>
              ))}
            </Viewport>
            <RadixSelect.ScrollDownButton asChild>
              <ScrollButton>
                <ChevronDown size={16} aria-hidden />
              </ScrollButton>
            </RadixSelect.ScrollDownButton>
          </Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </Wrapper>
  );
};
