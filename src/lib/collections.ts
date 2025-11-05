'use server'

/**
 * Fetch all collections
 * @note Collection model doesn't exist in schema, returning empty array
 */
async function fetchCollections() {
    console.warn('fetchCollections called but Collection model does not exist in schema')
    return []
}

/**
 * Fetch collection by ID
 * @note Collection model doesn't exist in schema, returning null
 */
async function fetchCollectionById(id: number) {
    console.warn('fetchCollectionById called but Collection model does not exist in schema')
    return null
}

export { fetchCollections, fetchCollectionById }
