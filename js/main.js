var productName =document.getElementById("productName");
var productPrice =document.getElementById("productPrice");
var productModel =document.getElementById("productModel");
var productDEscription =document.getElementById("productDEscription");
var productlList =[]
var addBtn= document.getElementById("addBtn")
var updateBtn= document.getElementById("updateBtn")
var indexFlag;

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
        };
        productlList.push(product);
        localStorage.setItem("productArray", JSON.stringify(productlList))
        displayProduct(productlList);
        clearForm(); 
    }
}
function clearForm(){
    productName.value= "";
    productPrice.value= "";
    productModel.value ="";
    productDEscription.value ="";
};
function displayProduct(products){
    var cartona = ``;
    for ( var i = 0 ; i < products.length ; i ++){
        cartona += `<tr>
        <td>${[i + 1]}</td>
        <td>${products[i].NewName?products[i].NewName:products[i].Name}</td>
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
    var foundItems = [];
    for(var i = 0 ; i < productlList.length ; i++){
        if(productlList[i].Name.toLowerCase().includes(term.toLowerCase()) ===true){
        productlList[i].NewName =productlList[i].Name.toLowerCase().replace(term.toLowerCase(),  `<span class="text-danger">${term}</span>` )
            // console.log("found", i,  productlList[i].NewName)
            foundItems.push(productlList[i])
        }
    }
    displayProduct(foundItems);
}

function  setFormForUpdate(index){
    addBtn.classList.replace('d-block' , 'd-none');
    updateBtn.classList.replace('d-none' , 'd-block');
    productName.value = productlList[index].Name;
    productPrice.value =  productlList[index].price;
    productModel.value =  productlList[index].model;
    productDEscription.value =  productlList[index].des;
    indexFlag = index;
};

function updateProducts(indexFlag){
    productlList[indexFlag].Name= productName.value;
    productlList[indexFlag].price= productPrice.value;
    productlList[indexFlag].model=productModel.value;
    productlList[indexFlag].des=productDEscription.value;
    localStorage.setItem("productArray", JSON.stringify(productlList))
    displayProduct(productlList);
    addBtn.classList.replace('d-none' , 'd-block');
    updateBtn.classList.replace('d-block' , 'd-none');
    clearForm()
};

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