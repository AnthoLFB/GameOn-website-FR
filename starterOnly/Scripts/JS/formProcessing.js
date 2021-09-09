/* ----- Classes ----- */

// Constraint class with basic elements
class Constraint
{
    constructor(domItem, message)
    {
        this.domItem = domItem;
        this.message = message
    }
}

// Class to check if a field is empty
class notBlank extends Constraint
{
    constructor(domItem, message)
    {
        super(domItem, message);
    }

    notBlank()
    {
        if(this.domItem.trim() == "")
        {
            console.log(this.message);
            return false;
        }
        else
        {
            return true;
        }
    }
}

// Class allowing to check if the length of the entered strings
class CheckLength extends Constraint
{
    constructor(domItem, message, minLength)
    {
        super(domItem, message);
        this.minLength = minLength;
    }
    
    isLongEnough()
    {
        if(this.domItem.trim().length < this.minLength)
        {
            console.log(this.message);
            return false;
        }
        else
        {
            return true;
        }
    }
}

// Class to check if the data entered are e-mail addresses
class EmailVerification extends Constraint
{
    constructor(domItem, message)
    {
        super(domItem, message);
    }

    isValidEmail()
    {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(regex.test(this.domItem))
        {
            return true;
        }
        else
        {
            console.log(this.message);
            return false;
        }
    }
}

// Class to check if the data input are numeric.
class CheckingNumericValue extends Constraint
{
    constructor(domItem, message)
    {
        super(domItem, message);
    }

    isNumericValue()
    {
        if (isNaN(this.domItem))
        {
            console.log(this.message);
            return false;
        }
        else
        {
            return true;
        }
    }
}

// Class to manage radio buttons
class CheckingRadioBtn extends Constraint
{
    constructor(domItem, message)
    {
        super(domItem, message);
    }

    IsChecked()
    {
        if(this.domItem == null)
        {
            console.log(this.message);
            return false
        }
        else
        {
            return true
        }
    }
}

// Class to manage checkboxes
class CheckingCheckbox extends Constraint
{
    constructor(domItem, message)
    {
        super(domItem, message);
    }

    IsCheckedAndRequired()
    {
        if(this.domItem == false)
        {
            console.log(this.message);
            return false
        }
        else
        {
            return true
        }
    }

    IsCheckedButNotRequired()
    {
        if(this.domItem == false)
        {
            console.log(this.message);
            return true
        }
        else
        {
            return true
        }
    }
}

class CheckingDate extends Constraint
{
    constructor(domItem, message)
    {
        super(domItem, message);
    }

    isDateValid()
    {
        const dateformat = /^\d{4}[\/\-](0[1-9]|1[012])[\/\-](0[1-9]|[12][0-9]|3[01])$/;

        // regex match
        if(this.domItem.match(dateformat))
        {
            // separator test ('/' or '-')
            var caseSlashSplit = this.domItem.split('/');
            var caseDashSplit = this.domItem.split('-');

            caseSlashSplit = caseSlashSplit.length;
            caseDashSplit = caseDashSplit.length;

            // Depending on the separator used, the value is assigned to the variable
            if(caseSlashSplit > 1)
            {
                var userDate = this.domItem.split('/');
            }
            else if(caseDashSplit > 1)
            {
                var userDate = this.domItem.split('-');
            }

            var day = parseInt(userDate[2]);
            var month  = parseInt(userDate[1]);
            var year = parseInt(userDate[0]);
            
            // Creation of a list with the days of each month [not leap years]
            var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
            
            if(month == 1 || month > 2)
            {
                if(day > ListofDays[month - 1])
                {
                    console.log(this.message);
                    return false;
                }
            }
            
            if(month == 2)
            {
                var leapYear = false;
                if((!(year % 4) && year % 100) || !(year % 400)) 
                {
                    leapYear = true;
                }
            
                if((leapYear==false) && (day>=29))
                {
                    console.log(this.message);
                    return false;
                }
            
                if((leapYear==true) && (day>29))
                {
                    console.log(this.message);
                    return false;
                }
            }

            // The date must not be greater than the date the form was sent
            var dayOfSending = new Date();
            var parsedayOfSending = Date.parse(dayOfSending);
            var parseBirthDate = Date.parse(this.domItem);

            if(parseBirthDate > parsedayOfSending)
            {
                console.log(this.message);
                return false;
            }
        }
        else
        {
            console.log(this.message);
            return false;
        }
    }
}

/* ----- Form Restriction ----- */

// Recovery of DOM element
const form = document.getElementById("formTest");

// Add an EventListener when submitting
form.addEventListener("submit", function(event)
{
    // We prevent the execution of the form
    event.preventDefault();
})

/*--- Data processing---*/
function validate()
{
    // Recovery of DOM elements
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const birthDate = document.getElementById("birthDate").value;
    const numberOfTournaments = document.getElementById("numberOfTournaments").value;
    const tournamentLocations =  document.querySelector('input[name="location"]:checked');
    const termsOfUse = document.getElementById("termsOfUse").checked;
    const beNotified = document.getElementById("beNotified").checked;

    // Tests of the different elements of the DOM

    //prénom
    const firsNameBlankTest = new notBlank(firstName, "Le champ prénom ne doit pas être vide !");
    firsNameBlankTest.notBlank();

    const firsNameLengthTest = new CheckLength(firstName, "Veuillez entrer 2 caractères ou plus pour le champ prénom.", 2);
    firsNameLengthTest.isLongEnough();

    //Nom de famille
    const lastNameBlankTest = new notBlank(lastName, "Le champ nom ne doit pas être vide !");
    lastNameBlankTest.notBlank();

    const lastNameLengthTest = new CheckLength(lastName, "Veuillez entrer 2 caractères ou plus pour le champ nom.", 2);
    lastNameLengthTest.isLongEnough();

    //Email
    const emailValidityTest = new EmailVerification(email, "L'adresse e-mail n'est pas valide !");
    emailValidityTest.isValidEmail();

    //Date
    const birthDateTest = new CheckingDate(birthDate, "La date de naissance n'est pas valide !");
    birthDateTest.isDateValid();

    //Nombre de tournois
    const numberOfTournamentsTest = new CheckingNumericValue(numberOfTournaments, "La valeur saisie n'est pas une valeur numérique !");
    numberOfTournamentsTest.isNumericValue();

    //Localisation des tournois
    const tournamentLocationsTest = new CheckingRadioBtn(tournamentLocations, "Veuillez renseigner une ville s'il vous plait !");
    tournamentLocationsTest.IsChecked();

    //Conditions générales
    const termsOfUseTest = new CheckingCheckbox(termsOfUse, "Vous devez accepter les conditions d'utilisation avant de nous transmettre votre inscription.");
    termsOfUseTest.IsCheckedAndRequired();

    //Notifications
    const beNotifiedTest = new CheckingCheckbox(beNotified, "Vous ne souhaitez pas être prévenu des prochains évènements");
    beNotifiedTest.IsCheckedButNotRequired();

    /*alert(firstName+" "+lastName+" "+email+" "+birthDate+" "+numberOfTournaments+" "+termsOfUse+" "+beNotified+" "+tournamentLocations);*/
}

