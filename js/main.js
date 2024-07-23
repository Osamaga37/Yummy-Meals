$(document).ready(function () {
  $("#hide").on("click", function () {
    $(".all").hide(1000);
    $("#show").show();
    $("#hide").hide();
  });
  $("#show").on("click", function () {
    $(".all").show(1000);
    $("#show").hide();
    $("#hide").show();
  });

  $("#cat").on("click", function () {
    getCategories();
    $(".all").hide(1000);
    $("#show").show();
    $("#hide").hide();
  });

  $("#area").on("click", function () {
    getAreas();
    $(".all").hide(1000);
    $("#show").show();
    $("#hide").hide();
  });

  $("#ingre").on("click", function () {
    getIngredients();
    $(".all").hide(1000);
    $("#show").show();
    $("#hide").hide();
  });


  $("#search").on("click", function(){
    displaySearchInput();
    $(".all").hide(1000);
    $("#show").show();
    $("#hide").hide();
  });

  $("#contact").on("click", function(){
    displayContact();
    $(".all").hide(1000);
    $("#show").show();
    $("#hide").hide();
  });


  getHome();

  $(document).on("input", "#searchByName", function () {
    getSearchByName();
  });

  $(document).on("input", "#searchByLetter", function () {
    getSearchByLetter();
  });
  

});


async function getHome() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    const data = await response.json();
    console.log(data);
    displayHome(data);
  } catch (error) {
    console.log(error);
  }
}

function displayHome(data) {
  let container = ``;
  for (let i = 0; i < data.meals.length; i++) {
    container += `
        <div class="col-md-3 mt-5 meal pointer-event cover rounded" data-id="${data.meals[i].idMeal}">>
                <img src="${data.meals[i].strMealThumb}" class=" w-100 h-100 rounded" alt="${data.meals[i].strMeal}">
                <div class=" content">
                    <h5 class=" text-black fw-bold fs-3">${data.meals[i].strMeal}</h5>
                </div>
        </div>
        `;
  }
  $("#searchData").html("");
  $("#rowData").html(container);

  $(".meal").on("click", function(){
    getDetails(this.dataset.id);
  })
}

async function getCategories() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const data = await response.json();
    console.log(data);
    displayCategories(data);
  } catch (error) {
    console.log(error);
  }
}

function displayCategories(data) {
  let container = ``;
  for (let i = 0; i < data.categories.length; i++) {
    container += `
        <div class="col-md-3 mt-5 meal" data-id="${data.categories[i].strCategory}">>
            <div class="cover" data-id="${data.categories[i].strCategory}">
                <img src="${data.categories[i].strCategoryThumb}" class="w-100 h-100 rounded" alt="${data.categories[i].strCategory}">
                <div class=" content">
                    <h5 class=" text-black fw-bold fs-3">${data.categories[i].strCategory}</h5>
                    <p class=" text-black ingredient text-center">${data.categories[i].strCategoryDescription}</p>
                </div>
            </div>
        </div>
        `;
  }
  $("#searchData").html("");
  $("#rowData").html(container);

  $(".meal").on("click", function () {
    const categoryId = $(this).data("id");
    getCategory(categoryId);
  });
}

async function getCategory(cat) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
    );
    const data = await response.json();
    console.log(data);
    displayCategory(data);
  } catch (error) {
    console.error(error);
  }
}

function displayCategory(data) {
  let container = ``;
  for (const meal of data.meals) {
    container += `
        <div class="col-md-3 mt-5 meal pointer-event cover rounded" data-id="${meal.idMeal}">>
                <img src="${meal.strMealThumb}" class=" w-100 h-100 rounded" alt="${meal.strMeal}">
                <div class=" content">
                    <h5 class=" text-black fw-bold fs-3">${meal.strMeal}</h5>
                </div>
        </div>
        `;
  }
  $("#searchData").html("");
  $("#rowData").html(container);

  $(".meal").on("click", function () {
    const mealId = $(this).data("id");
    getDetails(mealId);
  });
}

async function getAreas() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    const data = await response.json();
    console.log(data);
    displayAreas(data);
  } catch (error) {
    console.log(error);
  }
}

