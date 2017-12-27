import { Component } from '@angular/core';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  list: any[];

  constructor() {

    // 爬取百度图片首页最热列表
    this.list = [];
    var url = encodeURIComponent('http://image.baidu.com/search/acjson?tn=resultjson_com&catename=pcindexhot&ipn=rj&ct=201326592&is=&fp=result&queryWord=&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&word=pcindexhot&face=0&istype=2&qc=&nc=1&fr=&pn=0&rn=30')
    this.paQuUrl(url)
  }

  // 爬取地址图片数据
  paQuUrl(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost:3000/paqu?url='+url, true)
    xhr.onreadystatechange = ()=>{
      if(xhr.status == 200 && xhr.readyState == 4){
        var data = JSON.parse(xhr.responseText)
        if(data.success){
          this.list = data.data;
          var arr = data.data;
          this.list = arr.map(element => {
            if(element.middleURL){
              var ar = element.middleURL.split('/')
              element.img = 'http://localhost:3000/'+ar[ar.length-1]
            }
            return element
          });
        }
      }
    }
    xhr.send(null)
  }
}
