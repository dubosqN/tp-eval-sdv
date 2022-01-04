// here you put all the js you want.

function FizzBuzz(nombre){
    for(var i = 1; i < nombre; i++){
        if(i%15 == 0){
            console.log("FizzBuzz");
        }
        else if(i%5 == 0){
            console.log("Buzz");
        }
        else if(i%3 == 0){
            console.log("Fizz");
        }
    }
}

FizzBuzz(100);