import { useProtected } from "../hooks/useProtected";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useProtected();
  return children;
}
