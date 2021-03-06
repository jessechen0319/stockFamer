(function($){

    function _getRowWithRecords(data){
        let finalObject = {
            beginer: false,
            hasProfile: false,
            dropIt: false
        };
        if(data.current == 0){
            finalObject.beginer = true;
        } else {
            if(data.current > data.price){
                finalObject.hasProfile = true;
            }
            if(data.current < data.dropLine){
                finalObject.dropIt = true;
            }
        }
        let stock = `<td class="stock-name">${data.stock}</td>`;
        let title = '';
        if(finalObject.beginer){
            title = `<td class="icon begainer"><img src="/images/刚种上.png"></td>`;
        } else {
            title = `<td class="icon normal"><img src="/images/正常走势.png"></td>`;
        }

        if(finalObject.dropIt){
            title = `<td class="icon drop"><img src="/images/蔫了_让出土地.png"></td>`;
        }
        let profite = (data.current - data.price)/data.price;
        let profile = '<td class="profit" message="'+(profite*100).toFixed(2)+'%">暂无收益</td>';
        if(finalObject.hasProfile){
            profile = '<td class="profit withprofit" message="'+(profite*100).toFixed(2)+'%"><img message="'+(profite*100).toFixed(2)+'%" src="/images/果实.png"></td>';
        }
        
        if(profite > 0.05 && !finalObject.beginer){
            title = `<td class="icon money"><img src="/images/硕果累累.png"></td>`;
        }
        let head = `<td class="isHaveHead">干干净净</td>`;
        if(data.isHeaderHappened){
            head = `<td class="isHaveHead confirmwithhead"><img src="/images/有虫.png"></td>`;
        }

    let html = `<tr class="row">${stock}${title}${profile}${head}<td><div class="common-button button-red">放入历史</div></td></tr>`;
        
        return html;
        
    }

    $.get("/getRecords_jesse").then((data)=>{
        console.log(_getRowWithRecords(data[0]));
        if(data.length > 0){
            data.forEach((item)=>{
                $('.gride>table').append($(_getRowWithRecords(item)));
            })
        }
    });
   
})($);

$(document).on('click', '.profit', function(event){
    console.log(event);
    let profit = $(event.target).attr('message');
    $(".message").text(`your profit is ${profit}`);
    $(".message").fadeIn(1000);
    setTimeout(function(){$(".message").fadeOut(1000);}, 1000);
});

$(document).on('click', '.add-new-record', function(){
    $(".new-record").fadeIn();
});

$(document).on('click', '.new-record .close', function(){
    $(".new-record").fadeOut();
});

$(document).on('click', '.new-record .submit', function(){
    let stock = $('.new-record>input[name=stock]').val();
    let price = $('.new-record>input[name=price]').val();
    let enterDate = $('.new-record>input[name=enterDate]').val();
    let dropLine = $('.new-record>input[name=dropLine]').val();
    if(!stock||stock.trim()==''){
        return;
    }
    if(!price||price.trim()==''||isNaN(Number(price))){
        return;
    }
    if(!enterDate||enterDate.trim()==''){
        return;
    }
    if(!dropLine||dropLine.trim()==''||isNaN(Number(dropLine))){
        return;
    }

    let obj = {
        stock:stock,
        price:price,
        enterDate: enterDate,
        dropLine:dropLine
    };

    $.get('newRecord_jesse', obj).then(function(result){
        console.log(result);
        $(".new-record").fadeOut();
        location.href = location.href;
    });

});