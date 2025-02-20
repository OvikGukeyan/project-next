import type { Metadata } from "next";



export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
                <main className="min-h-screen">
                    {children}
                </main>
        </html>
    );
}
