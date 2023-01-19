// ==============================
//=================== loading
// ==============================

window.addEventListener("load", () => {
    setTimeout(() => {
        document.querySelector(".loading").classList.add("reload");
        document.body.classList.add("reload");
    },3000)
});



// ===============================================
//=================== navbar menu active click
// ===============================================

let menu = document.querySelector(".menu");
let btnOpen = document.querySelector(".open-menu");
let btnClose = document.querySelector(".close-menu");

btnOpen.addEventListener("click", () => {
    menu.classList.add("active");
    btnClose.addEventListener("click", () => {
        menu.classList.remove("active");
    })
})




// ===============================================
//=================== navbar link active click
// ===============================================




// const audioClick = new Audio("/Prayer-times/song/mixkit-fast-double-click-on-mouse-275.wav");
// const audioAnimation = new Audio("/Prayer-times/song/mixkit-video-game-retro-click-237.wav");
let section = document.querySelectorAll("section");
let navLink = document.querySelectorAll(".nav-link");

let audio;


function playSong() {
    navLink.forEach((e) => {
        e.addEventListener("click", (x) => {
            x.preventDefault()
            navLink.forEach((el) => {
                el.classList.remove("active")
            })    
            
            e.classList.add("active");
            // audioClick.play();
            menu.classList.remove("active");
            for (let sect of section) {
                
                sect.classList.add("hidden")
                if (sect.getAttribute("data-section") === e.getAttribute("data-section")) {
                    sect.classList.remove("hidden")
                }    
            }    
        })    
        // e.addEventListener("mouseover", (x) => {
        //     if (e.classList.contains("active")) {
        //         audioAnimation.pause()
        //     } else {
        //         audioAnimation.play()
        //     }    
        // })    
    })    
}    

playSong()





// ==============================
//=================== clock and date
// ==============================

let date = new Date();
let dateMonth = date.getMonth() + 1;
let dateDay = date.getDate();
let dateTostring = `${dateDay}-${dateMonth}-${date.getFullYear()}`;
if (dateMonth < 10 || dateDay < 10) {
    dateTostring = `${dateDay}-0${dateMonth}-${date.getFullYear()}`;
}

document.querySelector(".date-new").innerHTML = `<span>${dateTostring}</span>`;

const deg = 6;
const hr = document.querySelector("#hr");
const mn = document.querySelector("#mn");
const sc = document.querySelector("#sc");


setInterval(() => {
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    let ss = day.getSeconds() * deg;
    hr.style.transform = `rotateZ(${hh+(mm/12)}deg)`;
    mn.style.transform = `rotateZ(${mm}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`;
})



function getHourElec() {
    setInterval(() => {
        let day = new Date();
        let hr = day.getHours();
        let mn = day.getMinutes();
        let sc = day.getSeconds();

        let contentHour = `${hr}:${mn}:${sc}`;
        document.querySelector(".electronic-watch span").textContent = contentHour;
    })
}

getHourElec();



// ===================================
//=================== Request Api
// ===================================

let country = document.querySelector(".content-country");
let city = document.querySelector(".content-city");
let choiceCountry = document.querySelector(".choice-country");
let choiceCity = document.querySelector(".choice-city");


if (!city.children.length === 0) {
    city.classList.add("active");
} else {
    city.classList.remove("active");
}

window.onload = function () {

    fetch("https://countriesnow.space/api/v0.1/countries")
    .then(response => {
        if (response.ok)
        {
            return response.json()
        }
    }).then(posts =>
        {
            for (let post of posts.data)
            {
            choiceCountry.textContent = "your country";
            let splitcharacter = post.cities.join(",").split("");
            let map = splitcharacter.map((e) => {
                return e === "'"? e = " " : e;
            })
            let countryContent = `
            <span onclick="getData('${post.iso2}', this.textContent, '${map.join("").split(",")}')">${post.country}</span>`;
    
            country.innerHTML += countryContent;
            country.classList.add("active");
        }
    })
    
}
    


// ======================= click country for choice
let inputs = document.querySelectorAll(".input-focus");
function getData(is2, contr, ...cityText) {
    
    // audioClick.play();
    inputs[0].value = "";
    
    city.innerHTML = "";
    
    choiceCountry.innerHTML = 'your country ';
    
    choiceCountry.innerHTML += ':  ' + contr;
    let split = cityText.join("").split(",")
    
    choiceCity.textContent = "your city ";
    for (let cty of split) {
        
        let countryCity = `
        <span onclick="getTime('${is2}', this.textContent)">${cty}</span>`;
        
        city.innerHTML += countryCity;
    }


    if (!country.classList.contains("active")) {
        country.classList.add("active");
    } else {
        country.classList.remove("active");
    }

    if (!city.classList.contains("active")) {
        city.classList.add("active");
    } else {
        city.classList.remove("active");
    }
    
    
}


// ================= click or choice in city


