import DashboardStats from "@/src/components/DashboardStats";
import QuickActions from "@/src/components/QuickActions";
import WelcomeCard from "@/src/components/WelcomeCard";

export default function DashboardPage() {
  return (
    <main className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardStats />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WelcomeCard />
        <QuickActions />
      </div>
    </main>
  );
}