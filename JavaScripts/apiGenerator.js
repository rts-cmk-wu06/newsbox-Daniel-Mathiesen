axios("https://api.nytimes.com/svc/archive/v1/2019/1.json?api-key=2LltgBkOQ8xwCTl7BKyOeMUCBRfkD5oy")
.then(arr => {
    
    let data = arr.data.response.docs.splice(0,100);

    
    for (var i = 0; i < data.length-data.length+12; i++){
        
        // console.log(data[i].section_name);
        let detailsContainer = document.getElementById('details__container');
        let summary = document.getElementById(data[i].section_name+'Section')
        let details = document.getElementById(data[i].section_name);
        
        if(!details){    
            
            detailsContainer.appendChild(document.createElement('details')).setAttribute('id',data[i].section_name);
            
            details = document.getElementById(data[i].section_name);
            
            details.appendChild(document.createElement('summary')).setAttribute('id',data[i].section_name+'Section')
        
            summary = document.getElementById(data[i].section_name+'Section')
            
            summary.setAttribute('class','news__category BorderColor')
            summary.appendChild(document.createElement('div')).setAttribute('id','icon-text'+i)
            summary.appendChild(document.createElement('i')).setAttribute('class','fas fa-chevron-down HeaderIconColors-H')

            var iconText = document.getElementById('icon-text'+i);

            iconText.setAttribute('class', 'Category_icon__name')
            iconText.appendChild(document.createElement('div')).setAttribute('id','icon_circle'+i);
            iconText.appendChild(document.createElement('h3')).setAttribute('id','summary_h3'+i);

            var iconCircle = document.getElementById('icon_circle'+i);
            var summaryH3 = document.getElementById('summary_h3'+i);

            iconCircle.setAttribute('class','IconCircle');
            summaryH3.setAttribute('class','HeaderIconColors-H');

            iconCircle.appendChild(document.createElement('i')).setAttribute('class','far fa-clone')
            summaryH3.innerHTML=data[i].section_name;
        };




            
            
            var newsSection = document.getElementById(data[i].section_name);
            


            newsSection.appendChild(document.createElement('a')).setAttribute('id','sport'+i);
            
            var article = document.getElementById('sport'+i);
            
            article.setAttribute('href',data[i].web_url)
            article.setAttribute('class','News__content BorderColor');
            article.appendChild(document.createElement('div')).setAttribute('id','sportImg'+i);
            article.appendChild(document.createElement('div')).setAttribute('id','sportText'+i);
            
            var articleText = document.getElementById('sportText'+i);
            var articleImg = document.getElementById('sportImg'+i);
            
            articleText.setAttribute('class', 'News__content_text HeaderIconColors-H')
            articleImg.setAttribute('class', 'News__content_img')
            
            
            if(data[i].multimedia.length>0){
                articleImg.style.backgroundImage=`url("https://static01.nyt.com/${data[i].multimedia[0].legacy.xlarge}")`;
            }else{
                articleImg.style.backgroundImage='url("https://static01.nyt.com/vi-assets/images/share/1200x1200_t.png")'
            }
            
            
            
            articleText.appendChild(document.createElement('h5')).setAttribute('id','News__h5'+i);
            articleText.appendChild(document.createElement('p')).setAttribute('id','News__p'+i);
            
            var h5 = document.getElementById('News__h5'+i)
            var p = document.getElementById('News__p'+i)
            
            h5.innerHTML=data[i].headline.main;
            p.innerHTML=data[i].abstract;
            
            
        };
        

        
        
    });
