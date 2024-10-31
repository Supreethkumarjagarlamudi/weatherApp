const contentContainer = document.getElementById("contentContainer");
const sidebarContainer = document.getElementById("sidebarContainer");
const menuContainer = document.getElementById("menuContainer");
const bars = document.getElementById("bars");
const cross = document.getElementById("wrong");
// plus Sidebar btn
const plusBtnCont = document.getElementById("plusBtnCont");
const plusBtn = document.getElementById("plusBtn");
const deleteBtn = document.getElementsByClassName("deleteBtn");
const citySearchBar = document.getElementById("addInputBar");
// sideBar starts here
const list = document.getElementById("citiesUl");
const len = list.getElementsByClassName("citiesLi");
const hiddenInput = document.getElementById("hiddenInput")
const tickContainer = document.getElementById("tickContainer");
const inp = document.getElementById("cityInput");

//slider starts here
const slideInput = document.getElementById("slideInput");
const valueDisplay = document.getElementById("tempIndicator");

let citiesList = [];
let originalLen = 0;
for(let i = 0; i < len.length; i++){
    originalLen++;
    citiesList.push(len[i].firstElementChild.childNodes[3].innerText);
}
menuContainer.addEventListener("click", () => {
    if(bars.classList.contains("show")){
        bars.classList.remove("show");
        cross.classList.add("show");
        sidebarContainer.classList.add("open");
        contentContainer.classList.remove("close");
    }else{
        if(cross.classList.contains("show")){
            cross.classList.remove("show");
            bars.classList.add("show");
            sidebarContainer.classList.remove("open");
            contentContainer.classList.add("close");
        }
    }
})

plusBtnCont.addEventListener("click", () => {
    if(!plusBtn.classList.contains("click")){
        plusBtn.classList.toggle("click");
        for(let i = 0; i < deleteBtn.length; i++)
            deleteBtn[i].classList.toggle("check");
        citySearchBar.classList.toggle("expand");
    }else{
        if(citiesList.length != originalLen){
            alert("Please Submit! To apply changes");
            return;
        }else{
            plusBtn.classList.toggle("click");
            for(let i = 0; i < deleteBtn.length; i++)
                deleteBtn[i].classList.toggle("check");
            citySearchBar.classList.toggle("expand");
        }
    }

});

for(let i = 0; i < citiesList.length; i++){
    const li = document.createElement('li');
    li.classList.add('citiesLi');

    // Create the content div
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    // Create the location icon
    const locationIcon = document.createElement('i');
    locationIcon.classList.add('fa-solid', 'fa-location-dot');

    // Create the city name element
    const cityName = document.createElement('p');
    cityName.textContent = citiesList[i];

    // Append the icon and city name to the content div
    contentDiv.appendChild(locationIcon);
    contentDiv.appendChild(cityName);

    // Create the delete button div
    const deleteDiv = document.createElement('div');
    deleteDiv.classList.add('deleteBtn');

    // Create the trash icon
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fas', 'fa-trash-alt');

    // Append the trash icon to the delete div
    deleteDiv.appendChild(trashIcon);

    // Append the content div and delete div to the list item
    li.appendChild(contentDiv);
    li.appendChild(deleteDiv);

    // Optionally, attach a delete event to the delete button
    deleteDiv.addEventListener('click', function() {
        let deleteedCity = li.innerText;
        let index = citiesList.indexOf(deleteedCity);
        citiesList.splice(index, 1);
        console.log(citiesList);
        li.remove(); // Removes the city item from the list
    });

    const cityUl = document.getElementById("citiesUl");

    citiesUl.appendChild(li);
}

tickContainer.addEventListener("click", () => {
    console.log(inp.value);
    citiesList.push(inp.value);
    console.log(citiesList)
    const li = document.createElement('li');
    li.classList.add('citiesLi');

    // Create the content div
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    // Create the location icon
    const locationIcon = document.createElement('i');
    locationIcon.classList.add('fa-solid', 'fa-location-dot');

    // Create the city name element
    const cityName = document.createElement('p');
    cityName.textContent = inp.value;

    // Append the icon and city name to the content div
    contentDiv.appendChild(locationIcon);
    contentDiv.appendChild(cityName);

    // Create the delete button div
    const deleteDiv = document.createElement('div');
    deleteDiv.classList.add('deleteBtn', 'check');

    // Create the trash icon
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fas', 'fa-trash-alt');

    // Append the trash icon to the delete div
    deleteDiv.appendChild(trashIcon);

    // Append the content div and delete div to the list item
    li.appendChild(contentDiv);
    li.appendChild(deleteDiv);

    // Optionally, attach a delete event to the delete button
    deleteDiv.addEventListener('click', function() {
        let deleteedCity = li.innerText;
        let index = citiesList.indexOf(deleteedCity);
        citiesList.splice(index, 1);
        console.log(citiesList);
        li.remove(); // Removes the city item from the list
    });

    const cityUl = document.getElementById("citiesUl");
    inp.value = "";
    citiesUl.appendChild(li);
})

function submitClick() {
    console.log(citiesList)
    hiddenInput.value = JSON.stringify(citiesList);
}

tempIndicator.textContent = slideInput.value;
slideInput.addEventListener("input", function() {
    tempIndicator.textContent = event.target.value;
});