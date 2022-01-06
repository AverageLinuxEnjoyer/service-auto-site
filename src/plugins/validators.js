export const validateInputField = (value) => {
    if (value == null || value == undefined || value == "") {
        return false;
    } else return true;
};
