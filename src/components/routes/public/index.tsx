import { PropsWithChildren } from "react"

type PublicRouteProps = PropsWithChildren;

export default function PublicRoute({ children }: PublicRouteProps) {
  return children;
}