function displayAreas(data) {
  let container = ``;
  for (let i = 0; i < data.meals.length; i++) {
    container += `
        <div class="col-md-3 mt-4 meal-item text-center" data-id="${data.meals[i].strArea}">
                <div>
                    <i class="fa-solid fa-house-laptop text-white"></i>
                    <p class="text-center text-white">${data.meals[i].strArea}</p>
                </div>
        </div>
        `;
  }
  $("#searchData").html("");
  $("#rowData").html(container);

  $(".meal-item").on("click", function () {
    const areaId = $(this).data("id");
    getArea(areaId);
  });
}

async function getArea(area) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    const data = await response.json();
    displayArea(data);
  } catch (error) {
    console.error(error);
  }
}

function displayArea(data) {
  let container = ``;
  for (const meal of data.meals) {
    container += `
        <div class="col-md-3 mt-5 meal pointer-event cover rounded" data-id="${meal.idMeal}">>
                <img src="${meal.strMealThumb}" class="card-im w-100 h-100 rounded" alt="${meal.strMeal}">
                <div class="card-bod content">
                    <h5 class="card-title text-black font-bold">${meal.strMeal}</h5>
                    <p class="card-text text-black ingredient">${meal.strInstructions}</p>
                </div>
        </div>
        `;
  }
  $("#searchData").html("");
  $("#rowData").html(container);

  $(".meal").on("click", function () {
    const mealId = $(this).data("id");
    getDetails(mealId);
  });
}

async function getIngredients() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    );
    const data = await response.json();
    console.log(data);
    displayIngredients(data);
  } catch (error) {
    console.error(error);
  }
}

function displayIngredients(data) {
  let container = ``;
  for (let i = 0; i < data.meals.length; i++) {
    container += `
        <div class="col-md-3 mt-4 meal text-center" data-id="${data.meals[i].strIngredient}">
                <div>
                    <i class="fa-solid fa-drumstick-bite text-white fs-1"></i>
                    <h4 class="text-center text-white">${data.meals[i].strIngredient}</h4>
                    <p class="text-center text-white ingredient">${data.meals[i].strDescription}</p>
                </div>
        </div>
        `;
  }
  $("#searchData").html("");
  $("#rowData").html(container);

  $(".meal").on("click", function () {
    const ingredientId = $(this).data("id");
    getIngredient(ingredientId);
  });
}

async function getIngredient(ingredient) {
  try{
    const response = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    displayIngredient(data); 
  }catch (error) {
    console.error(error);
  }
}

function displayIngredient(data) {
  let container = ``;
  for (const meal of data.meals) {
    container += `
        <div class="col-md-3 mt-5 meal pointer-event cover rounded" data-id="${meal.idMeal}">>
                <img src="${meal.strMealThumb}" class="card-im w-100 h-100 rounded" alt="${meal.strMeal}">
                <div class="card-bod content">
                    <h5 class="card-title text-black font-bold">${meal.strMeal}</h5>
                    <p class="card-text text-black ingredient">${meal.strInstructions}</p>
                </div>
        </div>
        `;
  }
  $("#searchData").html("");
  $("#rowData").html(container);

  $(".meal").on("click", function(){
    const mealId = $(this).data('id');
    getDetails(mealId);
  })
}

async function getDetails(id) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    console.log(data);
    displayDetails(data);
  } catch (error) {
    console.error(error);
  }
}

