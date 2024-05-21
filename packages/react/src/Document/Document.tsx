import { Container } from '../Container/Container';
import { Panel, PanelProps } from '../Panel/Panel';

export interface DocumentProps extends PanelProps {
  width?:  number;
  height?: number;
}

export function Document(props: DocumentProps): JSX.Element {
  const { children, width = '100%', height = 'auto', ...others } = props;
  return (
    <Container style={{ width, height }}>
      <Panel {...others} style={{ width: '100%', height: '100%' }}>
        {children}
      </Panel>
    </Container>
  );
}
