import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
// import { ClerkLoaded } from "@clerk/nextjs";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <ClerkLoaded>
    <ClerkProvider>

      <div className="flex-1 flex flex-col h-screen">
        {/* header */}
        <Header/>
        <main className="flex-1 overflow-y-auto">
        {children}
        </main>
        </div>
    </ClerkProvider>
    // </ClerkLoaded>
  );
};

export default DashboardLayout;
