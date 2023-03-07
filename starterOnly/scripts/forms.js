const firstName = document.querySelector('#first');
const lastName = document.querySelector('#last');
const email = document.querySelector('#email');
const quantityTournois = document.querySelector('#quantity');
const birthDate = document.querySelector('#birthdate');
const tournois = document.querySelector('input[name="location"]');
const terms = document.querySelector('#checkbox1')
const form = document.querySelector('input[type="submit"]')

const modalbg = document.querySelector(".bground");
const modalBgConfirmation = document.querySelector(".bground2");
const modalBtn2 = document.querySelector(".btn-submit");
const closeModal = document.querySelector(".confirmation-cross");
const closeBtn = document.querySelector(".closed-button");


// initate empty array
let errors = []

form.addEventListener('click', (event)=>{
    event.preventDefault();

    // Launch all the checks
    checkAllFrom();

    // check if the form is valid is launch the modal confirmation
    if(errors.every(elem => elem === true)){
        console.log('works')
        modalBtn2.addEventListener('click', launchConfirmationModal());
        closeModal.addEventListener('click', closeModalConfirmation);
        closeBtn.addEventListener('click', closeModalConfirmation);

    }else {
        event.preventDefault();
    }

    // reset the array checker
    errors = []

})


// Launch confirmation form
function launchConfirmationModal(){
    modalbg.style.display = "none";
    modalBgConfirmation.style.display = "block";
}
  
// close confirmation form
function closeModalConfirmation(){
    modalBgConfirmation.style.display = "none";
}
  
const checkAllFrom = () => {
    checkFirstNameForm();
    checkLastNameForm();
    checkEmailForm();
    checkOccuranceForm();
    checkBirthdateForm();
    checkRadioForm();
    checkTerms();
}

const checkFirstNameForm = () => {
    const firstNameValue = firstName.value;
    const isValidated = !!(firstNameValue === null || firstNameValue.length < 2) 
    updateAreaInput(isValidated, firstName, 'Veuillez entrer 2 caractères')
    errors.push(!isValidated)
    return isValidated
}

const checkLastNameForm = () => {
    const lastNameValue = lastName.value;
    const isValidated = !!(lastNameValue === null || lastNameValue.length < 2);
    updateAreaInput(isValidated, lastName, 'Veuillez entrer 2 caractères ')
    errors.push(!isValidated)
    return isValidated
}

const checkEmailForm = () =>  {
    const emailValue = email.value;
    const isEmail = (emailValue) =>{
        // Source: https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
        return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(emailValue);
    }
    const isValidated = !! (emailValue === null || !isEmail(emailValue))
    updateAreaInput(isValidated, email, 'Veuillez entrer votre addresse email')
    errors.push(!isValidated)
    return isValidated
}

const checkOccuranceForm = () => {
    const quantityTournoisValue = quantityTournois.value.trim();
    const isNumber = (quantityTournoisValue) => {
        // source: https://stackoverflow.com/questions/1303646/check-whether-variable-is-number-or-string-in-javascript
        return /^-?[\d.]+(?:e-?\d+)?$/.test(quantityTournoisValue); 
    }
    const isValidated = !! (quantityTournoisValue === "" || !isNumber(quantityTournoisValue) || quantityTournoisValue > 100 || quantityTournoisValue < 0)
    updateAreaInput(isValidated, quantityTournois, 'Veuillez entrer un nombre entre 0 et 100')
    errors.push(!isValidated)
    return isValidated
}

const checkBirthdateForm = () => {
    const birthDateValue = birthDate.value;
    const isValidated = !! (birthDateValue === "");
    updateAreaInput(isValidated, birthDate, 'Veuillez entrer votre date de naissance');
    errors.push(!isValidated)
    return isValidated
}

const checkRadioForm = () => {
    const isValidated = !document.querySelector('input[name="location"]:checked')
    updateAreaInput(isValidated, tournois, 'Veuillez selectionner un tournoi');
    errors.push(!isValidated)
    return isValidated  
}

const checkTerms = () => {
    const isValidated = !terms.checked
    updateAreaInput(isValidated, terms, 'Vous devez vérifier que vous acceptez les termes et conditions.');
    errors.push(!isValidated)
    return isValidated  
}


// functions for handling error message
const updateAreaInput = (isValidated, champ, message) => {
    if(isValidated){
        setErrorFor(champ, message)
    }else {
        setSuccessFor(champ)
    }
}
 
const setErrorFor = (input, message) => {
    const formControl = input.parentElement
    const divError = formControl.querySelector('.mage-error')
    divError.style.display = "block"
    divError.innerText = message
}

function setSuccessFor(input){
    const formControl = input.parentElement
    const divError = formControl.querySelector('.mage-error')
    // hide the div error if no error
    divError.style.display = "none"
}

