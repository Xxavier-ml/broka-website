export interface BooksEducationSubcategoryArtwork {
  image: string;
  gradient: [string, string];
}

const BOOKS_EDUCATION_SUBCATEGORY_ARTWORK: Record<string, BooksEducationSubcategoryArtwork> = {
  textbooks: { image: "/assets/books-education-subcategories/textbooks.jpg", gradient: ["#7c5cff", "#3b82f6"] },
  "revision books & past papers": { image: "/assets/books-education-subcategories/revision-books-past-papers.jpg", gradient: ["#f59e0b", "#7c5cff"] },
  fiction: { image: "/assets/books-education-subcategories/fiction.jpg", gradient: ["#8b5cf6", "#ec4899"] },
  "non-fiction": { image: "/assets/books-education-subcategories/non-fiction.jpg", gradient: ["#3b82f6", "#8b5cf6"] },
  "children's books": { image: "/assets/books-education-subcategories/childrens-books.jpg", gradient: ["#ec4899", "#22c9f0"] },
  "religious books": { image: "/assets/books-education-subcategories/religious-books.jpg", gradient: ["#f59e0b", "#7c5cff"] },
  "stationery & supplies": { image: "/assets/books-education-subcategories/stationery-supplies.jpg", gradient: ["#22c9f0", "#8b5cf6"] },
  "educational materials": { image: "/assets/books-education-subcategories/educational-materials.jpg", gradient: ["#3b82f6", "#10b981"] },
};

export function booksEducationSubcategoryArtwork(name: string): BooksEducationSubcategoryArtwork | null {
  return BOOKS_EDUCATION_SUBCATEGORY_ARTWORK[name.trim().toLowerCase()] ?? null;
}
