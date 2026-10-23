import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";
import SafetyChatbot from "./pages/SafetyChatbot";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import VRTraining from "./pages/VRTraining"; // add this import
import PPEScanner from "./pages/PPEScanner";
import PPEImages from "./pages/PPEImages";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/safety-chatbot" element={<SafetyChatbot />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/vr-training" element={<VRTraining />} />
          <Route path="/ppe-scanner" element={<PPEScanner />} />
          <Route path="/ppe-images" element={<PPEImages />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
