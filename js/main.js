var productName =document.getElementById("productName");
var productPrice =document.getElementById("productPrice");
var productModel =document.getElementById("productModel");
var productDEscription =document.getElementById("productDEscription");
var productlList =[]
var addBtn= document.getElementById("addBtn")
var updateBtn= document.getElementById("updateBtn")

if(localStorage.getItem("productArray") !=null){
    productlList= JSON.parse(localStorage.getItem("productArray"))  
    displayProduct(productlList)
}

function AddProduct(){
    if(validation() ==true){
        var product ={
            Name:productName.value,
            price:productPrice.value,
            model:productModel.value,
            des:productDEscription.value
        }
        productlList.push(product);
        localStorage.setItem("productArray", JSON.stringify(productlList))
        displayProduct(productlList);
        clearForm() 
        console.log(productlList);
    }else{
        // alert("invalid")
    }
  
}
function clearForm() {
    productName.value= "";
    productPrice.value= "";
    productModel.value ="";
    productDEscription.value ="";
}
function displayProduct(products){
    var cartona = ``;
    for ( var i = 0 ; i < products.length ; i ++){
        cartona += `<tr>
        <td>${[i]}</td>
        <td>${products[i].NewName?products[i].NewName: products[i].Name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].model}</td>
        <td>${products[i].des}</td>
        <td>
            <button onclick="setFormForUpdate(${i})" class="btn btn-warning">Update</button>
        </td>
        <td>
            <button onclick=" deleteProduct(${i})" class="btn btn-danger">Delete</button>
        </td>
    </tr>`
    }
    document.getElementById("tBody").innerHTML=cartona;
}

function deleteProduct(productIndex){
    productlList.splice(productIndex,1)
    localStorage.setItem("productArray", JSON.stringify(productlList))
    displayProduct(productlList)
}

function serchByName(term){
    var foundItems = []
    for(var i = 0 ; i < productlList.length ; i++){
        if(productlList[i].Name.toLowerCase().includes(term.toLowerCase()) ==true){
        productlList[i].NewName =productlList[i].Name.toLowerCase().replace(term.toLowerCase(),  `<span class="text-danger">${term}</span>` )
            console.log("found", i,  productlList[i].NewName)
            foundItems.push(productlList[i])
        }
    }
    displayProduct(foundItems)
}

function  setFormForUpdate(i){
    addBtn.classList.replace('d-block' , 'd-none');
    updateBtn.classList.replace('d-none' , 'd-block');
    productName.value = productlList[i].Name
    productPrice.value =  productlList[i].price
    productModel.value =  productlList[i].model
    productDEscription.value =  productlList[i].des

}


function validation(){
    var regex = /^[A-Z][a-z]{3,8}$/
    if(regex.test(productName.value) ==true){
        productName.style.border ="none";
        document.getElementById("wrongName").classList.add("d-none");
        return true;
    }else{
        productName.style.border ="5px solid red";
        document.getElementById("wrongName").classList.remove("d-none");
        return false;
    }
}