const encryptButton = document.getElementById("encrypt-text");
const decryptButton = document.getElementById("decrypt-text");

const copyText = document.getElementById("copy-text");

const aside = document.querySelector("aside");
const emptyStateAside = document.querySelector(".empty-state-container");
const withContentAside = document.querySelector(".with-content-container");

const encryptedText = document.querySelector("#encrypted-text");

const textarea = document.querySelector('textarea');

const errorMessage = document.querySelector('#error-message');
const copiedTextMessage = document.querySelector('#copied-text-message');

// function to encrypt text
const handleEncryptButtonClick = () => {
  let text = textarea.value;
  const verifiedText = verifyText(text);

  if (verifiedText.length < 1) {
    return
  }

  let output = '';

  for (const char of verifiedText) {
    switch (char) {
      case 'a':
        output += 'ai';
        break;
      case 'e':
        output += 'enter';
        break;
      case 'i':
        output += 'imes';
        break;
      case 'o':
        output += 'ober';
        break;
      case 'u':
        output += 'ufat';
        break;
      default:
        output += char;
        break;
    }
  }

  showOutput(output)
  return
}

// function to decrypt text
const handleDecryptButtonClick = () => {
  let text = textarea.value;

  const verifiedText = verifyText(text);

  if (verifiedText.length < 1) {
    return
  }

  let output = text;

  output = output.replace(/ai/mg, 'a');
  output = output.replace(/enter/mg, 'e');
  output = output.replace(/imes/mg, 'i');
  output = output.replace(/ober/mg, 'o');
  output = output.replace(/ufat/mg, 'u');

  showOutput(output)
  return
};

// functino to copy text to clipboard
const handleCopyTextClick = async () => {
  await navigator.clipboard.writeText(encryptedText.textContent);
  copiedTextMessage.innerHTML = "Texto copiado al portapapeles";

  // remove text after 3 seconds
  setTimeout(() => {
    copiedTextMessage.innerHTML = "";
  }, 3000);
};

// function to show the encrypted text in the aside
const showOutput = (text) => {
  withContentAside.style.display = "flex";
  emptyStateAside.style.display = "none";
  encryptedText.textContent = text;
  clearTextarea()
}

// function to hide the encrypted text in the aside and show the empty state
const hideOutput = () => {
  withContentAside.style.display = "none";
  emptyStateAside.style.display = "grid";
  clearTextarea()
}

// function to clear the textarea
const clearTextarea = () => {
  textarea.value = "";
}

// function to capture everytime the user writes inside the textarea
const handleTextareaInput = (e) => {
  textarea.value = e.target.value
};

// function to verify and normilze the text
const verifyText = (text) => {
  // normalized text to prevent using accents or special characters. NOTE: exclamation mark is not included in the list of special characters, because the
  // special message to descypt included it. To exclude exclamation mark, use this -> text.normalize("NFD").replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]>\<:"`;,\u0300-\u036f']/g, "")
  let verifiedText = text.normalize("NFD").replace(/[$\.¿\?~\¡@#%^&*()_|}\{[\]>\<:"`;,\u0300-\u036f']/g, "");
  
  if (text.length < 1) {
    errorMessage.innerHTML = "El texto no puede estar vacio";
    hideOutput()
    return
  }
  
  // checking if text contains special characters or accents
  if (text.length > 0 && text !== verifiedText) {
    errorMessage.innerHTML = "El texto no puede contener caracteres especiales ni acentos";
    hideOutput()
    return
  }
  
  if (text.length > 0 && text === verifiedText) {
    if (verifiedText !== verifiedText.toLowerCase()) {
      errorMessage.innerHTML = "El texto no puede contener mayúsculas";
      hideOutput()
      return
    } else {
      errorMessage.innerHTML = "";
      return verifiedText
    }
  }
}

// adding event listeners to each component
encryptButton.addEventListener("click", handleEncryptButtonClick);
decryptButton.addEventListener("click", handleDecryptButtonClick);
copyText.addEventListener("click", handleCopyTextClick);
textarea.addEventListener("input", handleTextareaInput); 