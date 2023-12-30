// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

const nocompany = [7, 8, 4, 3, 6, 3, 5, 6, 7, 8, 3, 2]

// Test samples pulled from web
const input = 4539677908016808;

const generate1 = [3,7,1,4,4,9,6,3,5,3,9,8,4,3,1];
const generate2 = [3,7,6,6,8,0,8,1,6,3,7,6,9,6,1];
const generate3 = [4,0,0,5,5,1,9,2,0,0,0,7,0,0,0,4];
const generate4 = [6,3,0,4,0,0,0,0,0,0,0,0,0,0,0,0];
const generate5 = [4,0,1,2,8,8,8,8,8,8,8,8,1,8,8,1];
const generateBatch = [generate1, generate2, generate3, generate4, generate5];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5, nocompany]


// Add your functions below:

//Function to validate a single card in an array
const validateCred = arr => {
    const checkedArr = [];
    let checkedNum;
    let parity = -1;

    for (let i = arr.length - 1; i >= 0; i--) { 
        parity++;
        if (parity % 2 === 1) {
            checkedNum = arr[i] * 2;
            if (checkedNum > 9) {
                checkedNum -= 9;
            }
        } else checkedNum = arr[i];
        checkedArr.push(checkedNum);
    }
    const sum = checkedArr.reduce((accu, currentV) => accu + currentV);

    if (sum % 10 === 0) {
        return true;
    } else {
        return false;
    }
}

//console.log(validateCred(invalid1));

//Function to take input number and validate card
//-Pulls from validateCred
const stringToCreditValidation = str => {
    const stringToArray = str.toString().split('');
    const newCard = stringToArray.map(num => Number(num));
    return validateCred(newCard);
}

//console.log(stringToCreditValidation(input));

//Function to validate multiple cards in an array
//-Pulls from validateCred function
const findInvalidCards = arr => {
    const invalidCard = [];
    let cardIteration;

    for (let i = 0; i < arr.length; i++) {
        cardIteration = validateCred(arr[i]);
        if (!cardIteration) {
            invalidCard.push(arr[i]);
        }
    }
    return invalidCard;
}
//console.log(findInvalidCards(generateBatch))

//Function to find companies who issued invalid credid card numbers
//-Pulls from findInvalidCards>validateCreds
const idInvalidCardCompanies = arr => {
    let company = [];
    const invalidCard = findInvalidCards(arr);

    for (let i = 0; i < invalidCard.length; i++) {
        switch (invalidCard[i][0]) {
            case 3:
                company.push('Amex \(American Express\)');
                break;
            case 4:
                company.push('Visa');
                break;
            case 5: 
                company.push('MasterCard');
                break;
            case 6:
                company.push('Discover');
                break;
            default:
                company.push('Company not found');
                break;
        }
    }
    const uniqueCompanies = [...new Set(company)];
    return uniqueCompanies;
}

//console.log(idInvalidCardCompanies(batch));
//console.log(idInvalidCardCompanies(generateBatch));

const correctCard = arr => {
        let updatedCard = arr;
        const lastIndex = arr[arr.length -1];
        const checkedArr = [];
        let checkedNum;
        let parity = -1;

        for (let i = arr.length - 1; i >= 0; i--) { 
            parity++;
            if (parity % 2 === 1) {
                checkedNum = arr[i] * 2;
                if (checkedNum > 9) {
                    checkedNum -= 9;
                }
            } else checkedNum = arr[i];
            checkedArr.push(checkedNum);
        }

        const sum = checkedArr.reduce((accu, currentV) => accu + currentV);
        const remainder = sum % 10;

        if (lastIndex - remainder < 0) {
            updatedCard[lastIndex] += 10 - remainder;
        } else {
            updatedCard[lastIndex] -= remainder;
        }

        return updatedCard;
}
//Tests an invalid card where final index of array is < remainder
/*
const correctInvalid3 = correctCard(invalid3);
console.log(correctInvalid3);
console.log(validateCred(correctInvalid3));
//Tests a valid card w/ correctCard
console.log(validateCred(correctCard(valid1)));
//Tests an invalid card where final index of array is > remainder
console.log(validateCred(correctCard(invalid2)));
*/