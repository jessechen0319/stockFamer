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

    $.get("/getRecords").then((data)=>{
        console.log(_getRowWithRecords(data[0]));
        if(data.length > 0){
            data.forEach((item)=>{
                $('.gride>table').append($(_getRowWithRecords(data[0])));
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