export interface PetsAnimalsSubcategoryArtwork {
  image: string;
  gradient: [string, string];
}

const PETS_ANIMALS_SUBCATEGORY_ARTWORK: Record<string, PetsAnimalsSubcategoryArtwork> = {
  dogs: { image: "/assets/pets-animals-subcategories/dogs.jpg", gradient: ["#10b981", "#22d3ee"] },
  cats: { image: "/assets/pets-animals-subcategories/cats.jpg", gradient: ["#f472b6", "#8b5cf6"] },
  birds: { image: "/assets/pets-animals-subcategories/birds.jpg", gradient: ["#f59e0b", "#f472b6"] },
  "fish & aquarium": { image: "/assets/pets-animals-subcategories/fish-aquarium.jpg", gradient: ["#22d3ee", "#3b82f6"] },
  "rabbits & small pets": { image: "/assets/pets-animals-subcategories/rabbits-small-pets.jpg", gradient: ["#10b981", "#f472b6"] },
  "pet food": { image: "/assets/pets-animals-subcategories/pet-food.jpg", gradient: ["#f59e0b", "#f472b6"] },
  "pet supplies & accessories": { image: "/assets/pets-animals-subcategories/pet-supplies-accessories.jpg", gradient: ["#8b5cf6", "#22d3ee"] },
};

export function petsAnimalsSubcategoryArtwork(name: string): PetsAnimalsSubcategoryArtwork | null {
  return PETS_ANIMALS_SUBCATEGORY_ARTWORK[name.trim().toLowerCase()] ?? null;
}
