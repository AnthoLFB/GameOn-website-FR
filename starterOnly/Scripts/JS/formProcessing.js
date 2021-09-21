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

    triggerAnError()
    {
        if(this.domItem instanceof NodeList)
        {

            //Récupère le parent de l'input
            var parentNode = this.domItem[0].parentNode;

            //Applique une border sur cet element
            parentNode.style.border = "Solid 3px red";
            
        }
        else
        {
            this.domItem.style.border = "Solid 3px red";

            //Récupère le parent de l'input
            var parentNode = this.domItem.parentNode;

        }

        var elementExists = parentNode.getElementsByClassName("errorMessage");
        var checkIfErrorMsgExist = document.body.contains(elementExists[0]);

        if(checkIfErrorMsgExist == false)
        {
            //Création de l'élément
            const newElt = document.createElement("div");

            //Ajout d'une class erreur
            newElt.classList.add("errorMessage");

            //Ajout de l'élément dans le DOM
            parentNode.appendChild(newElt); 

            //Ajout du message
            newElt.innerHTML = "<p>"+ this.message +"</p>";   
        } 
    }

    removeErrorMessage()
    {
        if(this.domItem instanceof NodeList)
        {

            //Récupère le parent de l'input
            var parentNode = this.domItem[0].parentNode;

            //Applique une border sur cet element
            parentNode.style.border = "Solid 3px green";
            
        }
        else
        {
            this.domItem.style.border = "Solid 3px green";

            //Récupère le parent de l'input
            var parentNode = this.domItem.parentNode;

        }

        var elementExists = parentNode.getElementsByClassName("errorMessage");
        var checkIfErrorMsgExist = document.body.contains(elementExists[0]);
        
        if(checkIfErrorMsgExist == true)
        {
            const elements = parentNode.getElementsByClassName("errorMessage");
            elements[0].parentNode.removeChild(elements[0]);
        } 
    }

    isValid()
    {
        if(this.validate() == false)
        {
            this.triggerAnError();
            return false;
        }
        else
        {
            this.removeErrorMessage();
            return true;
        }
        
    }
}

// Class to check if a field is empty
class NotBlank extends Constraint
{
    validate()
    {
        if(this.domItem.value.trim() == "")
        {
            return false;
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
    
    validate()
    {
        if(this.domItem.value.trim().length < this.minLength)
        {
            return false;
        }
    }
}

// Class to check if the data entered are e-mail addresses
class EmailVerification extends Constraint
{
    validate()
    {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!regex.test(this.domItem.value))
        {
            return false;
        }
    }
}

class CheckingDate extends Constraint
{
    validate()
    {
        const dateformat = /^\d{4}[\/\-](0[1-9]|1[012])[\/\-](0[1-9]|[12][0-9]|3[01])$/;

        // regex match
        if(this.domItem.value.match(dateformat))
        {
            let todayDate = new Date;

            var userDate = this.domItem.value.split('-');

            var year = parseInt(userDate[0]);

            if(isNaN(Date.parse(this.domItem.value)) || Date.parse(this.domItem.value) > Date.parse(todayDate))
            {
                return false;
            }

            if(year >= (todayDate.getFullYear() - 18))
            {
                this.message = "Vous devez être majeur pour vous inscrire."
                return false;
            }
        }
        else
        {
            return false;
        }
    }
}

// Class to check if the data input are numeric.
class CheckingNumericValue extends Constraint
{
    validate()
    {
        if (isNaN(this.domItem.value) || this.domItem.value == "")
        {
            return false;
        }
    }
}

// Class to manage radio buttons
class CheckingRadioBtn extends Constraint
{
    validate()
    {
        let i;
        let check = false;

        for(i = 0; i < this.domItem.length; i++) 
        {
            if(this.domItem[i].checked) 
            {
              check = true;
            }
        }

        if(check == false)
        {
            return false;
        }
    }
}

// Class to manage checkboxes
class CheckingCheckbox extends Constraint
{
    validate()
    {
        if(this.domItem.checked == false)
        {
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
// Recovery of DOM elements
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email")
const birthDate = document.getElementById("birthDate");
const numberOfTournaments = document.getElementById("numberOfTournaments");
const tournamentLocations =  document.getElementsByName("location");
const termsOfUse = document.getElementById("termsOfUse");

let constraints = [
    new NotBlank(firstName, "Le champ prénom ne doit pas être vide !"),
    new CheckLength(firstName, "Veuillez entrer 2 caractères ou plus pour le champ prénom.", 2),
    new NotBlank(lastName, "Le champ nom ne doit pas être vide !"),
    new CheckLength(lastName, "Veuillez entrer 2 caractères ou plus pour le champ nom.", 2),
    new EmailVerification(email, "L'adresse e-mail n'est pas valide !"),
    new CheckingDate(birthDate, "La date de naissance n'est pas valide !"),
    new CheckingNumericValue(numberOfTournaments, "La valeur saisie n'est pas une valeur numérique !"),
    new CheckingRadioBtn(tournamentLocations, "Veuillez renseigner une ville s'il vous plait !"),
    new CheckingCheckbox(termsOfUse, "Vous devez accepter les conditions d'utilisation avant de nous transmettre votre inscription.")    
];

function validate()
{
    let errorCount = 0;
    constraints.forEach(element => {
        errorCount += element.isValid() ? 0 : 1;
    });

    if(errorCount < 1)
    {
        closeModal();
        createMessage();
    }
};
