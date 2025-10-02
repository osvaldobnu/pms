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
  cleaningFee?: string; // NOVO CAMPO

  // Configuração de camas
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
  highSeason: string;   // NOVO CAMPO
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
  cleaningFee?: number; // NOVO CAMPO

  // Configuração de camas
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
  highSeason: number;   // NOVO CAMPO
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
  commissionTotal?: string;
  cleaningFee?: string;     // Taxa de Faxina
  monetaryValue?: string;   // Valor Monetário
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
  commissionTotal?: number;
  cleaningFee?: number;     // Taxa de Faxina
  monetaryValue?: number;   // Valor Monetário
  createdAt: string;
  updatedAt: string;
}
