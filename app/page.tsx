import { AppProvider } from '@/components/AppProvider';
import { Header } from '@/components/sections/Header';
import { HeroStage } from '@/components/sections/HeroStage';
import { Trust } from '@/components/sections/Trust';
import { Services } from '@/components/sections/Services';
import { Results } from '@/components/sections/Results';
import { Team } from '@/components/sections/Team';
import { Clinic } from '@/components/sections/Clinic';
import { FirstConversation } from '@/components/sections/FirstConversation';
import { Testimonials } from '@/components/sections/Testimonials';
import { Faq } from '@/components/sections/Faq';
import { Location } from '@/components/sections/Location';
import { FinalCta } from '@/components/sections/FinalCta';
import { Footer } from '@/components/sections/Footer';
import { MobileBar } from '@/components/sections/MobileBar';
import { MotionRoot } from '@/components/motion/MotionRoot';

export default function Page() {
  return (
    <AppProvider>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <MotionRoot />
      <Header />
      <main id="conteudo">
        <HeroStage />
        <div className="cover">
        <Trust />
        <Services />
        <Results />
        <Team />
        <Clinic />
        <FirstConversation />
        <Testimonials />
        <Faq />
        <Location />
        <FinalCta />
        <Footer />
        </div>
      </main>
      <MobileBar />
    </AppProvider>
  );
}
