export interface Event {
    id: string,
    name: string,
    type: string,
    description: string | null,
    url: string,
    images: eventImage[],
    salesStart: string,
    salesEnd: string,
    startDate: string,
    startTime: string, 
    endDate: string | null,
    timezone: string,
    status: string,
    minPrice: number | null,
    maxPrice: number | null,
    currency: string | null, 
    segment: string,
    genre: string;
    subGenre: string;
    venue: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    latitude: string;
    longitude: string;
    promoter: string;
    attractions: EventAttraction[];

}

export interface eventImage {
    ratio: string,
    url: string
    width: number,
    height: number
    fallback: boolean
    attribution?: string
}

export interface EventAttraction {
    name: string,
    url: string,
    images: eventImage[],
}


export interface PageInfo {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
}