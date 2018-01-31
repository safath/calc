/**
 * @author Joel Nutt
 * ITEC136-V1WW(FA11) - Franklin U.
 * David Crossmier - Instructor
 * Assigment 8-3 (HW07)
 * 11/06/2011
 * 
*/
function yearsToMonths(yr){
    return (yr*12);
}

function getValues()
{
	//button click gets values from inputs
	var balance = parseFloat(document.getElementById("principal").value);
	var interestRate = 
		parseFloat(document.getElementById("interest").value/100.0);
	var ter = yearsToMonths(parseInt(document.getElementById("terms").value));
       var ter2= parseInt(document.getElementById("terms2").value);
       var terms= ter+ter2;
       
       //try
       var addPayment = parseFloat(document.getElementById("addMonth").value);
       
       
       
	//set the div string
	var div = document.getElementById("Result");
	
	//in case of a re-calc, clear out the div!
	div.innerHTML = "";
	
	//validate inputs - display error if invalid, otherwise, display table
	var balVal = validateInputs(balance);
	var intrVal = validateInputs(interestRate);

	if (balVal && intrVal)
	{
		//Returns div string if inputs are valid
		div.innerHTML += amort(balance, interestRate, terms, addPayment);
	}
	else
	{
		//returns error if inputs are invalid
		div.innerHTML += "Please Check your inputs and retry - invalid values.";
	}
}

