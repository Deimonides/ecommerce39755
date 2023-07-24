// const socketClient = io()



/* const form = document.getElementById('formNewProduct')

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const myFormData = new FormData(e.target)

    const formDataObj = Object.fromEntries(myFormData.entries())

    // formDataObj.favorite_pet = myFormData.getAll("favorite_pet")
    console.log(formDataObj);

    // output data
    // const output = document.querySelector(".output-pre")
    // output.innerText = JSON.stringify(formDataObj, null, 2)


})
 */













/* 


const form = document.getElementById('formNewProduct');
let submit = document.getElementById('submit')

submit.addEventListener('click', evt => {
    evt.preventDefault();
    const myFormData = new FormData(evt.target);

    const formDataObj = {};
    myFormData.forEach((value, key) => (formDataObj[key] = value));
    console.log(formDataObj);
});
     */
    /* let newProduct = []
    // const form = document.getElementById('formNewProduct')

    let title = document.getElementById('title')
    let description = document.getElementById('description')
    let code = document.getElementById('code')
    let price = document.getElementById('price')
    let tistocktle = document.getElementById('stock')
    let thumbnails = document.getElementById('thumbnails')

    title && newProduct.push([title, title.value])
 */
    // console.log('cosooo', newProduct);

    /* var formulario = document.forms[0];
  // obtener todos los campos del formulario
  var campos = formulario.elements;
  // crear objeto para almacenar los campos y valores
  var datos = {};
  // recorrer los campos y almacenar sus nombres y valores
  for (var i = 0; i < campos.length; i++) {
    var campo = campos[i];
    if (campo.type !== "submit") {
      datos[campo.name] = campo.value;
    }
  }
  // hacer algo con los datos obtenidos
  // evitar que el formulario se envíe
  return false; */
   




    /* 
        // obtener formulario
        const form = document.forms[0];
        // obtener todos los campos del formulario
        const fields = form.elements;
        // crear objeto para almacenar los valores de los campos
        let values = {};
        // recorrer los campos y almacenar sus valores
        for (var i = 0; i < fields.length; i++) {
          let field = fields[i];
          if (field.type !== "submit") {
            values[field.name] = field.value;
          }
        }
        // hacer algo con los valores obtenidos
        console.log('valores: ', [values]);
        // evitar que el formulario se envíe
        
 */







    // console.log("Click?");
    
    // const form = document.getElementById('formNewProduct')
    // const newProduct =  Array.from(form.elements)
    // const newProduct =  form.value
    // console.log("newProduct en index.js: ", newProduct);
    
    
    //socketClient.emit('newProduct', newProduct)
    
    // console.log("socket emit?");

    // form.FormData = ""
/* 
    
    productManager.addProduct(
        document.getElementById('title').value,
        document.getElementById('description').value,
        document.getElementById('code').value,
        document.getElementById('price').value,
        document.getElementById('stock').value,
        document.getElementById('category').value,
        document.getElementById('thumbnails').value
    ) */

    // return false;
// })