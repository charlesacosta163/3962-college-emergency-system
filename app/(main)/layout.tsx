export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="min-h-screen flex justify-center items-center">

        <main className="max-w-250 w-full p-4">
            {children}
        </main>
      </div>
    );
  }