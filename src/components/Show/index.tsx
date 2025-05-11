import { ReactNode } from 'react';

type IShowProps = {
  when: boolean;
  fallback?: ReactNode;
  children: ReactNode;
};
export default function Show(props: IShowProps) {
  const { when, fallback = null, children } = props;
  return when ? children : fallback;
}
