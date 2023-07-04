import { ICowModelBreed, ICowModelCategory, ICowModelLabel, ICowModelLocation } from "./cowModel.interface";

export const cowModelLocation: ICowModelLocation[] = [
    "Dhaka",
    "Chattogram",
    "Barishal",
    "Rajshahi",
    "Sylhet",
    "Comilla",
    "Rangpur",
    "Mymensingh"
]

export const cowModelBreed: ICowModelBreed[] = [
    "Brahman",
    "Nellore",
    "Sahiwal",
    "Gir",
    "Indigenous",
    "Tharparkar",
    "Kankrej"
]

export const cowModelLabel: ICowModelLabel[] = [
    "for sale",
    "sold out"
]

export const cowModelCategory: ICowModelCategory[] = [
    "Dairy",
    "Beef",
    "Dual Purpose",
]

export const cowModelSearchableFields = [
    'id',
    'name',
    'location',
    'breed',
    'category',

]

export const cowModelFilterableField = [
    'searchTerm',
    'id',
    'price',
    'location',
    'maxPrice',
    'minPrice'
]

