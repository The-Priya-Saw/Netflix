const order = JSON.parse(sessionStorage.getItem("order"));
console.log(order);

// Destructing Syntax for object
// const id = order.id; const amount = order.amount; const plan = order.plan;
const {id, amount, plan} = order;  

var options = {
    "key": "rzp_test_FMZYTOHk7LXFqe", // Enter the Key ID generated from the Dashboard
    "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": `Netflix ${plan} plan`,
    "description": "Test Transaction",
    "image": "https://w7.pngwing.com/pngs/746/404/png-transparent-netflix-thumbnail.png",
    "order_id": id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "/api/verifyPayment",
    "prefill": {
        "name": "",
        "email": "",
        "contact": "9999999999"
    },
    "theme": {
        "color": "#cb000a"
    }
};

const emailInput = document.querySelector(".paymentEmailId");
const customerFirstName = document.querySelector(".firstName");
const customerLastName = document.querySelector(".lastName");
const payButton = document.getElementById("rzp-button1");


payButton.addEventListener("click", (event) => {
    const customerEmailId = emailInput.value;
    const customerFullName = customerFirstName.value + " " + customerLastName.value;
    console.log(customerEmailId, customerFullName);
    
    options.prefill.name = customerFullName;
    options.prefill.email = customerEmailId;
    console.log(options);
    var rzp1 = new Razorpay(options);
    rzp1.open();
    console.log("clicked on pay button");
    event.preventDefault();
})


console.log(emailInput, customerFirstName, customerLastName);







