window.onload = function(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = a;
    xhr.open('post', '/json', true);
    xhr.send(JSON.stringify({id:1}));

    function a(){
        if(xhr.readyState==4 && xhr.status==200)
        console.log(JSON.parse(xhr.responseText))
    }
}
