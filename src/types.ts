// --- Tipos de Propriedade ---
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
  cleaningFee?: string;

  crib?: string;
  childBed?: string;
  doubleBed?: string;
  foldingBed?: string;
  kingBed?: string;
  mezzanineBed?: string;
  queenBed?: string;
  sofaBed?: string;
  singleBed?: string;

  lowSeason: string;
  highSeason: string;
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
  cleaningFee?: number;

  crib?: number;
  childBed?: number;
  doubleBed?: number;
  foldingBed?: number;
  kingBed?: number;
  mezzanineBed?: number;
  queenBed?: number;
  sofaBed?: number;
  singleBed?: number;

  lowSeason: number;
  highSeason: number;
  holidays: number;
  christmas: number;
  newYear: number;
  carnival: number;
  active: boolean;
}

// --- Tipos de Reserva ---
export interface ReservationForm {
  code?: string;
  guestName: string;
  propertyId: string;
  guestCount?: string;
  checkIn: string;
  checkOut: string;
  totalValue: string;
  notes?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  secondInstallmentDate?: string;
  thirdInstallmentDate?: string;
  commissionTotal?: string;  // <-- COMISSÃO NOVO
  cleaningFee?: string;
  monetaryValue?: string;
}

export interface ReservationData {
  id: string;
  code?: string;
  guestName: string;
  guestCount?: number;
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
  commissionTotal?: number; // <-- COMISSÃO NOVO
  cleaningFee?: number;
  monetaryValue?: number;
  createdAt: string;
  updatedAt: string;
}
