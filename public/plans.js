const allPlanSpan = document.getElementsByClassName("plan"); 
const nextButton = document.querySelector(".nextButton");
let planObject = {
    amount: 149,
    plan: "Mobile"
}

async function order(orderAmount, planName){
    const response = await fetch("/api/orders",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({amount: orderAmount, plan: planName})
    });

    const order = await response.json();
    sessionStorage.setItem("order",JSON.stringify(order));
    console.log(order);
    location.href = "/payment";
}

console.log(nextButton);


nextButton.addEventListener("click", (event) => {
 console.log("working")
    order(planObject.amount, planObject.plan)
})

// get elements with the classname plan
Array.from(allPlanSpan).forEach(element => {                      // converting fetched elements in form of array since it is not in arr
    element.addEventListener("click", (event) => {

        //adding click event on all element in arr
        const selectPlanSpan = document.querySelector(".selected");
        selectPlanSpan.classList.remove("selected");
        
        
        event.target.classList.add("selected");
        const planName = event.target.classList[0];
        const orderAmount = parseInt(document.querySelector(`table .${planName}`).innerText);
        console.log(orderAmount);
        planObject.amount = orderAmount;
        planObject.plan = planName;


    });

   
   
});