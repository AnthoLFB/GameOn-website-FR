/* ----- Classes ----- */

// Constraint class with basic elements
class Constraint
{
    constructor(domItem, message, idInput)
    {
        this.domItem = domItem;
        this.message = message
        this.idInput = idInput;
    }
}

// Class to check if a field is empty
class notBlank extends Constraint
{
    constructor(domItem, message, idInput)
    {
        super(domItem, message, idInput);
    }

    isValid()
    {
        if(this.domItem.value.trim() == "")
        {
            this.domItem.style.border = "Solid 3px red";

           //Récupère le parent de l'input
           const parentNode = document.getElementById(this.idInput).parentNode;

           //Création de l'élément
           const newElt = document.createElement("div");

           //Ajout d'une class erreur
           newElt.classList.add("errorMessage");

           //Ajout de l'élément dans le DOM
           parentNode.appendChild(newElt); 

           //Ajout du message
           newElt.innerHTML = "<p>"+ this.message +"</p>";

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
    constructor(domItem, message, minLength, idInput)
    {
        super(domItem, message, idInput);
        this.minLength = minLength;
    }
    
    isValid()
    {
        if(this.domItem.value.trim().length < this.minLength)
        {
            this.domItem.style.border = "Solid 3px red";

            //Récupère le parent de l'input
           const parentNode = document.getElementById(this.idInput).parentNode;

           //Création de l'élément
           const newElt = document.createElement("div");

           //Ajout d'une class erreur
           newElt.classList.add("errorMessage");

           //Ajout de l'élément dans le DOM
           parentNode.appendChild(newElt); 

           //Ajout du message
           newElt.innerHTML = "<p>"+ this.message +"</p>";

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
    constructor(domItem, message, idInput)
    {
        super(domItem, message, idInput);
    }

    isValid()
    {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(regex.test(this.domItem.value))
        {
            return true;
        }
        else
        {
            this.domItem.style.border = "Solid 3px red";
            
            //Récupère le parent de l'input
            const parentNode = document.getElementById(this.idInput).parentNode;

            //Création de l'élément
            const newElt = document.createElement("div");

            //Ajout d'une class erreur
            newElt.classList.add("errorMessage");

            //Ajout de l'élément dans le DOM
            parentNode.appendChild(newElt); 

            //Ajout du message
            newElt.innerHTML = "<p>"+ this.message +"</p>";

            return false;
        }
    }
}

class CheckingDate extends Constraint
{
    constructor(domItem, message, idInput)
    {
        super(domItem, message, idInput);
    }

    isValid()
    {
        const dateformat = /^\d{4}[\/\-](0[1-9]|1[012])[\/\-](0[1-9]|[12][0-9]|3[01])$/;

        // regex match
        if(this.domItem.value.match(dateformat))
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
                    this.domItem.style.border = "Solid 3px red";

                    //Récupère le parent de l'input
                    const parentNode = document.getElementById(this.idInput).parentNode;

                    //Création de l'élément
                    const newElt = document.createElement("div");

                    //Ajout d'une class erreur
                    newElt.classList.add("errorMessage");

                    //Ajout de l'élément dans le DOM
                    parentNode.appendChild(newElt); 

                    //Ajout du message
                    newElt.innerHTML = "<p>"+ this.message +"</p>";

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
                    this.domItem.style.border = "Solid 3px red";

                    //Récupère le parent de l'input
                    const parentNode = document.getElementById(this.idInput).parentNode;

                    //Création de l'élément
                    const newElt = document.createElement("div");

                    //Ajout d'une class erreur
                    newElt.classList.add("errorMessage");

                    //Ajout de l'élément dans le DOM
                    parentNode.appendChild(newElt); 

                    //Ajout du message
                    newElt.innerHTML = "<p>"+ this.message +"</p>";

                    return false;
                }
            
                if((leapYear==true) && (day>29))
                {
                    this.domItem.style.border = "Solid 3px red";

                    //Récupère le parent de l'input
                    const parentNode = document.getElementById(this.idInput).parentNode;

                    //Création de l'élément
                    const newElt = document.createElement("div");

                    //Ajout d'une class erreur
                    newElt.classList.add("errorMessage");

                    //Ajout de l'élément dans le DOM
                    parentNode.appendChild(newElt); 

                    //Ajout du message
                    newElt.innerHTML = "<p>"+ this.message +"</p>";

                    return false;
                }
            }

            // The date must not be greater than the date the form was sent
            var dayOfSending = new Date();
            var parsedayOfSending = Date.parse(dayOfSending);
            var parseBirthDate = Date.parse(this.domItem);

            if(parseBirthDate > parsedayOfSending)
            {
                this.domItem.style.border = "Solid 3px red";

                //Récupère le parent de l'input
                const parentNode = document.getElementById(this.idInput).parentNode;

                //Création de l'élément
                const newElt = document.createElement("div");

                //Ajout d'une class erreur
                newElt.classList.add("errorMessage");

                //Ajout de l'élément dans le DOM
                parentNode.appendChild(newElt); 

                //Ajout du message
                newElt.innerHTML = "<p>"+ this.message +"</p>";

                return false;
            }
        }
        else
        {
            this.domItem.style.border = "Solid 3px red";

            //Récupère le parent de l'input
            const parentNode = document.getElementById(this.idInput).parentNode;

            //Création de l'élément
            const newElt = document.createElement("div");

            //Ajout d'une class erreur
            newElt.classList.add("errorMessage");

            //Ajout de l'élément dans le DOM
            parentNode.appendChild(newElt); 

            //Ajout du message
            newElt.innerHTML = "<p>"+ this.message +"</p>";

            return false;
        }
    }
}

// Class to check if the data input are numeric.
class CheckingNumericValue extends Constraint
{
    constructor(domItem, message, idInput)
    {
        super(domItem, message, idInput);
    }

