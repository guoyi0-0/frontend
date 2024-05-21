import logo from '../../static/Empallo.png';

export interface LogoProps {
  readonly size: number;
}

export function Logo(props: LogoProps): JSX.Element {
  return (
    <img src={logo} alt="Empallo Logo" style={{ width: props.size, height: 'auto' }} />
  );
}