function getTime(iso2, cty) {
    
    inputs[1].value = "";

    // audioClick.play();
    
    document.getElementById("prayer-times").classList.remove("hidden");
    document.getElementById("place").classList.add("hidden");
    for (let link of navLink) {
        
        if (link.getAttribute("data-section") === document.getElementById("prayer-times").getAttribute("data-section")) {
            link.classList.add("active")
        } else {
            link.classList.remove("active")
        }
    }
    

    choiceCity.innerHTML = "your city";
    if (!city.classList.contains("active")) {
        city.classList.add("active");
    }
    if (!country.classList.contains("active")) {
        country.classList.add("active");
    }
    choiceCity.textContent += ":  " + cty;
    getPostsAdhan(iso2, cty)
}


// ================= request Api aladhan 
    
    
function getPostsAdhan(e, t) {
    fetch(`https://api.aladhan.com/v1/calendarByCity?country=${e}&city=${t}`)
    .then(response => {
        if (response.ok)
        {
            return response.json()
        }
    }).then((prayer) => {
        for (let prayerData of prayer.data) {
            if (prayerData.date.gregorian.date === dateTostring) {
                let content = `
                <li>${prayerData.timings.Imsak}</li>
                <li>${prayerData.timings.Fajr}</li>
                <li>${prayerData.timings.Sunrise}</li>
                <li>${prayerData.timings.Dhuhr}</li>
                <li>${prayerData.timings.Asr}</li>
                <li>${prayerData.timings.Sunset}</li>
                <li>${prayerData.timings.Maghrib}</li>
                <li>${prayerData.timings.Isha}</li>
                <li>${prayerData.timings.Firstthird}</li>
                <li>${prayerData.timings.Midnight}</li>
                <li>${prayerData.timings.Lastthird}</li>`;
                
                document.querySelector(".times").innerHTML = content;
                
                let contentDate = `<span>${prayerData.date.gregorian.weekday.en} ${prayerData.date.gregorian.month.en} ${prayerData.date.gregorian.year}</span>`;
                
                document.querySelector(".date-day-years").innerHTML = contentDate;
            }
            console.log(e)
            console.log(t)
        }
    })
}

getPostsAdhan()

// window.navigator.geolocation.getCurrentPosition(console.log, console.log);

// getCurrentPosition(successCallback, failureCallback);
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((location) => {
        console.log()
        console.log()
        // getPostsAdhan(location.coords.latitude, location.coords.longitude)
    },
    (eror) => {

    console.log(eror)
    })
} else {

}

// =======================================
// =================== Click Choice
// =======================================


function clickChoice() {
    choiceCountry.addEventListener("click", () => {
        
        // audioClick.play();

        if (country.classList.contains("active")) 
        {
            country.classList.remove("active");
            city.classList.remove("active")
        } else 
        {
            country.classList.add("active");
            city.classList.remove("active")
        }
        if (city.classList.contains("active")) 
        {
            city.classList.remove("active");
            country.classList.add("active")
        } else 
        {
            city.classList.add("active");
            country.classList.remove("active");
        }
    });
    
    choiceCity.addEventListener("click", () => {

        // audioClick.play();

        if (city.children.length === 0) {
            if (country.classList.contains("active")) 
            {
                country.classList.remove("active");
            } 
        } else {
            country.classList.add("active");
            city.classList.remove("active");
        }
    });
    
}


clickChoice() 



// =======================================
// =================== search-country
// =======================================


// ===============focus input country

let input = document.querySelectorAll(".input-focus");

input[0].addEventListener("focus", () => {
    
    
    // audioClick.play();

    if (!city.classList.contains("active")) 
        {
            city.classList.add("active");
        }

    if (country.classList.contains("active")) {
        country.classList.remove("active");
    }
})

// ===============focus input city

input[1].addEventListener("focus", () => {
    
    // audioClick.play();

    if (city.children.length === 0) {
        if (country.classList.contains("active")) 
        {
            country.classList.remove("active");
        } 
    } else {
        country.classList.add("active");
        city.classList.remove("active");
    }
})


// ===============search in country


const searchCountry = () => {
    const searchBox =  document.getElementById("search-country").value.toUpperCase();
    const searchInBox = document.querySelectorAll(".country-item span");
    for (let text of searchInBox) {
        let textValue = text.textContent || text.innerHTML;
        
        if (textValue.toUpperCase().indexOf(searchBox) > -1) {
            text.style.display = "block"

            console.log(text.textContent);
        } else {
            text.style.display = "none";
        }
    }
} 



// ===============search in city


const searchCity = () => {
    const searchBox = document.getElementById("search-city").value.toUpperCase();
    const searchInBox = document.querySelectorAll(".city-item span");
    const cityItem = document.querySelector(".city-item");
    
    for (let text of searchInBox) {
        let textValue = text.textContent || text.innerHTML;
        
        if (textValue.toUpperCase().indexOf(searchBox) > -1) {
            text.style.display = "block"

            console.log(text.textContent);
        } else {
            text.style.display = "none";
        }
    }
    if (cityItem.children.length === 0 ) {

        cityItem.textContent = `<p>choice yor country</p>`;

        if (cityItem.classList.contains("active")) {
            cityItem.classList.remove("active");
        } else {
            cityItem.classList.add("active");
        }
    }
} 


