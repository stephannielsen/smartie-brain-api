const handleSignIn = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('error');
    }
    return db
        .select('email', 'hash')
        .from('login')
        .where('email', '=', email)
        .then(login => {
            const isValid = bcrypt.compareSync(password, login[0].hash);
            if (isValid) {
                return db
                    .select('*')
                    .from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json(err));
            } else {
                throw "fail.";
            }
        })
        .catch(err => res.status(400).json('Wrong credentials.'));
}

module.exports = {
    handleSignIn
}