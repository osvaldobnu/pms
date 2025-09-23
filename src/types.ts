// Tipos de propriedade
export interface PropertyForm {
  id?: string;
  name: string;
  title: string;
  description?: string;
  phone?: string;
  ranking?: string;

  location?: string;
  locationNotes?: string;
  beach?: string;

  guests: string;
  bedrooms: string;
  beds: string;
  amenities?: string;
  extraGuestFee?: string;

  lowSeason: string;
  holidays: string;
  christmas: string;
  newYear: string;
  carnival: string;
}

export interface PropertyData {
  id: string;
  name: string;
  title: string;
  description?: string;
  phone?: string;
  ranking?: number;

  location?: string;
  locationNotes?: string;
  beach?: string;

  guests: number;
  bedrooms: number;
  beds: number;
  amenities?: string;
  extraGuestFee?: number;

  lowSeason: number;
  holidays: number;
  christmas: number;
  newYear: number;
  carnival: number;
  active: boolean;
}

// --- Tipos de Reserva ---
export interface ReservationForm {
  guestName: string;
  propertyId: string;
  guestCount?: string; // NOVO
  checkIn: string;
  checkOut: string;
  totalValue: string;
  notes?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  secondInstallmentDate?: string;
  thirdInstallmentDate?: string;
  commissionTotal?: string;
  commissionStatusJoao?: string;
  commissionStatusMateus?: string;
}

export interface ReservationData {
  id: string;
  guestName: string;
  guestCount?: number; // NOVO
  property: PropertyData;
  checkIn: string;
  checkOut: string;
  totalValue: number;
  notes?: string;
  canceled: boolean;
  paymentMethod?: string;
  paymentStatus?: string;
  secondInstallmentDate?: string;
  thirdInstallmentDate?: string;
  commissionTotal?: number;
  commissionStatusJoao?: string;
  commissionStatusMateus?: string;
  createdAt: string;
  updatedAt: string;
}
