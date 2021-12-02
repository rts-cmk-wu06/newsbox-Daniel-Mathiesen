const swipeContainer = document.querySelector("#swipe-container");
const createUser = (data) => {
    //swipe box element
    let swipeBox = document.createElement("div");
    swipeBox.classList.add("swipe-box");
    swipeBox.setAttribute("data-number", data.id);

    let btnBox = document.createElement("div");
    btnBox.classList.add("btn-box");

    //del button icon element
    let delIcon = document.createElement("i");
    delIcon.classList.add("fas");
    delIcon.classList.add("fa-trash");

    //del button element
    let delBtn = document.createElement("button");
    delBtn.classList.add("del-btn");
    delBtn.append(delIcon);

    //restore button icon element
    let restoreIcon = document.createElement("i");
    restoreIcon.classList.add("fas");
    restoreIcon.classList.add("fa-trash-restore");

    //restore button element
    let restoreBtn = document.createElement("button");
    restoreBtn.classList.add("restore-btn");
    restoreBtn.append(restoreIcon);

    //swipe text element
    let swipeText = document.createElement("p");
    swipeText.classList.add("swipe-text");
    swipeText.textContent = data.name;

    //appends to DOM
    btnBox.append(delBtn);
    btnBox.append(restoreBtn);
    swipeBox.append(btnBox);
    swipeBox.append(swipeText);
    swipeContainer.append(swipeBox);
}


Object.values(localStorage).forEach(val => {
    if(val){
        let user = JSON.parse(val);
        createUser(user);
    }
});

document.querySelector("#swipe-container").addEventListener("touchstart", (e)=>{
    if(e.target.classList.contains("swipe-text")){
        let touchElement = e.target;
        let parentElement = touchElement.closest(".swipe-box");
        let touchCordStart = Math.floor(e.touches[0].clientX);
        let touchCordMove;
        let restoreBtn = parentElement.querySelector(".restore-btn");
        let delBtn = parentElement.querySelector(".del-btn");
        let btnWidth = parentElement.querySelector(".btn-box").offsetWidth;

        if(touchElement.classList.contains("swipe-text")){
            // touch move
            touchElement.addEventListener("touchmove", (e) => {
                touchCordMove = Math.floor(e.touches[0].clientX);
                // move functionality 
                if(touchCordMove < touchCordStart 
                && touchCordMove > touchCordStart-btnWidth){
                    e.target.style.transform = `translateX(${touchCordMove-touchCordStart}px)`;
                }
            });

            // touch end
            touchElement.addEventListener("touchend", (e) => {
                if(touchCordMove < touchCordStart-(btnWidth / 3)){
                    // snap to child
                    e.target.style.transform = `translateX(-${btnWidth}px)`;
                } else {
                    // snap to 0
                    e.target.style.transform = "translateX(0px)";
                }
            });
        }
        
        restoreBtn.onclick = () => {
            restoreBtn.disabled = true
            localStorage.removeItem(parentElement.getAttribute("data-number"));
            parentElement.classList.add("del-animation");
            setTimeout(()=>{
                parentElement.remove();
            }, 1200);
        };

        delBtn.onclick = () => {
            delBtn.disabled = true
            localStorage[`${parentElement.getAttribute("data-number")}`] = "";
            parentElement.classList.add("del-animation");
            setTimeout(()=>{
                parentElement.remove();
            }, 1200);
        };
    };
});

function setBtnState(){
    if(!document.querySelector(".swipe-box")){
        console.log("true");
        restoreAll.style.backgroundColor = "gray";
        restoreAll.style.opacity = "0.5";
        delAll.style.backgroundColor = "gray";
        delAll.style.opacity = "0.5";
    }
}

//restore all button
const restoreAll = document.createElement("button");
restoreAll.classList.add("restore-all");
restoreAll.classList.add("restore-btn");
restoreAll.id = "restoreAll";
restoreAll.textContent = "Restore all";

//appends to DOM
swipeContainer.append(restoreAll);

//restore all functionality
restoreAll.addEventListener("click", (e)=>{

    document.querySelectorAll(`.swipe-box:not(.${e.target.classList.value})`)
    .forEach(element => {
        localStorage.removeItem(element.getAttribute("data-number"));
        element.classList.add("del-animation");
        setTimeout(()=>{
            element.remove();
            setBtnState();
        }, 1200);
    });
});

//restore all button
const delAll = document.createElement("button");
delAll.classList.add("del-all");
delAll.classList.add("del-btn");
delAll.id = "delAll";
delAll.textContent = "Delete all";

//appends to DOM
swipeContainer.append(delAll);

//restore all functionality
delAll.addEventListener("click", (e)=>{

    document.querySelectorAll(`.swipe-box:not(.${e.target.classList.value})`)
    .forEach(element => {
        localStorage[`${element.getAttribute("data-number")}`] = "";
        element.classList.add("del-animation");
        setTimeout(()=>{
            element.remove();
            setBtnState();
        }, 1200);
    });
});

setBtnState();