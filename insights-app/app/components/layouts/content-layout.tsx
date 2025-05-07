export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 items-center justify-center p-4 space-y-4">
      {children}
    </main>
  );
}
