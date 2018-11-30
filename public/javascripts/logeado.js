fetch("/user").then(res => res.json())
    .then(data => {
        
        fetch(`/friend/one/`+ Globaluser)//cambiar ruta :v
        .then(res => res.json())
        .then(data => {
        //console.log(data.friends[0].friends);
        console.log(":v");});
    }).catch(function(){
        window.location.href = "/";
    });