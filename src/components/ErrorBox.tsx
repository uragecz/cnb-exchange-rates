import styled from 'styled-components';

type ErrorBoxProps = {
  message: string;
};

const Box = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const ErrorBox = ({ message }: ErrorBoxProps) => (
  <Box role="alert">{message}</Box>
);
