import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "@/components/layout/Layout";

const HomePage = lazy(() => import("./pages/HomePage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const MaternalHealthPage = lazy(() => import("./pages/MaternalHealthPage"));
const OutpatientCarePage = lazy(() => import("./pages/OutpatientCarePage"));
const LabDiagnosticsPage = lazy(() => import("./pages/LabDiagnosticsPage"));
const CommunityOutreachPage = lazy(() => import("./pages/CommunityOutreachPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const FounderStoryPage = lazy(() => import("./pages/FounderStoryPage"));
const LeadershipPage = lazy(() => import("./pages/LeadershipPage"));
const ImpactPage = lazy(() => import("./pages/ImpactPage"));
const FutureHospitalPage = lazy(() => import("./pages/FutureHospitalPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const QRCodePage = lazy(() => import("./pages/QRCodePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center space-y-3">
      <span className="text-3xl font-heading font-bold text-primary">LMM</span>
      <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<Layout><HomePage /></Layout>} path="/" />
            <Route element={<Layout><ServicesPage /></Layout>} path="/services" />
            <Route element={<Layout><MaternalHealthPage /></Layout>} path="/services/maternal-health" />
            <Route element={<Layout><OutpatientCarePage /></Layout>} path="/services/outpatient-care" />
            <Route element={<Layout><LabDiagnosticsPage /></Layout>} path="/services/lab-diagnostics" />
            <Route element={<Layout><CommunityOutreachPage /></Layout>} path="/services/community-outreach" />
            <Route element={<Layout><AboutPage /></Layout>} path="/about" />
            <Route element={<Layout><FounderStoryPage /></Layout>} path="/about/founder-story" />
            <Route element={<Layout><LeadershipPage /></Layout>} path="/about/leadership" />
            <Route element={<Layout><ImpactPage /></Layout>} path="/about/impact" />
            <Route element={<Layout><FutureHospitalPage /></Layout>} path="/future" />
            <Route element={<Layout><CareersPage /></Layout>} path="/careers" />
            <Route element={<Layout><FAQPage /></Layout>} path="/faq" />
            <Route element={<Layout><ContactPage /></Layout>} path="/contact" />
            <Route element={<Layout><PrivacyPage /></Layout>} path="/privacy" />
            <Route element={<Layout><TermsPage /></Layout>} path="/terms" />
            <Route element={<QRCodePage />} path="/qr" />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
