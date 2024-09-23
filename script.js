function countWords() {
  const userInput = document.getElementById('userInput').value;
  const words = userInput.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;

  document.getElementById('wordCount').textContent = `${wordCount} / 1000 words`;

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = wordCount === 0 || wordCount > 1000;
}

document.getElementById('textForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Gather form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const institute = document.getElementById('institute').value;
  const userInput = document.getElementById('userInput').value;

  // Send form data to Google Sheets via Apps Script Web App
  fetch('https://script.google.com/macros/s/AKfycbxlcAFI6CPbej9pKdvqdkCfMWlmoJGKE6gDzr_XcmMyh_m4Jl_KU5BSfxNr8B6MMd0/exec', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      'name': name,
      'email': email,
      'phone': phone,
      'institute': institute,
      'input': userInput
    })
  })
  .then(response => response.text())
  .then(result => {
    document.getElementById('message').textContent = "Form submitted successfully!";
  })
  .catch(error => console.error('Error:', error));
});
