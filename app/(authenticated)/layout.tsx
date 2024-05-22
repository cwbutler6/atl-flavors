import Header from "@/components/Header";
import { useProtected } from "@/components/hooks/useProtected";

export default async function AuthenticatedLayout({ children }: {
  children: React.ReactNode;
}) {
  await useProtected();
  return (
    <div className="flex flex-1 w-full flex-col items-center">
      <Header />
      {children}
    </div>
  );
}
