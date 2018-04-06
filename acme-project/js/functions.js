//connecting to JSON file
const URL = "js/acme.json";
    fetch(URL)
        .then(response => response.json())
        .then(function(data){
        console.log('Json object from getData function:');
        console.log(data);
        createNav(data);
    })
    .catch(error => console.log('There was an error: ', error));

//function to capitalize first letter
String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

//function to create navigation
function createNav(data){
    console.log(data.items);
    let list = '<ul id="nav1">';
    list += '<li><a class="activeLink btn" data-name="home" href="index.html" title="home">Home</a></li>';
    list+='<li><a class="btn" data-name="'+ data.items.item_one+'" Title="'+data.items.item_one+'" href="'+data.items.item_one+'.html">'+data.items.item_one.capitalize()+'</a></li>';
    list+='<li><a class="btn" data-name="'+ data.items.item_two+'" Title="'+data.items.item_two+'" href="'+data.items.item_two+'.html">'+data.items.item_two.capitalize()+'</a></li>';
    list+='<li><a class="btn" data-name="'+ data.items.item_three+'" Title="'+data.items.item_three+'" href="'+data.items.item_three+'.html">'+data.items.item_three.capitalize()+'</a></li>';
    list+='<li><a class="btn" data-name="'+ data.items.item_four+'" Title="'+data.items.item_four+'" href="'+data.items.item_four+'.html">'+data.items.item_four.capitalize()+'</a></li>';
    list+="</ul>";
    console.log(list);
    const navigation = document.getElementById("page-nav");
    navigation.innerHTML = list;
}


//adding event listener to navigation bar
let pageNav = document.getElementById("page-nav");

pageNav.addEventListener("click", function(event){

    let itemName = event.target.dataset.name;
    event.preventDefault();
    console.log(itemName);
    let btns = document.getElementsByClassName("activeLink");
    console.log(btns);
    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove('activeLink');
    }
    event.target.setAttribute("class", "activeLink");

   displayData(itemName);
});


//function to display product details
function displayData(itemName) {
    const productDescription = document.getElementById("productDescription");
    console.log(productDescription);
    const main = document.getElementById("main");
    if (itemName==="home"){
        productDescription.setAttribute("class", "hide");
        main.setAttribute("class", "display");
        document.title = "Acme Home Page";
    } else {
        productDescription.setAttribute("class", "display");
        main.setAttribute("class", "hide");
        const URL = "js/acme.json";
        fetch(URL)
            .then(response => response.json())
            .then(function(data){
            let name = data[itemName].name;
            let path = data[itemName].path;
            let description = data[itemName].description;
            let manufacturer = data[itemName].manufacturer;
            let price = data[itemName].price;
            let reviews = data[itemName].reviews;
            document.getElementById("name").innerHTML = name;
            document.getElementById("productImage").setAttribute("src", path);
            document.getElementById("description").innerHTML = description;
            document.getElementById("manufacturer").innerHTML = manufacturer;
            document.getElementById("price").innerHTML = price;
            document.getElementById("reviews").innerHTML = reviews;
            document.title = name+" | Acme";
        })
            .catch(error => console.log('There was an error: ', error))
    }
}


