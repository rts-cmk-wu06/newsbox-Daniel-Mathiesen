const swipeContainer = document.querySelector("#swipe-container");
axios("https://jsonplaceholder.typicode.com/users")
.then(res => {
    let arr = [];
    Object.keys(localStorage).forEach(key => {arr.push(key)});
    res.data.forEach(user => {
        if(!arr.includes(user.id.toString())){
            //swipe box element
            let swipeBox = document.createElement("div");
            swipeBox.classList.add("swipe-box");
            swipeBox.setAttribute("data-number", user.id);

            //del button icon element
            let delIcon = document.createElement("i");
            delIcon.classList.add("fas");
            delIcon.classList.add("fa-inbox");

            //del button element
            let delBtn = document.createElement("button");
            delBtn.classList.add("del-btn");
            delBtn.append(delIcon);

            //swipe text element
            let swipeText = document.createElement("p");
            swipeText.classList.add("swipe-text");
            swipeText.textContent = user.name;

            //appends to DOM
            swipeBox.append(delBtn);
            swipeBox.append(swipeText);
            swipeContainer.append(swipeBox);
        }
    });
});

swipeContainer.addEventListener("touchstart", (e)=>{
    if(e.target.classList.contains("swipe-text")){
        let touchElement = e.target;
        let parentElement = touchElement.closest(".swipe-box");
        let touchCordStart = Math.floor(e.touches[0].clientX);
        let touchCordMove;
        let delBtn = parentElement.querySelector(".del-btn");
        let btnWidth = delBtn.offsetWidth;

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
        
        delBtn.onclick = () => {
            delBtn.disabled = true;
            let userObj = {
                id: parentElement.getAttribute("data-number"),
                name: parentElement.querySelector(".swipe-text").textContent
            }
            localStorage[`${userObj.id}`] = JSON.stringify(userObj);
            parentElement.classList.add("del-animation");
            parentElement.style.pointerEvents = "none";
            setTimeout(()=>{
                parentElement.remove();
                
            }, 1200);
        };
    };
});