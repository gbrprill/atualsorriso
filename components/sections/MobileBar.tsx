import { ContactButton } from '@/components/ui/ContactButton';
import { MapsLink } from '@/components/ui/ActionButtons';

export function MobileBar() {
  return (
    <div className="mbar" role="region" aria-label="Contato rápido">
      <ContactButton position="mobile-bar" />
      <MapsLink position="mobile-bar" />
    </div>
  );
}
