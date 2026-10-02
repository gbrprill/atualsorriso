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
import { SmoothScroll } from '@/components/motion/SmoothScroll';

export default function Page() {
  return (
    <AppProvider>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>
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
          {/* Última seção: convite final + rodapé juntos, ocupando a tela inteira. */}
          <div className="final-wrap" data-flow>
            <FinalCta />
            <Footer />
          </div>
        </div>
      </main>
      <MobileBar />
      <SmoothScroll />
    </AppProvider>
  );
}
