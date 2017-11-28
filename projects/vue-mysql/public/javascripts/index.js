window.onload = function(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = a;
    xhr.open('post', '/json', true);
    xhr.send(JSON.stringify({id:1}));
}
