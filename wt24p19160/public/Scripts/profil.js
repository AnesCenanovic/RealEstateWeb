
// Function to get the value of an input field
function getInputValue(selector) {
  const element = document.querySelector(selector);
  if (element) {
    return element.value;
  } else {
    return null;
  }
}

// Function to update user data
function updateUserData() {
  // Get input field values
  const ime = getInputValue('input[placeholder="Unesite ime"]'); 
  const prezime = getInputValue('input[placeholder="Unesite prezime"]'); 
  const username = getInputValue('input[placeholder="Unesite username"]'); 
  const password = getInputValue('input[type="password"]'); 

  // Prepare user data object
  const noviPodaci = {
    ime,
    prezime,
    username,
    password,
  };

  // Call PoziviAjax.impl_putKorisnik to update data
  PoziviAjax.putKorisnik(noviPodaci, function(err, response) {
    if (err) {
      console.error('Error updating user data:', err);
      // Handle error, e.g., display an error message to the user
    } else {
      console.log('User data updated successfully:', response);
      // Handle successful update, e.g., display a confirmation message
    }
  });
}

const buttonContainer = document.querySelector('.user-profil div:last-child'); 
const submitButton = document.createElement('button');
submitButton.textContent = "Ažuriraj Profil";
submitButton.addEventListener('click', updateUserData);
buttonContainer.appendChild(submitButton); 