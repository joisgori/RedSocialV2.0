var Globaluser = "";
let myfriends=[];

fetch("/user").then(res => res.json())
    .then(data => {
        //console.log(data.local);
        Globaluser = data.local.email;
        fetch(`/friend`,{method:"POST",
        body: JSON.stringify({email:Globaluser}),
        headers: {
            'Content-Type': 'application/json'
        }
}).catch(err=>{console.log(err);})
        fetch(`/friend/one/`+ Globaluser)//cambiar ruta :v
        .then(res => res.json())
        .then(data => {
        //console.log(data.friends[0].friends);
        myfriends=data.friends[0].friends;});
    }).catch(function(){
        window.location.href = "/";
    });

window.onload = () => loadContentPost();//app.init();

/*let loadUser= function(){
    fetch("/user").then(res => res.json())
    .then(data => {
        console.log(data.local);
        Globaluser = data.local.email;
        loadContentPost()
    });
}*/

let loadContentPost = function(){
    
    
    //sessionStorage.append('a');
    
    //console.log(Globaluser + "23");
    addPostEvent();
    //addPostEventUpdate();
    

//myfriends.unshift(Globaluser);

//console.log(myfriends);
myfriends.forEach(ele=>{
    fetch(`/posting/${ele}`)//cambiar ruta :v
                .then(res => res.json())
                .then(data => {
                    //console.log(data);

                    data.posts.forEach(element=>{
                        addPost(element);
                    });
                });
                            

});};
let loadContentCommit = function(_idpost,commitContent){
    fetch(`/commit/${_idpost}`)//cambiar ruta :v
                .then(res => res.json())
                .then(data => {
                    //console.log(data);
                    data.commits.forEach(element=>{
                        addCommit(element,commitContent);
                    });
                });
                            

};



let addCommit= function (data,commitContent) {
    let commit = document.createElement('div');commit.setAttribute("class","commit");
    commit.setAttribute("commit_id",`${data._id}`);
    commit.innerHTML = `
            <div class="commit_data_user">
                <p>${data.username}</p>
            </div>
            <p>${data.commit}</p>  `;
    commitContent.appendChild(commit);
}

let addPost= function (data) {
    let commitContent = document.createElement('section');commitContent.setAttribute("class","content_commit");
    let commitButton = document.createElement('button');commitButton.setAttribute("class","btn_commit");
    let postContent = document.createElement('article');postContent.setAttribute("class","content_post");postContent.setAttribute("post_id",`${data._id}`);
    postContent.setAttribute("post_id",`${data._id}`);
    postContent.innerHTML = `
                <div class="post_data_user">
                <p>${data.username}</p>
                </div>
                <p>${data.post}</p>
                <section class="reaction_post">
                    <button class="btn_like" > <span name="like" id="like" class="like" like="1">${data.likes}</span>  like</button>
                    <button class="btn_dislike" ><span name="dislike" class="dislike" like="1">${data.dislikes}</span>  dislike</button>
                </section>`;  

    
    commitContent.innerHTML = `
                <h2>Comentarios</h2>`;
    commitButton.innerText="agregar un nuevo comentario";
    commitContent.appendChild(commitButton);
    postContent.appendChild(commitContent);
    let tbody = document.getElementsByClassName("content")[0];
    tbody.appendChild(postContent);
    //console.log(postContent.lastChild.previousSibling);
    addCommitEvent(commitButton);
    //if (data.id)   ----------validar mi post
    loadContentCommit(data._id,commitContent);
    if(data.username==Globaluser){
    eliminarPostPersonal(postContent);
    updatePostPersonal(postContent);}
    reactionPost(postContent);

}

let addCommitEvent=function(node){
    node.addEventListener("click",function() {
        let modal = document.createElement('div');modal.setAttribute("class","modal");modal.setAttribute("id","myModal");
        let close = document.createElement('span');close.setAttribute("class","close-modal");
        let modalContent = document.createElement('div');modalContent.setAttribute("class","modal-content");
        
        
        modal.appendChild(modalContent);
        modalContent.appendChild(close);
        close.innerText = "X";
        addCommitContenModel(modalContent);
        let tbody = document.getElementsByClassName("content")[0];
        //console.log(node.parentElement);
    node.parentElement.appendChild(modal);
    modal.style.display = "block";
    close.onclick = function(){
        node.parentElement.removeChild(modal);
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            node.parentElement.removeChild(modal);
        }
    }
    });
}


