export const WHATSAPP_NUMBER = "919876543210";
export const PHONE_DISPLAY = "+91 98765 43210";
export const EMAIL = "info@skyhighstructures.in";
export const OFFICE_ADDRESS = "4th Floor, Skyline Tower, RS Puram, Coimbatore, TN 641002";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
