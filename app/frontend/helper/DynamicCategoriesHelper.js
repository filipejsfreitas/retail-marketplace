export function revalidateTime() {
  // This value is in seconds
  // 5 mins = 300 s
  // 15 mins = 900 s
  // 30 mins = 1800 s
  // 1 h = 3600 s
  // 2 h = 7200 s
  // 4 h = 14400 s
  // 8 h = 28800 s
  // 16 h = 57600 s
  // 24 h = 86400 s
  return 3600;
}

// Helper function that handles the fetch of the categories
// currently in the database via the backend API 
export default async function fetchCategories() {
    const categories = await fetch(`${process.env.HOST}/category/`)
                            .then( (res) => res.json() )
                            .then( (data) => data.data )
                            .catch( () => false)
    return categories
}