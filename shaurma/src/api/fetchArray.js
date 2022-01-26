export async function fetchShaurma() {
    const response = await fetch('http://localhost:3000/shaurma-list');

    let commits = await response.json()

    let result = await commits.name
    return result;
}