import ActivityOverview from "@/components/dashboard/ActivityOverview";
import MainActions from "@/components/dashboard/MainActions";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import Navbar from "@/components/Navbar";
import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

function DashboardPage() {
  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <Suspense fallback={<div className="h-32 w-full animate-pulse bg-muted rounded-3xl mb-12" />}>
          <WelcomeSection />
        </Suspense>

        <MainActions />

        <Suspense fallback={<div className="grid lg:grid-cols-3 gap-6 animate-pulse bg-muted h-64 rounded-xl" />}>
          <ActivityOverview />
        </Suspense>
      </div>
    </>
  );
}
export default DashboardPage;
