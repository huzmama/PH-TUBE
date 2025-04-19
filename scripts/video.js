console.log("video script added");

function getTimeString(time) {
    // get hour and rest seconds 
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute
     ${remainingSecond}second ago`;


}

const removeActiveClass=()=> {
const buttons = document.getElementsByClassName("category-btn");

for(let btn of buttons){
    btn.classList.remove("active");

}
};


// 1- fatch , load and show categories on html 

// creat loadCategories
const loadCategories = () => {

    // fetch the data 
    fetch ( "https://openapi.programming-hero.com/api/phero-tube/categories") 
    .then( (res) => res.json()) 
    .then((data) => displayCategories(data.categories
    ))
    .catch ((error )  => console.log(error) );


};


const loadVideos = () => {

    // fetch the data 
    fetch ( "https://openapi.programming-hero.com/api/phero-tube/videos") 
    .then( (res) => res.json()) 
    .then((data) => displayVideos(data.videos) 
    )
    .catch ((error )  => console.log(error) );


};

const loadCategoryVideos= (id) => {
    // alert(id);
    fetch ( `https://openapi.programming-hero.com/api/phero-tube/category/${id}`) 
    .then( (res) => res.json()) 
    .then((data) => {
        // sobaike active class remove koro
        removeActiveClass();

        // id er class k active koro 

        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active");
        displayVideos(data.category)
    } 
    )
    .catch ((error )  => console.log(error) );

};

const loadDetails= async (videoId)=>{
console.log(videoId);
const uri=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
const res = await fetch(uri);
const data = await res.json();
displayDetails(data.video);


};

const displayDetails = (video) => {
    console.log(video);
    const detailContainer = document.getElementById("modal-content");

    detailContainer.innerHTML = `
    <img src=${video.thumbnail}  /> `;

    // way-1
    // document.getElementById("showModalData").click();

    // way-2
    document.getElementById("customModal").showModal();


};


// const cardDemo=
//     {
//         "category_id": "1001",
//         "video_id": "aaah",
//         "thumbnail": "https://i.ibb.co/hY496Db/coloer-of-the-wind.jpg",
//         "title": "Colors of the Wind",
//         "authors": [
//             {
//                 "profile_picture": "https://i.ibb.co/6r4cx4P/ethen-clack.png",
//                 "profile_name": "Ethan Clark",
//                 "verified": true
//             }
//         ],
//         "others": {
//             "views": "233K",
//             "posted_date": "16090"
//         },
//         "description": "Ethan Clark's 'Colors of the Wind' is a vibrant musical exploration that captivates listeners with its rich, expressive melodies and uplifting rhythm. With 233K views, this song is a celebration of nature's beauty and human connection, offering a soothing and enriching experience for fans of heartfelt, nature-inspired music."
//     }


const displayVideos = (videos) => {
    const videocontainer = document.getElementById("videos");
    videocontainer.innerHTML="";


    if(videos.length == 0) {
        videocontainer.classList.remove("grid");
        videocontainer.innerHTML = `
        <div class="min-h-[300px] w-full  flex flex-col gap-5 justify-center items-center" >
        <img src="assets/Icon.png" />
        <h2 class="text-center text-xl front-bold "> No Content Here in This  Category </h2>

        </div>

        `;
        return;

    }else{
        videocontainer.classList.add("grid");
    }



    videos.forEach(video => {
        console.log(video );
        const card = document.createElement("div");
        card.classList = "card card-compact "; 
        card.innerHTML =

  `
    <figure class=" h-[200px] relative  " >
    <img
      src= ${video.thumbnail}
      class="h-full w-full object-cover  "
      alt="Shoes" />
      ${
        video.others.posted_date?.length == 0 ? "" : ` <span class=" absolute text-xs   right-2 bottom-2 bg-black text-white  rounded p-1  "> ${getTimeString(video.others.posted_date)}  </span> `
      }

      
  </figure>
  <div class="px-0 py-2 flex gap-2  ">
   <div> 
   <img class="w-10 h-10 rounded-full object-cover  " src=${video.authors [0].profile_picture} />
   </div>
   <div> 
         <h2 class="front-bold" > ${video.title} </h2>

        <div class=" flex items-center gap-2  ">
         <p class="text-gray-400   "> ${video.authors [0].profile_name } </p>
         ${video.authors[0].verified == true ? `<img class="w-5 " src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" />` : "" }
         
         </div>

          <p> <button onclick="loadDetails('${video.video_id}') " class=" btn btn-sm btn-error "> Details</buutton> </p>

   </div>
   
  </div>
  `;

  videocontainer.append(card);

    });
 };

// Create DisplayCategories 
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");

    
   categories.forEach( (item) => {
    console.log (item);
    // create a button 
    const buttonContainer = document.createElement("div");
   buttonContainer.innerHTML=
   `
   <button id="btn-${item.category_id}"  onclick= "loadCategoryVideos(${item.category_id})" class=" btn category-btn "> 
    ${item.category} 
    </button>
   `;



    // addnbutton to categories contaner 
    categoryContainer.append(buttonContainer);



   });
    };

loadCategories();
loadVideos();
