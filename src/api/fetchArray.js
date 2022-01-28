export async function fetchShaurma() {
  const response = await fetch('http://localhost:3000/shaurma-list')

  const commits = await response.json()

  const result = await commits.name
  return result
}
