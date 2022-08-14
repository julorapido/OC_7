module.exports.signUpErrors = (err) => {
    let errors = { email: '', password: 'mauvais password'}

   
    if (err.message.includes('email'))
       errors.email = 'Email incorrect';
   
    if (err.message.includes('password'))
       errors.password = "Le mot de passe doit faire 6 caracteres minimums"
   
   if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
       errors.email = 'Cet email est deja enregitré'
   
    return errors;
   };
   
module.exports.signInErrors = (err) => {
       let errors = {email: '', password: ''}
   
       if (err.message.includes('email'))
           errors.email = "Email inconnu";
   
       if (err.message.includes('password'))
           errors.password = "Le mot de passe ne correspond pas";
       return errors
}