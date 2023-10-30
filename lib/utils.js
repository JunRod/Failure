export const createUrl = (pathname, params) => {
    return `${pathname}?${new URLSearchParams(params).toString()}`
}

export const collectionsToString = (collections) => {
    let contentMessage = ''

    collections.map(collection => {
        contentMessage += collection.content + '\n'
    })

    return contentMessage
}