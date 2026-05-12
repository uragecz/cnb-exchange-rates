import styled from 'styled-components';
import { ThemeToggle } from './components/ThemeToggle';
import { RatesPage } from './pages/RatesPage';
import { ThemeModeProvider } from './providers/ThemeModeProvider';

const Shell = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  transition: background 150ms ease, color 150ms ease;
`;

const ToggleSlot = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
`;

const Container = styled.main`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const App = () => (
  <ThemeModeProvider>
    <Shell>
      <ToggleSlot>
        <ThemeToggle />
      </ToggleSlot>
      <Container>
        <RatesPage />
      </Container>
    </Shell>
  </ThemeModeProvider>
);

export default App;
