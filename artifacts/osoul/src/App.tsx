import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { HomePage } from "@/pages/HomePage";
import { OffersPage } from "@/pages/OffersPage";
import { AboutPage } from "@/pages/AboutPage";
import { ReviewsPage } from "@/pages/ReviewsPage";
import { ContactPage } from "@/pages/ContactPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="/ar" />
      </Route>
      
      <Route path="/ar" component={HomePage} />
      <Route path="/en" component={HomePage} />
      
      <Route path="/ar/offers" component={OffersPage} />
      <Route path="/en/offers" component={OffersPage} />
      <Route path="/ar/offers/:category" component={OffersPage} />
      <Route path="/en/offers/:category" component={OffersPage} />
      
      <Route path="/ar/about" component={AboutPage} />
      <Route path="/en/about" component={AboutPage} />
      
      <Route path="/ar/reviews" component={ReviewsPage} />
      <Route path="/en/reviews" component={ReviewsPage} />
      
      <Route path="/ar/contact" component={ContactPage} />
      <Route path="/en/contact" component={ContactPage} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
