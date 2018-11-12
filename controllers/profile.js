const handleProfile = (db) => (req, res) => {
    const { id } = req.params;
    db('users')
        .select('*')
        .where({ id: id })
        .then(user => {
            if (user.length) {
                return res.json(user[0]);
            } else {
                res.status(400).json('Not found.');
            }
        })
}

module.exports = {
    handleProfile
}