function displayDetails(data) {
  let container = ``;
  for (const meal of data.meals) {
    container += `
        <div class="col-md-4 mt-4">
                <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}">
        </div>
        <div class="col-md-8 mt-4">
                    <h2 class="text-white">Instructions</h2>
                    <h4 class="text-white">${meal.strMeal}</h4>
                    <p class="text-white">${meal.strInstructions}</p>
                    <p class="text-white">Area: ${meal.strArea}</p>
                    <p class="text-white">Category: ${meal.strCategory}</p>
                    <h5 class="text-white">Recipes:</h5>
                    <ul class="text-white list-unstyled flex mt-3">
                    ${meal.strIngredient1 ? `<li>${meal.strIngredient1}</li>` : ""}
                    ${meal.strIngredient2 ? `<li>${meal.strIngredient2}</li>` : ""}
                    ${meal.strIngredient3 ? `<li>${meal.strIngredient3}</li>` : ""}
                    ${meal.strIngredient4 ? `<li>${meal.strIngredient4}</li>` : ""}
                    ${meal.strIngredient5 ? `<li>${meal.strIngredient5}</li>` : ""}
                    ${meal.strIngredient6 ? `<li>${meal.strIngredient6}</li>` : ""}
                    ${meal.strIngredient7 ? `<li>${meal.strIngredient7}</li>` : ""}
                    ${meal.strIngredient8 ? `<li>${meal.strIngredient8}</li>` : ""}
                    ${meal.strIngredient9 ? `<li>${meal.strIngredient9}</li>` : ""}
                    ${meal.strIngredient10 ? `<li>${meal.strIngredient10}</li>` : ""}
                    ${meal.strIngredient11 ? `<li>${meal.strIngredient11}</li>` : ""}
                    ${meal.strIngredient12 ? `<li>${meal.strIngredient12}</li>` : ""}
                    ${meal.strIngredient13 ? `<li>${meal.strIngredient13}</li>` : ""}
                    ${meal.strIngredient14 ? `<li>${meal.strIngredient14}</li>` : ""}
                    ${meal.strIngredient15 ? `<li>${meal.strIngredient15}</li>` : ""}
                    ${meal.strIngredient16 ? `<li>${meal.strIngredient16}</li>` : ""}
                    ${meal.strIngredient17 ? `<li>${meal.strIngredient17}</li>` : ""}
                    ${meal.strIngredient18 ? `<li>${meal.strIngredient18}</li>` : ""}
                    ${meal.strIngredient19 ? `<li>${meal.strIngredient19}</li>` : ""}
                    ${meal.strIngredient20 ? `<li>${meal.strIngredient20}</li>` : ""}
                        </ul>
                        <h5 class="text-white mt-3">Tags:</h5>
                        <p class="text-black bg-danger-subtle tag mt-3">${meal.strTags}</p>
                        <a href="${meal.strSource}" class=" bg-success py-2 px-3 mt-5 rounded">Source</a>
                        <a href="${meal.strYoutube}" class=" bg-danger py-2 px-3 mt-5 rounded">Youtube</a>
                </div>
        `;
  }
  $("#searchData").html("");
  $("#rowData").html(container);
}


async function getSearchByName() {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${$("#searchByName").val()}`
    );
    const data = await response.json();
    displaySearchByName(data);
  } catch (error) {
    console.error(error);
  }
}

async function getSearchByLetter() {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${$("#searchByLetter").val()}`
    );
    const data = await response.json();
    displaySearchByLetter(data);
  } catch (error) {
    console.error(error);
  }
}

function displaySearchByName(data) {
  let container = ``;
  for (const meal of data.meals) {
    container += `
        <div class="col-md-3 mt-5 meal pointer-event cover rounded" data-id="${meal.idMeal}">>
                <img src="${meal.strMealThumb}" class=" w-100 h-100 rounded" alt="${meal.strMeal}">
                <div class=" content">
                    <h5 class=" text-black fw-bold fs-3">${meal.strMeal}</h5>
                </div>
        </div>
        `;
  }
  $("#rowData").html(container);

  $(".meal").on("click", function(){
    const mealId = $(this).data('id');
    getDetails(mealId);
  })
}


function displaySearchByLetter(data) {
  let container = ``;
  for (const meal of data.meals) {
    container += `
        <div class="col-md-3 mt-5 meal pointer-event cover rounded" data-id="${meal.idMeal}">>
                <img src="${meal.strMealThumb}" class=" w-100 h-100 rounded" alt="${meal.strMeal}">
                <div class=" content">
                    <h5 class=" text-black fw-bold fs-3">${meal.strMeal}</h5>
                </div>
        </div>
        `;
  }
  $("#rowData").html(container);

  $(".meal").on("click", function(){
    const mealId = $(this).data('id');
    getDetails(mealId);
  })
}


function displaySearchInput() {
  let container = `
    <div class="col-md-6">
      <label for="searchByName" class="form-label"></label>
      <input class="form-control" list="datalistOptions" id="searchByName" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
      <label for="searchByLetter" class="form-label"></label>
      <input class="form-control" list="datalistOptions" id="searchByLetter" maxlength="1" placeholder="Search By Letter">
    </div>
  `;
  $("#rowData").html("");
  $("#searchData").html(container);
}


