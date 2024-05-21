import { PropsWithChildren } from "react";
import { ThemeProvider } from "./ThemeProvider";

export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
