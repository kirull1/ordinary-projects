function getmeal() {
    let data = localStorage.getItem('id');
    return data === null ? [] : data.split(',').filter(el => el.length != 0);
}

function cheakmeal(id) {
    return getmeal().indexOf(String(id)) !== -1 ? true : false;
}

function addmeal(id) {
    let data = getmeal();
    data.push(id)
    localStorage.setItem('id', data.join(',')); 
}

function deletemeal(id) {
    localStorage.setItem('id', getmeal().filter(el => el != String(id)));
}

function add_block(data){
    $('.main').append('<div class="main_content"><a data="'+data['idMeal']+'" id="content">' + (Math.floor(Math.random() * 10) == 1 ? '<div class="special"><span class="special_text">Recipe of the day.</span></div>' : '') + '<img class="main_content_img" src="' + data["strMealThumb"] + '"></a><div class="main_content_block"><a data="'+data['idMeal']+'" id="content" class="main_content_text">' + data['strMeal'] + '</a><img id="'+data['idMeal']+'" class="main_content_wish ' + (cheakmeal(data['idMeal']) ? 'wish_active' : 'wish_not_active') + '" src="assets/image/' + (cheakmeal(data['idMeal']) ? 'heart-full.png' : 'heart.png') + '"></div></div>');
}

function liked_content(){
    getmeal().forEach(function(el){
        $.get("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + el, function(data) {
            if(data){
                add_block(data['meals'][0]);
            }
        });
    })
}

function main(){
    for(let i=0;i<6;i++){
        $.get("https://www.themealdb.com/api/json/v1/1/random.php", function(data) {
            data = data['meals'][0];
            $('.event').append('<a data="'+data['idMeal']+'" id="content"><div class="block_event"><img class="event_img" src="' + data["strMealThumb"] + '"><div class="back-fon"></div><span class="event_text">' + data['strMeal'] + '</span></div></a>');
        });
    }
    
    for(let i=0;i<20;i++){
        $.get("https://www.themealdb.com/api/json/v1/1/random.php", function(data) {
            add_block(data['meals'][0]);
        });
    }   
}

function search(val) {
    $.get('https://www.themealdb.com/api/json/v1/1/search.php?s=' + val, function(data){
        data['meals'].forEach(el => {
            add_block(el);
        }); 
     });
}

function recipe(id) {
    $.get("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id, function(data) {
        data = data['meals'][0];
        $('h1').html(data['strMeal']);
        $('.main_page_img').attr('src', data['strMealThumb']);
        $('.method').html(data['strInstructions']);
        for(let i=1;i<=20;i++){
            if(data['strIngredient' + i]){
                $('.Ingredients').append(i + '. ' + data['strIngredient' + i] + ' - ' + data['strMeasure' + i] + '<br>');
            }else break;
        }
    });
}

function menu_close() {
    $('.menu_full').removeClass('menu_full_active'); 
    $('section').css({'overflow-y' : 'scroll'});
    $('body').css({'overflow-y' : 'scroll'});
}

function menu_search_close() {
    $('.form').animate({left : '500%'}, 1000, "linear", function(){
        $('.form').css({'display' : 'none'});
        $('#loupe').css({'display' : 'block'});
        $('#menu').css({'display' : 'block'});
    });
}

$(document).on('click', '.main_content_wish', function(){
    const id = $(this).attr('id');
    if($(this).hasClass('wish_active')){
        deletemeal(id);
        $(this).removeClass('wish_active').addClass('wish_not_active').attr('src', 'assets/image/heart.png');
    }else{
        addmeal(id);
        $(this).removeClass('wish_not_active').addClass('wish_active').attr('src', 'assets/image/heart-full.png');
    }
});

$('#menu').click(function(){
   $('.menu_full').addClass('menu_full_active'); 
   $('section').css({'overflow-y' : 'hidden'})
   $('body').css({'overflow-y' : 'hidden'})
});

$('.menu_full_img').click(menu_close);

$('#loupe').click(function(){
    $('#loupe').css({'display' : 'none'});
    $('#menu').css({'display' : 'none'});
    $('.form').css({'display' : 'block'});
    $('.form').animate({left : '0'});
});

$('.menu_search_close').click(menu_search_close);

$('.menu_search_loupe').click(function(){   
    const input = $('.menu_search').val();  
    $('.event').empty();
    $('.main').empty();
    $('.event_title').html(input);
    search(input);
    menu_search_close();
});

$('#liked').click(function(){
    $('.event').empty();
    $('.main').empty();
    $('.event_title').html('Liked');
    liked_content();
    menu_close();
});

$('#main').click(function(){
    $('.event').empty();
    $('.main').empty();
    $('.event_title').html('Event recipe');
    main();
    menu_close();
});

$(document).on('click', '#content', function(){
    recipe($(this).attr('data'));
    $('.recipe').show();
    setTimeout(function(){
        $('.recipe').css({'transform' : 'translateX(0)'});
    }, 1);
    $('#main_section').css({'overflow-y' : 'hidden'})
    $('body').css({'overflow-y' : 'hidden'})
});

$('#back').click(function(){
    $('.recipe').css({'transform' : 'translateX(105%)'});
    $('#main_section').css({'overflow-y' : 'scroll'})
    $('body').css({'overflow-y' : 'scroll'})
    setTimeout(function(){
        $('.recipe').hide();
    }, 320);
    $('.Ingredients').empty();
});

main();