const prompt = require('prompt');
const {
    readJsonForm,
    get_form_name,
    fill_form,
    askQuestion
} = require('./functions') 


const main = async () => {

    const hello_properties = [
        {
          name: `Welcome, choose an action:
          1. import a form
          2. fill in a form
          `,
          validator: /^[1-2]{1}$/,
          warning: 'only 1 or 2 digits are valid answers'
        }
      ];
    
    prompt.start();

    let first_action = await askQuestion(hello_properties);

    while(first_action === "1"){
        let formName = await get_form_name();
        readJsonForm(formName);
        first_action = await askQuestion(hello_properties)
    }
    fill_form();
    
}


main();



