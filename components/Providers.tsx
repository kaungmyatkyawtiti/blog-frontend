"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from "./theme-provider";

interface Props {
  children: ReactNode;
}

export const queryClient = new QueryClient()

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient} >
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider >
    </ThemeProvider>
  )
}

