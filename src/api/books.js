const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

//gets all books
export async function getBooks() {
  try {
    const response = await fetch(API + "/books");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

//gets a book by id
export async function getBookById(id) {
try {
const response = await fetch(API + "/books/" + id);
const result = await response.json();
return result;
} catch (e) {
console.error(e);
return null;
}
}