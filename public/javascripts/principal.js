console.log("script :v");


/*let app = {
    init: function () {
        this.addEvents();
    },
    addEvents: function () {
        let loadContent = function () {
            fetch("/materia")
                .then(res => res.json())
                .then(data => {
                    let materias = document.getElementsByClassName("materias")[0];

                    materias.innerHTML = data.reduce((cadena, element) => {
                        return cadena +
                            ` <tr>
                                <td class="name">${element.nombre}</td>
                                <td class="uv">${element.uv}</td>
                                <td class="options"> 
                                    <a data-id="${element._id}" class="more" href=""> More</a>
                                    <a data-id="${element._id}" class="edit" href=""> Edit </a>
                                    <a data-id="${element._id}" class="delete" href=""> Delete </a>
                                </td>
                            </tr>`
                    }, "");

                    document.querySelectorAll(".delete").forEach(element => {
                        element.addEventListener('click', function (event) {
                            event.preventDefault();
                            let id = element.getAttribute("data-id");
                            fetch('/materia/' + id, {
                                    method: 'DELETE'
                                })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.success) {
                                        materias.removeChild(element.parentElement.parentElement);
                                    }
                                }).catch(err => {
                                    console.log(err);
                                });
                        });
                    });
                    document.querySelectorAll(".more").forEach(element => {
                        element.addEventListener('click', function (evnt) {
                            evnt.preventDefault();
                            let name = this.parentElement // td
                                .parentElement // tr
                                .getElementsByClassName("name")[0]
                                .innerText;
                            fetch('/materia/' + name)
                                .then(res => res.json())
                                .then(function (data) {
                                    console.log(data);
                                });
                        });
                    });
                    document.querySelectorAll(".edit").forEach(element => {
                        element.addEventListener('click', function (evnt) {
                            event.preventDefault();
                            let id = element.getAttribute("data-id");
                            fetch('/materia/' + id)
                                .then(res => res.json())
                                .then(data => {
                                    let form = document.forms.saveMateria;

                                    form.name.value = data.nombre;
                                    form.uv.value = data.uv;
                                    form.descripcion.value = data.descripcion;
                                    form.action = "/materia/" + data._id;
                                });
                        });

                    });

                });
        }
        let form = document.forms.saveMateria;

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            if (form.action == '/materia') {
                fetch(form.action, {
                        method: 'POST',
                        body: new URLSearchParams(new FormData(form))
                    }).then(res => res.json())
                    .then(data => {
                        console.log(data);
                        loadContent();
                    });
            } else  {
                fetch(form.action, {
                        method: 'PUT',
                        body: new URLSearchParams(new FormData(form))
                    }).then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            form.action= '/materia';
                            form.method = 'POST';
                            alert('Los dataos fuero actu... ');
                            form.uv.value = form.name.value =
                            form.descripcion.value = "";
                            loadContent();
                        }
                    });
            }
        });

        loadContent();
    }
};*/
window.onload = () => loadContentPost();//app.init();

let loadContentPost = function(){
    fetch("/posting/walther")//cambiar ruta :v
                .then(res => res.json())
                .then(data => {
                    //console.log(data);
                    data.posts.forEach(element=>{
                        addPost(element);
                    });
                });
                            

};
let loadContentCommit = function(_idpost,commitContent){
    fetch(`/commit/${_idpost}`)//cambiar ruta :v
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    data.commits.forEach(element=>{
                        addCommit(element,commitContent);
                    });
                });
                            

};



let addCommit= function (data,commitContent) {
    let commit = document.createElement('div');commit.setAttribute("class","commit");
    commit.setAttribute("commit_id",`${data._id}`);
    commit.innerHTML = `
                <p>${data.username}</p>
                <p>${data.commit}</p>
`;
commitContent.appendChild(commit);
}