/**
 * Amort function:
 * Calculates the necessary elements of the loan using the supplied user input
 * and then displays each months updated amortization schedule on the page
*/
function amort(balance, interestRate, terms,addPayment)
{
    //Calculate the per month interest rate
	var monthlyRate = interestRate/12;
	
	//Calculate the payment
    
   
    
    if (addPayment === 0) {
        
         var payment= ((balance*monthlyRate) * Math.pow((1+monthlyRate),terms))/(Math.pow((1+monthlyRate),terms)-1);    
    
    
     var result = 
            "ifLoan amount: $" + balance.toFixed(2) +  "<br />" + 
        "Interest rate: " + (interestRate*100).toFixed(2) +  "%<br />" +
        "Loan duration: " + terms + "<br />" +
        "Monthly payment: $" + payment.toFixed(2) + "<br />" +
        "Total paid: $" + (payment * terms).toFixed(2) + "<br /><br />";
        
        //add header row for table to return string
	result += "<table border='1'><tr><th>Month #</th><th>Payment</th><th>Balance</th>" + 
        "<th>Interest</th><th>Remaining</th>";
    
    /**
     * Loop that calculates the monthly Loan amortization amounts then adds 
     * them to the return string 
     */
        
    
	for (var count = 0; count < terms; ++count)
	{ 
                
		//in-loop interest amount holder
		var interest = 0;
		
		//in-loop monthly principal amount holder
		var monthlyPrincipal = 0;
		
		//start a new table row on each loop iteration
		result += "<tr align=center>";
		
		//display the month number in col 1 using the loop count variable
		result += "<td>" + (count + 1) + "</td>";
		
                //code for displaying payment
		result += "<td> $" + payment.toFixed(2) + "</td>";
		
		
		//calc the in-loop interest amount and display
		interest = balance * monthlyRate;
		result += "<td> $" + interest.toFixed(2) + "</td>";
		
		//calc the in-loop monthly principal and display
		monthlyPrincipal = payment - interest;
		result += "<td> $" + monthlyPrincipal.toFixed(2) + "</td>";
		
                
                //code for displaying in loop balance
                var remaining = balance-monthlyPrincipal;
		result += "<td> $" + remaining.toFixed(2) + "</td>";
                
		//end the table row on each iteration of the loop	
		result += "</tr>";
		
		//update the balance for each loop iteration
		balance = balance - monthlyPrincipal;		
	}
	
	//Final piece added to return string before returning it - closes the table
    result += "</table>";
} 


else {
    
     var payment= ((balance*monthlyRate) * Math.pow((1+monthlyRate),terms))/(Math.pow((1+monthlyRate),terms)-1);    
     var addPaymentUpdate = payment + addPayment;
    
    

    
     var result = 
            "elseLoan amount: $" + balance.toFixed(2) +  "<br />" + 
        "Interest rate: " + (interestRate*100).toFixed(2) +  "%<br />" +
        "Loan duration: " + terms + "<br />" +
        "Monthly payment: $" + payment.toFixed(2) + "<br />" +
        "Total paid: $" + (payment * terms).toFixed(2) + "<br /><br />"+
        "Total addPayment: $" + (addPaymentUpdate).toFixed(2) + "<br /><br />";
    
    
         
//add header row for table to return string
	result += "<table border='1'><tr><th>Month #</th><th>Payment</th><th>Interest</th>" + 
        "<th>Principal</th><th>Remaining</th>";
    
    /**
     * Loop that calculates the monthly Loan amortization amounts then adds 
     * them to the return string 
     */
        
    var counter=0;
    var counterExtra = 0;
    var interestCounterExtra = 0;
    var interestCounter = 0;
    var balanceNew = balance;
	for (var count = 0; count < terms; ++count)
	{   
            counter= counter+1;
            
            //remaining balance
            var remaining = balance-payment;
            
            var monthlyPrincipalNew = 0;
            
            
            var interestNotExtra = 0;
            
            interestNotExtra = balanceNew * monthlyRate;
            interestCounter= interestCounter+interestNotExtra;
            
            monthlyPrincipalNew = payment - interestNotExtra;
            balanceNew = balanceNew - monthlyPrincipalNew;
            
            
            
            //interest counter
            
            for (var count2=0; remaining >0; ++count2){
                
                counterExtra= counterExtra+1;
                
		//in-loop interest amount holder
		var interest = 0;
		
               
		//in-loop monthly principal amount holder
		var monthlyPrincipal = 0;
		
		//start a new table row on each loop iteration
		result += "<tr align=center>";
		
		//display the month number in col 1 using the loop count variable
		result += "<td>" + (count2 + 1) + "</td>";
		
                //code for displaying payment
		result += "<td> $" + addPaymentUpdate.toFixed(2) + "</td>";
		
		
		//calc the in-loop interest amount and display
		interest = balance * monthlyRate;
		result += "<td> $" + interest.toFixed(2) + "</td>";
		
		//calc the in-loop monthly principal and display
		monthlyPrincipal = payment - interest+addPayment;
		result += "<td> $" + monthlyPrincipal.toFixed(2) + "</td>";
		
                
                //code for displaying in loop balance
                var remaining = balance-monthlyPrincipal;
		result += "<td> $" + remaining.toFixed(2) + "</td>";
                
		//end the table row on each iteration of the loop	
		result += "</tr>";
		
		//update the balance for each loop iteration
		balance = balance - monthlyPrincipal;	
                //total interest for checking
                interestCounterExtra= interestCounterExtra+interest;
                
                
	}
        result += "</table>";
        
        }
	
	//Final piece added to return string before returning it - closes the table
        
        
       var result2 = counter + "<br />";
        result2 += counterExtra + "<br />" ;
        
        result2 += "Pay off earlier by:" + (counter-counterExtra) + "<br />" ;
        result2 += interestCounterExtra.toFixed(2) + "<br />" ;
        result2 += interestCounter.toFixed(2) + "<br />" ;
        
        result2 += "Interest Savings: $" + (interestCounter-interestCounterExtra).toFixed(2) + "<br />" ;
        
        
        result2 += "<table border='1'><tr><th>Month #</th>";
        result2 += "<tr align=center>";
        result2 += "<td>" + counterExtra + "</td>";
        result2 += "</tr>";
        result2 += "</table>";
               
    
}
    
	//begin building the return string for the display of the amort table
   
        
   
	
	//returns the concatenated string to the page
    return [result, result2];
}

function validateInputs(value)
{
	//some code here to validate inputs
	if ((value == null) || (value == ""))
	{
		return false;
	}
	else
	{
		return true;
	}
}
