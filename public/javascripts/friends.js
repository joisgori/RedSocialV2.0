//console.log("friends.js");
var Globaluser = "";

fetch("/user").then(res => res.json())
    .then(data => {
        //console.log(data.local);
        Globaluser = data.local.email;
    }).catch(function(){
        window.location.href = "/";
    });
    

window.onload = () => loadContent();//app.init();

let loadContent = function(){
    let myfriends =[];
    /*fetch(`/friend/`, {
        method: 'POST',
        body: JSON.stringify({email:Globaluser}),
        headers: {
            'Content-Type': 'application/json'
        }
    })//cambiar ruta :v
    .then(res => res.json())
    .then(data => {
        //console.log(data);
        }).catch(err=>{
            console.log(err);
        });*/

fetch(`/friend/one/`+ Globaluser)//cambiar ruta :v
.then(res => res.json())
.then(data => {
    console.log(data.friends[0].friends);
    myfriends=data.friends[0].friends;

});
    let tbody = document.getElementsByClassName("contentFriends")[0];

    

    fetch(`/friend/all`)//cambiar ruta :v
    .then(res => res.json())
    .then(data => {
        //console.log(data);

        data.friends.forEach(element=>{
            //addPost(element);
            if(element.local.email!=Globaluser){
            buttonFlow(tbody,element,myfriends);}
        });
    });

    

    

        

    //console.log(tbody);
};

let buttonFlow = function(tbody, friends,myfriends){
    
    //console.log(friends.local);
    
        
    let content = document.createElement('div');content.setAttribute("class","friend");
    let user = document.createElement('span');user.setAttribute("class","email");
    let button = document.createElement('span');button.setAttribute("class","veintitre-social");
    user.innerHTML =`
    <p>${friends.local.name}</p>
    <p>${friends.local.lastname}</p>
    `;
    button.setAttribute("user-id",`${friends.local.email}`);
    buttonAction(`${friends.local.email}`,button,myfriends);
    content.appendChild(user);
    content.appendChild(button);
    tbody.appendChild(content);

};

let buttonAction = function(name, node, friends){
    if (friends.includes(name)){
        node.innerHTML = "unfollow";
        unflow(name,node);
    }
    else{
        node.innerHTML = "follow";
        flow(name,node);
    }
};

let unflow = function(name,node){
    node.addEventListener("click",function(){
        fetch('/friend/' , {
            method: 'DELETE',
            body: JSON.stringify({email:Globaluser,
                friend: name}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json()
        })
        .then(data => {
            if (data.ok) {
                node.innerHTML="follow";
                let n = node.cloneNode(true);
                node.parentNode.replaceChild(n,node);
                flow(name,n);
                alert("unfollow");
                
            } else {
                let errors = document.getElementsByClassName("errors")[0];
                errors.innerText = data.err;
            }
        });
});
};
let flow = function(name,node){
    node.addEventListener("click",function(){
        fetch('/friend/' , {
            method: 'PUT',
            body: JSON.stringify({
                email:Globaluser,
                friend: name}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json()
        })
        .then(data => {
            if (data.ok) {
                node.innerHTML="unfollow";
                let n = node.cloneNode(true);
                node.parentNode.replaceChild(n,node);
                unflow(name,n)
                alert("follow");
            } else {
                let errors = document.getElementsByClassName("errors")[0];
                errors.innerText = data.err;
            }
        });
});
};