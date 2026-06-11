function managerEntries(entry: string[] = []) {
    return [...entry, require.resolve('./register')];
}

function previewAnnotations(entry: string[] = []) {
    return [...entry, require.resolve('./preview')];
}

module.exports = {managerEntries, previewAnnotations};
