function managerEntries(entry: string[] = []) {
    return [...entry, require.resolve('./register')];
}

module.exports = {managerEntries};
