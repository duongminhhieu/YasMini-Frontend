import { PropsWithChildren } from "react"

type AdminRouteProps = PropsWithChildren;

export default function AdminRoute({ children }: AdminRouteProps) {
  return children;
}