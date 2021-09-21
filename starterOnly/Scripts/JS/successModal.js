function createMessage()
{
  /* --- Création de la section --- */
    
    //Création de l'élément
    const newSection = document.createElement("section");

    //Ajout d'une class erreur
    newSection.classList.add("successModal");

    //Ajout d'un ID
    newSection.setAttribute("id","successModal");

    //Récupération du main
    var main = document.getElementsByTagName('main');

    //Ajout de l'élément dans le DOM
    main[0].appendChild(newSection);

  /* --- Ajout d'une div --- */
    
    //Récupération de la section
    var section = document.getElementById("successModal");

    //Création de la div
    newDiv = document.createElement("div");

    //Ajout d'une class erreur
    newDiv.classList.add("successModal__content");

    //Ajout de la div dans la section
    section.appendChild(newDiv);

  /* --- Ajout du span --- */

    newDiv.innerHTML = "<span id=\"closeSuccessModalBtn\" class=\"close successModal__content__close\"></span><h1 class=\"successModal__content__title\">Succès !</h1><p class=\"successModal__content__message\">Votre inscription a été validé.</p>";   

    addTheEvent();
  }

  function addTheEvent()
  {
    const closeSuccessModalBtn = document.getElementById("closeSuccessModalBtn");
    closeSuccessModalBtn.addEventListener("click", closeSuccessModal);
  }

/* --- Success message close --- */
function closeSuccessModal() {
  const SuccessModal = document.getElementById("successModal");
  SuccessModal.style.display = "none";
}