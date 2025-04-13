console.log("video script added");
// 1- fatch , load and show categories on html 

// creat loadCategories
const loadCategories = () => {

    // fetch the data 
    fetch ( "https://openapi.programming-hero.com/api/phero-tube/categories") 
    .then()
    .catch ((error )  => console.log(error) )


};


// Create DisplayCategories 
const displayCategories = () => {
   
    };

loadCategories();