    isValid()
    {
        if (isNaN(this.domItem.value))
        {
            this.domItem.style.border = "Solid 3px red";

            //Récupère le parent de l'input
            const parentNode = document.getElementById(this.idInput).parentNode;

            //Création de l'élément
            const newElt = document.createElement("div");

            //Ajout d'une class erreur
            newElt.classList.add("errorMessage");

            //Ajout de l'élément dans le DOM
            parentNode.appendChild(newElt); 

            //Ajout du message
            newElt.innerHTML = "<p>"+ this.message +"</p>";

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
    constructor(domItem, message, idInput)
    {
        super(domItem, message, idInput);
    }

    isValid()
    {
        if(this.domItem == null)
        {
            //Récupère le parent de l'input
            const parentNode = document.getElementById(this.idInput).parentNode;

            parentNode.style.border = "Solid 3px red";

            //Création de l'élément
            const newElt = document.createElement("div");

            //Ajout d'une class erreur
            newElt.classList.add("errorMessage");

            //Ajout de l'élément dans le DOM
            parentNode.appendChild(newElt); 

            //Ajout du message
            newElt.innerHTML = "<p>"+ this.message +"</p>";

            return false;
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
    constructor(domItem, message, idInput)
    {
        super(domItem, message, idInput);
    }

    IsCheckedAndRequired()
    {
        if(this.domItem.checked == false)
        {
            //Récupère le parent de l'input
            const parentNode = document.getElementById(this.idInput).parentNode;

            //Création de l'élément
            const newElt = document.createElement("div");

            //Ajout d'une class erreur
            newElt.classList.add("errorMessage");

            //Ajout de l'élément dans le DOM
            parentNode.appendChild(newElt); 

            //Ajout du message
            newElt.innerHTML = "<p>"+ this.message +"</p>";

            return false;
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
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email")
    const birthDate = document.getElementById("birthDate");
    const numberOfTournaments = document.getElementById("numberOfTournaments");
    const tournamentLocations =  document.querySelector('input[name="location"]:checked');
    const termsOfUse = document.getElementById("termsOfUse").checked;
    const beNotified = document.getElementById("beNotified").checked;

    
    // Tests of the different elements of the DOM

    //prénom
    const firsNameBlankTest = new notBlank(firstName, "Le champ prénom ne doit pas être vide !", "firstName");
    firsNameBlankTest.isValid();

    const firsNameLengthTest = new CheckLength(firstName, "Veuillez entrer 2 caractères ou plus pour le champ prénom.", 2, "firstName");
    firsNameLengthTest.isValid();

    //Nom de famille
    const lastNameBlankTest = new notBlank(lastName, "Le champ nom ne doit pas être vide !", "lastName");
    lastNameBlankTest.isValid();

    const lastNameLengthTest = new CheckLength(lastName, "Veuillez entrer 2 caractères ou plus pour le champ nom.", 2, "lastName");
    lastNameLengthTest.isValid();

    //Email
    const emailValidityTest = new EmailVerification(email, "L'adresse e-mail n'est pas valide !", "email");
    emailValidityTest.isValid();

    //Date
    const birthDateTest = new CheckingDate(birthDate, "La date de naissance n'est pas valide !", "birthDate");
    birthDateTest.isValid();

    //Nombre de tournois
    const numberOfTournamentsTest = new CheckingNumericValue(numberOfTournaments, "La valeur saisie n'est pas une valeur numérique !", "numberOfTournaments");
    numberOfTournamentsTest.isValid();

    //Localisation des tournois
    const tournamentLocationsTest = new CheckingRadioBtn(tournamentLocations, "Veuillez renseigner une ville s'il vous plait !", "propositions");
    tournamentLocationsTest.isValid();

    //Conditions générales
    const termsOfUseTest = new CheckingCheckbox(termsOfUse, "Vous devez accepter les conditions d'utilisation avant de nous transmettre votre inscription.", "termsOfUse");
    termsOfUseTest.IsCheckedAndRequired();

    //Notifications
    const beNotifiedTest = new CheckingCheckbox(beNotified, "Vous ne souhaitez pas être prévenu des prochains évènements");
    beNotifiedTest.IsCheckedButNotRequired();

    /*alert(firstName+" "+lastName+" "+email+" "+birthDate+" "+numberOfTournaments+" "+termsOfUse+" "+beNotified+" "+tournamentLocations);*/
}