let addCommitContenModel = function(node){
    let commit = document.createElement('input');
    commit.setAttribute("type","text");commit.setAttribute("name","commit");commit.setAttribute("class","commit");
    let save = document.createElement('button');
    save.setAttribute("class","save_commit");
    save.innerText = "Commit";
    node.appendChild(commit);
    node.appendChild(save);
    save.addEventListener("click",savecommitEvent);
    
}

let addPostContenModel = function(node){
    let commit = document.createElement('input');
    commit.setAttribute("type","text");commit.setAttribute("name","post");commit.setAttribute("class","post");
    let save = document.createElement('button');
    save.setAttribute("class","save_post");
    save.innerText = "postear";
    node.appendChild(commit);
    node.appendChild(save);
    save.addEventListener("click",savepostEvent);
    
}

let addPostContenModelUpdate = function(node){
    let commit = document.createElement('input');
    commit.setAttribute("type","text");commit.setAttribute("name","post");commit.setAttribute("class","post");
    let save = document.createElement('button');
    save.setAttribute("class","save_post");
    save.innerText = "postear";
    node.appendChild(commit);
    node.appendChild(save);
    save.addEventListener("click",updatepostEvent);
    
}

let savecommitEvent = function(){
    let tbody = document.getElementsByClassName("modal")[0];
    //console.log(tbody.getElementsByClassName("commit")[0].value);
    //console.log(tbody.parentElement.getAttribute("post_id"));

    let data = {
        username: `${Globaluser}`,
        commit: tbody.getElementsByClassName("commit")[0].value,
        _idpost: tbody.parentElement.parentElement.getAttribute("post_id")
    };
    fetch('/commit', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.json()
    })
    .then(data => {
        if (data.ok) {
            console.log(data.insertado,tbody.parentElement.lastElementChild);
            addCommit(data.insertado,tbody.parentElement);
            let modal = document.getElementsByClassName("modal")[0];
            modal.parentElement.removeChild(modal);
        } else {
            let errors = document.getElementsByClassName("errors")[0];
            errors.innerText = data.err;
        }
    });
}

let savepostEvent = function(){
    let tbody = document.getElementsByClassName("modal")[0];
    //console.log(tbody.getElementsByClassName("post")[0].value);
    //console.log(tbody.parentElement.getAttribute("post_id"));

    let data = {
        username: `${Globaluser}`,
        post: tbody.getElementsByClassName("post")[0].value,
        likes:0,
        dislikes:0
    };
    console.log(data);
    fetch('/posting', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.json()
    })
    .then(data => {
        if (data.ok) {
            //console.log(tbody.parentElement.lastElementChild.previousSibling);
            let modal = document.getElementsByClassName("modal")[0];
            modal.parentElement.removeChild(modal);
            addPost(data.insertado);
        } else {
            let errors = document.getElementsByClassName("errors")[0];
            //errors.innerText = 
            console.log(data.err);
        }
    });
}

let addPostEvent=function(){
    let node = document.getElementsByClassName("post-btn")[0];
    node.addEventListener("click",function() {
        let modal = document.createElement('div');modal.setAttribute("class","modal");modal.setAttribute("id","myModal");
        let close = document.createElement('span');close.setAttribute("class","close-modal");
        let modalContent = document.createElement('div');modalContent.setAttribute("class","modal-content");
        
        
        modal.appendChild(modalContent);
        modalContent.appendChild(close);
        close.innerText = "X";
        addPostContenModel(modalContent);
        //let tbody = document.getElementsByClassName("content")[0];
        //console.log(node.parentElement);
    node.parentElement.parentElement.appendChild(modal);
    modal.style.display = "block";
    close.onclick = function(){
        node.parentElement.parentElement.removeChild(modal);
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            node.parentElement.parentElement.removeChild(modal);
        }
    }
    });
}





