
const prompt = require('prompt');
const fs = require('fs');
const path = require('path');

let forms = []


const readJsonForm = (formName) => {
    let form_string = fs.readFileSync(path.join(__dirname, 'forms', formName));
    let form = JSON.parse(form_string);
    forms.push({ name: formName, form })
    return form;
}

const writeJsonForm = (filledForm, filename) => {
    fs.writeFile(path.join(__dirname, '.', 'filledForms', filename), JSON.stringify(filledForm), 'utf8', async()=>{
    }); 
}

const get_form_name = async () => {
    const properties = [
        {
          name: `enter the form name in forms folder (add json extension)
          `,
        }
      ];
      return await askQuestion(properties)
}

choose_form = async () => {
    let text= `choose a form: \n`
    let forms_selection = forms.map((form, index) => {
        return `${index + 1}. ${form.name}\n`
    }).join("")
    text += forms_selection
    const properties = [
        {
          name: text,
        }
      ];
      let form_index =  await askQuestion(properties)
      form_index = parseInt(form_index) - 1;
      return(forms[form_index]);
    
}

const fill_form = async () => {
    let result = {}
    let answers = [];
    let formObject = await choose_form();
    if(!formObject){
        console.log('form does not exists')
    }
    else{
        let index = 0
        while(index < formObject.form.length){
            let properties = [
                {
                    name: formObject.form[index]["question"]
                }
            ]
            let answer = await askQuestion(properties);
            answers.push(answer);
            index++;
        }
    }

    answers.forEach((answer, index) => {
        let question = formObject.form[index]["question"]
        result[question] = answer
    })

    writeJsonForm(result, formObject.name);

    console.log('Thank you for filling the form! Here is the filled form:\n\n');
    console.log(result);
    console.log('\n\n The filled form is also generated as json file in the filledForms folder in the project root folder.')


}


const askQuestion = (properties) => {
    return new Promise((resolve, reject) => {
        prompt.get(properties,  (err, result) => {
            if (err) {
              console.log(err);
              reject(err);
              return 1;
            }
            resolve(result[properties[0]["name"]]);
          });
    })
}

module.exports = {
    readJsonForm,
    writeJsonForm,
    get_form_name,
    choose_form,
    fill_form,
    askQuestion
}