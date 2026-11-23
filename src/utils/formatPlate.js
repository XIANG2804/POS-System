function formatPlate(plate) {
    const regex = /^([A-Z]+)([0-9]+)([A-Z]?)$/;
    const cleanedPlate = plate.replace(/\s+/g, "")
    const result = cleanedPlate.match(regex);


    if (result) {
        if (result[3]) {
            return result[1] + " " + result[2] + " " + result[3];
        } else {
            return result[1] + " " + result[2];
        }
    }

    return plate;
}

export default formatPlate;