let addPost= function (data) {
    let commitContent = document.createElement('section');commitContent.setAttribute("class","content_commit");
    let postContent = document.createElement('article');postContent.setAttribute("class","content_post","post_id",`${data._id}`);
    postContent.setAttribute("post_id",`${data._id}`);
    postContent.innerHTML = `
                <p>${data.username}</p>
                <p>${data.post}</p>
                <section class="reaction_post">
                    <button class="btn_like">like</button>
                    <button class="btn_disklike">dislike</button>
                    <button class="btn_commit">commit</button>
                </section>
`;
    commitContent.innerHTML = `
                <h2>comments</h2>
`;
    postContent.appendChild(commitContent);
    let tbody = document.getElementsByClassName("content")[0];
    tbody.appendChild(postContent);
    loadContentCommit(data._id,commitContent);

}
















/*
    let addEvents = () => {
        // Delete
        document.querySelectorAll(".delete").forEach(element => {
            element.addEventListener("click", function (event) {
                event.preventDefault();
                let id = element.parentElement.parentElement.getElementsByClassName("id")[0].innerText;
                fetch('/users/' + id, {
                        method: 'DELETE'
                    }).then(res => res.json())
                    .then(data => {
                        if (data.ok) {
                            let tbody = document.getElementsByClassName("listUsers")[0];
                            tbody.removeChild(element.parentElement.parentElement);
                        } else {
                            let errors = document.getElementsByClassName("errors")[0];
                            errors.innerText = data.err.message;
                        }
                    })

            });
        });

        // Update
        document.querySelectorAll(".update").forEach(element =>{
            element.addEventListener('click', function(event){
                event.preventDefault();
                let old = element.parentElement.parentElement;
                let tr = document.createElement('tr');
                tr.innerHTML = `<form>
                                    <td class="id">
                                        <input type="text" name="id" readonly value ="id">
                                    </td>
                                    <td>
                                        <input type="text" name="username">
                                    </td>
                                    <td>
                                        <input type="text" name="name">
                                    </td>
                                    <td>
                                        <input type="text" name="lastname">
                                    </td>
                                    <td> <input type="submit" value="Save"> </td>
                                </form>`;
                tbody.replaceChild(tr,old);
            });
        });
    }
    addEvents();
}
*/

/*<article class="content_post">
                <p>@Username</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem laudantium ratione provident minima numquam, voluptates optio itaque recusandae illum animi impedit ducimus neque, nesciunt, cupiditate unde vero inventore iusto esse?
                Incidunt praesentium voluptatum vel. Nisi corrupti culpa itaque cum eaque eligendi. Dolorum excepturi necessitatibus est dolorem sequi sit quae minima odio rem et veritatis nemo, ut ex ullam atque corrupti?
                Soluta, ea ut! Qui sequi aperiam alias nisi assumenda temporibus rem voluptatibus cupiditate voluptatem commodi praesentium quasi sit a excepturi, ducimus nulla. Harum corporis incidunt facilis ratione aliquam, itaque laboriosam?
                Culpa ullam cum iusto doloremque fuga ad nesciunt distinctio, ipsam quas accusantium a ducimus velit laborum? Suscipit, voluptates dolores id ducimus harum minus ad placeat magnam fuga hic. Dicta, ea.
                Neque voluptatem unde architecto enim maxime repellat facilis rem commodi est fuga exercitationem, amet perspiciatis temporibus similique explicabo! Quam eveniet similique iste reiciendis assumenda incidunt sapiente laudantium nulla, eligendi suscipit!
                Libero sit doloribus qui delectus dolor unde est assumenda deleniti tempora blanditiis, quisquam officia nostrum maiores sapiente amet fugit quo quibusdam molestiae, corporis eum, nulla nesciunt magnam. Modi, impedit consequuntur.</p>
                <section class="reaction_post">
                    <button>like</button>
                    <button>dislike</button>
                    <button>commit</button>
                </section>
                <section class="content_commit">
                    <h2>comments</h2>
                    
                    <div class="commit"><!--commit content-->
                        <p>@usenameCommit</p>
                        <p>commit...... Lorem ipsum dolor sit amet consectetur adipisicing elit. Et aliquid enim praesentium, a commodi deleniti exercitationem eos quae mollitia velit quia provident sint! Rerum aspernatur eligendi, hic placeat aliquam perspiciatis!</p>
                        <button>commiting</button><!--crea un commiting al presionarlo-->
                    </div>

                    <div class="commiting"><!--commit input content-->
                        <input type="text">
                        <button>commit</button>
                    </div>
                    
                </section>
            </article>*/