/*
 Checks if a username has a valid format
*/
const isValidUsername = (username) => {
    if (username.length > 50) {
        return false;
    }
    else if (username.length < 10) {
        return false;
    }

    const expr = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return expr.test(username);
};

/*
 Checks if a username has a valid format
*/
const isValidName = (name) => {
    if (name.length > 50) {
        return false;
    }
    else if (name.length < 2) {
        return false;
    }

    const expr = /^[a-zà-ÿ]([a-zà-ÿ- ]+)[a-zà-ÿ]$/i;
    return expr.test(name);
};

/*
 Checks if a password has a valid format
*/
const isValidPassword = (password) => {
    if (password.length >= 6) {
        return true;
    }

    return false;
};

/*
    Gradually shows specified element
*/
const fadeIn = (element) => {
    const style = element.style;
    
    style.opacity = style.opacity ? style.opacity : 0;

    if ((style.display && style.display === 'none') || !style.display) {
        style.display = 'block';
    }

    const fadeEffect = setInterval( () => {
        if (style.opacity < 1) {
            style.opacity = parseFloat(style.opacity) + 0.2;
        }
        else {
            clearInterval(fadeEffect);
        }
    }, 60);
};

/*
    Gradually hides specified element
*/
const fadeOut = (element) => {
    const style = element.style;
    
    style.opacity = style.opacity ? style.opacity : 1;
    
    if ((style.display && style.display === 'none') || !style.display) {
        style.display = 'block';
    }

    const fadeEffect = setInterval( () => {
        if (style.opacity > 0) {
            style.opacity = parseFloat(style.opacity) - 0.2;        }
        else {
            style.display = 'none';
            clearInterval(fadeEffect);
        }
    }, 60);
};

/*
    Shows an error message for three seconds before fading out
*/
const showErrorMessage = (errorMsg) => {
    fadeIn(errorMsg);
};

/*
    Reset all error messages' display, opacity and innerHTML
*/
const resetErrorMessages = (errorMsgs) => {
    errorMsgs.forEach( (msg) => {
        msg.innerHTML = '';
        msg.style.display = 'none';
        msg.style.opacity = 0;
    });
};

/*
    Convert a number to an abbreviated formatted string
    Example: 1000 to 1 k, 1000000 to 1 M

    Returns original number if num < 1000
            null if num is null
            abbreviated string if num > 1000
 */
const numToAbbrString = (num) => {
    if (!num & num !== 0 || !(Number.isInteger(num))) {
        return null;
    }

    if (num < 1000) {
        return num;
    }

    const len = num.toString().length;
    let abbrString;

    switch(true) {
        case (len >=4 && len <= 6):
            abbrString = Intl.NumberFormat()
                .format((num / 1000).toFixed(2)) + " k";
            break;
        case (len >= 7 && len <= 9):
            abbrString = Intl.NumberFormat()
                .format((num / 1000000).toFixed(2)) + " M";
            break;
        default:
    }

    return abbrString;
};

const getCheckboxesValues = (checkboxes) => {
    let values = [];

    checkboxes.forEach( (checkbox) => {
        values.push(checkbox.value);
    })

    return values;
};

const isValidAddress = (address) => {
    if (address.length < 8 || address.length > 50) {
        return false;
    }

    const expr = /^[a-zà-ÿ0-9]{0,3}[a-zà-ÿ-' ,]+[a-zà-ÿ]$/i
    return expr.test(address);
};

const isValidCity = (city) => {
    if (city.length > 45) {
        return false;
    }

    const expr = /^[a-zà-ÿ]($|[a-zà-ÿ])$|^[a-zà-ÿ][a-zà-ÿ-' ]+[a-zà-ÿ]$/i

    return expr.test(city);
};

const isValidPostcode = (postcode) => {
    const expr = /^[0-9]{5}$/;

    return expr.test(postcode);
};

export {
    isValidUsername,
    isValidName,
    isValidPassword,
    fadeIn,
    fadeOut,
    showErrorMessage,
    resetErrorMessages,
    numToAbbrString,
    getCheckboxesValues,
    isValidAddress,
    isValidCity,
    isValidPostcode,
};