let allUsers = [];
if (localStorage.getItem("users")) {
  allUsers = JSON.parse(localStorage.getItem("users"));
}

function displayContact() {
  let container = `
    <form id="contactForm" class="row">
      <div class="col-md-6 mt-5">
        <div data-mdb-input-init class="form-outline">
          <input type="text" id="nameInput" class="form-control" placeholder="Enter your Name"/>
          <label class="form-label" for="nameInput"></label>
        </div>
      </div>
      <div class="col-md-6 mt-5">
        <div data-mdb-input-init class="form-outline">
          <input type="email" id="emailInput" class="form-control" placeholder="Enter your Email"/>
          <small id="emailHelp" class="form-text text-info">We'll never share your email with anyone else.</small>
          <label class="form-label" for="emailInput"></label>
        </div>
      </div>
      <div class="col-md-6 mt-5">
        <div data-mdb-input-init class="form-outline">
          <input type="text" id="phoneInput" class="form-control" placeholder="Enter your Phone"/>
          <label class="form-label" for="phoneInput"></label>
        </div>
      </div>
      <div class="col-md-6 mt-5">
        <div data-mdb-input-init class="form-outline">
          <input type="number" id="ageInput" class="form-control" placeholder="Enter your Age"/>
          <label class="form-label" for="ageInput"></label>
        </div>
      </div>
      <div class="col-md-6 mt-5">
        <div data-mdb-input-init class="form-outline">
          <input type="password" id="passwordInput" class="form-control" placeholder="Enter Your Password"/>
          <small id="passwordHelp" class="form-text text-info">The password must be 8-15 characters long and must not contain spaces and must contain atleast one special characters,numbers.</small>
          <label class="form-label" for="passwordInput"></label>
        </div>
      </div>
      <div class="col-md-6 mt-5">
        <div data-mdb-input-init class="form-outline">
          <input type="password" id="rePasswordInput" class="form-control" placeholder="Re-Enter Your Password"/>
          <label class="form-label" for="rePasswordInput"></label>
        </div>
      </div>
      <div class="col-12 mt-5 text-center">
        <button type="submit" class="btn btn-outline-danger">Submit</button>
      </div>
    </form>
  `;
  $("#searchData").html("");
  $("#rowData").html(container);

  $("#contactForm").on("submit", function(e){
    e.preventDefault();
    const uName = $("#nameInput").val();
    const email = $("#emailInput").val();
    const phone = $("#phoneInput").val();
    const age = $("#ageInput").val();
    const password = $("#passwordInput").val();
    const rePassword = $("#rePasswordInput").val();
    let emailFound = false;

    if (uName === "" || email === "" || phone === "" || age === "" || password === "" || rePassword === "" || password !== rePassword) {
      alert("Please fill all inputs and ensure passwords match");
    } else {
      for (let i = 0; i < allUsers.length; i++){
        if (allUsers[i].email === email){
          emailFound = true;
          break;
        }
      }
      if (emailFound) {
        alert("This email is already registered.");
      } else {
        const user = {
          name: uName,
          email: email,
          phone: phone,
          age: age,
          password: password
        };
  
        let allUsers = JSON.parse(localStorage.getItem("users")) || [];
        allUsers.push(user);
        localStorage.setItem("users", JSON.stringify(allUsers));
        alert("User data saved successfully!");
        $("#contactForm")[0].reset();
      }
      }
      
  });


  $("#nameInput").on("input", function(){
    validateData(this);
  });

  $("#emailInput").on("input", function(){
    validateData(this);
  });

  $("#phoneInput").on("input", function(){
    validateData(this);
  });

  $("#passwordInput").on("input", function(){
    validateData(this);
  });

  $("#rePasswordInput").on("input", function(){
    validateData(this);
  });

}




function validateData(element) {
  const regex = {
    nameInput: /^[a-zA-Z]+[a-zA-Z\s]*?[^0-9]\S$/,
    emailInput: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    phoneInput: /^\d{11}$/,
    passwordInput: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
  };

  const id = element.id;

  if (regex[id] && regex[id].test(element.value)) {
    $(element).addClass("is-valid").removeClass("is-invalid");
  } else {
    $(element).addClass("is-invalid").removeClass("is-valid");
  }
}


