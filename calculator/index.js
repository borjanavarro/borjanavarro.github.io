const buttons = document.querySelectorAll('.button');
const output = document.getElementById('output');
const UNDO = "<i class=\"fa fa-repeat fa-flip-horizontal\" aria-hidden=\"true\"></i>";
let ops = [];
let newNumber = true;
let isResult = false;
let initialBlock = true;
const allowedOps = ["÷", "x", "-", "+", "="];

function inputFn(button)
{
    let currentOutput = output.innerHTML;
    const buttonValue = button.innerHTML;
    const displayLength = displayLengthFn(currentOutput);

    switch (buttonValue)
    {
        case "AC":
            output.innerHTML = "";
            initialBlock = true;
            ops = [];
            break;

        case UNDO:
            if ( !isResult )
            {
                if ( displayLength > "1" )
                {
                    output.innerHTML = output.innerHTML.substring(0, output.innerHTML.length - 1);
                }
                else
                {
                    output.innerHTML = "";
                }
            }
            break;

        case "÷":
        case "x":
        case "-":
        case "+":
            if ( !initialBlock )
            {
                opsFn(currentOutput, buttonValue);
            }
            break;

        case "=":
            if ( !initialBlock && ops.length === 2 )
            {
                let result = makeOp(currentOutput);
                newNumber = true;
                output.innerHTML = result;
                ops = [];
            }
            break;

        case ",":
            if ( !areCommas(currentOutput) )
            {
                addCharFn(currentOutput, displayLength, buttonValue);

                if ( output.innerHTML[0] === "," )
                {
                    output.innerHTML = "0,";
                }
            }
            break;

        default:
            if ( displayLength < 8 )
            {
                addCharFn(currentOutput, displayLength, buttonValue);
            }
        break;
    }
}

function displayLengthFn(display)
{
    let counter = 0;

    for (let i = 0; i < display.length; i++)
    {
        if ( display[i] !== "," ) {
            counter++;
        }
    }

    return counter;
}

function addCharFn(currentOutput, displayLength, buttonValue)
{
    if ( newNumber )
    {
        currentOutput = "";
        newNumber = false;
    }
    
    output.innerHTML = currentOutput + buttonValue;
    isResult = false;
    initialBlock = false;
}

function areCommas(currentOutput)
{
    for (let i = 0; i < currentOutput.length; i++)
    {
        if ( currentOutput[i] === "," ) return true;
    }

    return false;
}

function opsFn(currentOutput, op)
{
    newNumber = true;

    if ( ops.length >= 2 )
    {
        let result = makeOp(currentOutput);
        ops = [result.toLocaleString(), op];
        output.innerHTML = result;
    }
    else
    {
        ops.push(currentOutput);
        ops.push(op);
    }
}

function makeOp(currentOutput)
{
    const number1 = parseFloat(ops[0].replace(",", "."));
    const number2 = parseFloat(currentOutput.replace(",", "."));
    const op = ops[1];
    let result;

    isResult = true;

    switch (op)
    {
        case "÷":
            if ( number2 === 0 )
            {
                result = handleError();
            } 
            else
            {
                result = number1 / number2;

                let decimals = 8 - Math.round(result).toString().length;
                result = result.toFixed(decimals).toString();
                
                result = result.replace(/[.,]0000000$/, "")
                    .replace(/[.,]000000$/, "")
                    .replace(/[.,]00000$/, "")
                    .replace(/[.,]0000$/, "")
                    .replace(/[.,]000$/, "")
                    .replace(/[.,]00$/, "")
                    .replace(/[.,]0$/, "")
                    .replace(/([.,][0-9])000000$/, "$1")
                    .replace(/([.,][0-9][0-9])00000$/, "$1")
                    .replace(/([.,][0-9][0-9][0-9])0000$/, "$1")
                    .replace(/([.,][0-9][0-9][0-9][0-9])000$/, "$1")
                    .replace(/([.,][0-9][0-9][0-9][0-9][0-9])00$/, "$1")
                    .replace(/([.,][0-9][0-9][0-9][0-9][0-9][0-9])0$/, "$1");
            }
            break;

        case "x":
            result = number1 * number2;
            break;

        case "-":
            result = number1 - number2;
            break;

        case "+":
            result = number1 + number2;
            break;
    }

    result = result.toString().replace(".", ",");

    if ( !areCommas(result) && displayLengthFn (result) > 8 )
    {
        result = handleError();
    }

    return result;
}

function handleError()
{
    ops = [];
    newNumber = true;
    initialBlock = true;

    return "E";
}

buttons.forEach(element => {
    element.addEventListener('click', function() {
        inputFn(this);
    });
});