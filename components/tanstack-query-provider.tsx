"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, useState } from "react";

const TanstackQueryProvider: FC<React.PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(() => {
    return new QueryClient();
  });
  return <QueryClientProvider children={children} client={queryClient} />;
};
export default TanstackQueryProvider;
