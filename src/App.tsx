import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CustomScrollbar from "./components/CustomScrollbar";
import CustomCursor from "./components/CustomCursor";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import BookDiscovery from "./pages/BookDiscovery";
import Podcast from "./pages/Podcast";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <CustomScrollbar />
    <CustomCursor />
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book" element={<BookDiscovery />} />
        <Route path="/podcast" element={<Podcast />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
