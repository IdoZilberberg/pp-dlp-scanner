// Luhn algo for verifying credit card numbers, copied from https://gist.github.com/DiegoSalazar/4075533
// takes the form field value and returns true on valid number

export const isValidCreditCard = (creditCard: string) => {
    // accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(creditCard)) return false;

    // The Luhn Algorithm. It's so pretty.
    let nCheck = 0;
    let nDigit = 0;
    let bEven = false;
    creditCard = creditCard.replace(/\D/g, "");

    for (let n = creditCard.length - 1; n >= 0; n--) {
        const cDigit = creditCard.charAt(n);
        nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }

    return (nCheck % 10) === 0;
};

