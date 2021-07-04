//Require ONFIDO package:
const { Onfido, Region } = require("@onfido/api");
require('dotenv/config');
//Configure with your API token and region:
const onfido = new Onfido({
    apiToken: process.env.ONFIDO_API_TOKEN,
    // Supports Region.EU, Region.US and Region.CA
    region: Region.EU
});

//Create an arrow function called "setup" within a function for applicant and Check
setup = async() => {
    try {
        const applicant = await onfido.applicant.create({
            firstName: "Jane",
            lastName: "Doe"
        });
        console.log(applicant)

        const check = await onfido.check.create({
            applicantId: applicant.id,
            reportNames: ["identity_enhanced"]
        });
        console.log(check)

        return check;
    } catch (error) {
        if (error instanceof OnfidoApiError) {
            // An error response was received from the Onfido API, extra info is available.
            console.log(error.message);
            console.log(error.type);
            console.log(error.isClientError());
        } else {
            // No response was received for some reason e.g. a network error.
            console.log(error.message);
        }
    }

}
module.exports = {
    setup
}