let eliminarPostPersonal = function(node){
    let close = document.createElement('button');close.setAttribute("class","delete-post");
    close.innerText = "eliminar este post";
    node.appendChild(close);
    close.addEventListener("click", function (event) {
        console.log(node);
        let id = node.getAttribute("post_id");
        fetch('/posting/' + id, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    node.parentElement.removeChild(node);
                    
                }
            }).catch(err => {
                console.log(err);
            });
    });
}

let updatepostEvent = function(){
    let tbody = document.getElementsByClassName("modal")[0];
    console.log(tbody.parentElement.getElementsByClassName("like")[0]);
    let data = {
        username: `${Globaluser}`,
        post: tbody.getElementsByClassName("post")[0].value,
        likes: Number(tbody.parentElement.getElementsByClassName("like")[0].innerText),
        dislikes: Number(tbody.parentElement.getElementsByClassName("dislike")[0].innerText)
    };
    let id = tbody.parentElement.getAttribute("post_id");
    fetch('/posting/' + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.json()
    })
    .then(data => {
        if (data.ok) {
            console.log(tbody.parentElement.getElementsByClassName("like")[0].innerText);
            tbody.parentElement.getElementsByClassName("post_data_user")[0].nextElementSibling.innerText = data.update.post;
            tbody.parentElement.removeChild(tbody);
        } else {
            let errors = document.getElementsByClassName("errors")[0];
            errors.innerText = data.err;
        }
    });
}

let updatePostPersonal = function(node){
    let update = document.createElement('button');update.setAttribute("class","delete-post");
    update.innerText = "actualizar este post";
    node.appendChild(update);
    update.addEventListener("click",function() {
        let modal = document.createElement('div');modal.setAttribute("class","modal");modal.setAttribute("id","myModal");
        let close = document.createElement('span');close.setAttribute("class","close-modal");
        let modalContent = document.createElement('div');modalContent.setAttribute("class","modal-content");
        
        
        modal.appendChild(modalContent);
        modalContent.appendChild(close);
        close.innerText = "X";
        addPostContenModelUpdate(modalContent);
        //let tbody = document.getElementsByClassName("content")[0];
        //console.log(node.parentElement);
    node.appendChild(modal);
    modal.style.display = "block";
    close.onclick = function(){
        modal.parentElement.removeChild(modal);
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.parentElement.removeChild(modal);
        }
    }
    });
}



let reactionPost = function(node){
    let like = node.getElementsByClassName("btn_like")[0];
    let likes = like.getElementsByClassName("like")[0];
    let dislike = node.getElementsByClassName("btn_dislike")[0];
    let dislikes = dislike.getElementsByClassName("dislike")[0];
    like.addEventListener("click",function(){
        //console.log(Number(likes.innerText) + 1);
        let flag=Number(likes.getAttribute("like"));
        //console.log(likes);
        let data = {
            post:like.parentElement.previousElementSibling.innerText,
            likes: Number(likes.innerText) + flag,
            dislikes:Number(dislikes.innerText)
            
        };
        if(flag==1){
            likes.setAttribute("like","0");
        }
        update(data);
    });

    dislike.addEventListener("click",function(){
        //console.log(like.parentElement.previousElementSibling.innerText);
        let flag=Number(dislikes.getAttribute("like"));
        let data = {
            post:like.parentElement.previousElementSibling.innerText,
            likes: Number(likes.innerText),
            dislikes:Number(dislikes.innerText) + flag
        };
        if(flag==1){
            dislikes.setAttribute("like","0");
        }
        update(data);
    });


    let update = function(data){
        //console.log(data);
    let id = node.getAttribute("post_id");
    //console.log(node);
    fetch('/posting/' + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.json()
    })
    .then(data => {
        if (data.ok) {
            //console.log(tbody.parentElement.lastElementChild.previousSibling)
            dislikes.innerText = data.update.dislikes;
            likes.innerText = data.update.likes;
        } else {
            let errors = document.getElementsByClassName("errors")[0];
            errors.innerText = data.err;
        }
    });}
}



