import { CallToAction } from "./components/CallToAction";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Deploy } from "./components/Deploy";
import { Pricing } from "./components/Pricing";
import { AdvancedCapabilities } from "./components/AdvancedCapabilities";
import { Technos } from "./components/Technos";
import { Why } from "./components/Why";
import { Backends } from "./components/Backends";
import { Open } from "./components/Open";
import { ByDevelopers } from "./components/ByDevelopers";
import { Users } from "./components/Users";
import { Chatwoot } from "./components/Chatwoot";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Technos />
        <Features />
        <AdvancedCapabilities />
        <Backends />
        <Deploy />
        <Open />
        <Why />
        <ByDevelopers />
        <Pricing />
        <Users />
        <CallToAction />
      </main>
      <Footer />
      <Chatwoot
        baseUrl={import.meta.env.VITE_CHATWOOT_URL}
        websiteToken={import.meta.env.VITE_CHATWOOT_WEBSITE_TOKEN}
        production={import.meta.env.PROD}
      />
    </>
  );
}

export default App;
