module.exports = (req, res, next) => {
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if(!regexPassword.test(req.body.password)){
        res.status(400).json({ message: "Le mot de passe n'est pas valide: il faut au moins un chiffre, une minuscule, une majuscule"});
    } else {
        next();
    }
}