import ProtectedRoute from "@/context/protected-route";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
        {children}
    </ProtectedRoute>
  );
}
