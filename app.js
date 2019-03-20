// LISTEN FOR SUBMIT BUTTON
document.getElementById('loan-form').addEventListener('submit',function(e){
  if(document.querySelector('.alert') != null){
    clearSuccess();
    // const alert = document.querySelector('.alert');
    // alert.style.display = 'none';
    // console.log(alert);
  }
  
  // HIDE RESULTS DIV
  document.getElementById('results').style.display ='none';
  // DISPLAY LOADER 
  document.getElementById('loading').style.display ='block';

  const timeout = 2000;
  setTimeout(calculateResults, timeout);
  
  e.preventDefault();
});

// CALCULATE RESULTS FUNCTION
function calculateResults(){
  
  // console.log('calculating'+e);
  // GET UI INPUT VARIABLES
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment= document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;
  
  // COMPUTE MONTHLY PAYMENTS
  const x = Math.pow(1+calculatedInterest,calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    // console.log(`${totalPayment.value} ${totalInterest.value}`);
    document.getElementById('results').style.display ='block';
    document.getElementById('loading').style.display ='none';
    showSuccess('Calculation Complete');
  
  }else{
    showError('Please Check your numbers');
    // console.log('Please check your numbers');
    document.getElementById('loading').style.display ='none';
  }
  // e.preventDefault(); // PREVENT DEFAULT FORM ACTION
}
function showSuccess(success){
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  
  // CREATE THE ALERT DIV ELEMENT
  const successDiv = document.createElement('div');
  successDiv.className = 'alert alert-success';
  successDiv.appendChild(document.createTextNode(success));
  
  // INSERT THE ERROR DIV INTO THE DOM
  card.insertBefore(successDiv, heading);

  // CLEAR ERROR MESSAGE AFTER 3 SECONDS
  
}
function showError(error){
  
  // GET THE CARD AND HEADER ELEMENTS
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  
  // CREATE THE ALERT DIV ELEMENT
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));
  
  // INSERT THE ERROR DIV INTO THE DOM
  card.insertBefore(errorDiv, heading);

  // CLEAR ERROR MESSAGE AFTER 3 SECONDS
  setTimeout(clearError, 2000);
}

function clearError(){
  document.querySelector('.alert').remove();
}
function clearSuccess(){
  document.querySelector('.alert').remove();
}