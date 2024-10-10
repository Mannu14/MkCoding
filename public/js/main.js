//  useless for Me 
(function($){
    "use strict";
    var fullHeight = function(){
        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function(){
            $('.js-fullheight').css('height',$(window).height());
        });
    }
    fullHeight();

    $('#sidebarCollapse').on('click', function(){
        $('#sidebar').toggleClass('active');
    });
})(jQuery);
//  End 
//  Start Multi-dynamic Chat App Script
function getCookie(name){
    console.log(name);
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')+ "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

// dashboard script 
// var userData = JSON.parse(getCookie('user'));

// const userDatas = localStorage.getItem('user');
// let userData = JSON.parse(userDatas);
// console.log("userData",userData._id);

document.addEventListener("DOMContentLoaded", function() {
    let userData;
    const userDatas = localStorage.getItem('user');
    userData = JSON.parse(userDatas);
    console.log("userData",userData._id);
    userData ? userData._id : null;
    
    
    var sender_id = userData._id;

console.log('Sender ID:', sender_id);
var receiver_id;
var global_group_id;
var socket = io('/user-namespace',{
auth:{
    token: userData._id
}
});

$(document).ready(function(){
    $('.user-list').click(function(){

        var userId = $(this).attr('data-id');
        receiver_id = userId;
        console.log(userId);

        $('.start-head').hide();
        $('.chat-section').show();

        socket.emit('existsChat', { sender_id:sender_id,receiver_id:receiver_id});
    })
});

// update user online status
socket.on('getOnlineUser', function(data){
    $('#'+data.user_id+'-status').text('Online');
    $('#'+data.user_id+'-status').removeClass('offline-status');
    $('#'+data.user_id+'-status').addClass('online-status');
});

// update user offline status
socket.on('getOfflineUser', function(data){
    $('#'+data.user_id+'-status').text('Offline');
    $('#'+data.user_id+'-status').removeClass('online-status');
    $('#'+data.user_id+'-status').addClass('offline-status');
});

// chat save of user
$('#chat-form').submit(function(event){
    event.preventDefault();
    var message = $('#message').val();
    $.ajax({
        type:'POST',
        url:'/save-chat',
        data:{sender_id:sender_id, receiver_id:receiver_id,message:message},
        success:function(response){
            if(response.success){ 
                $('#message').val('');
                var date = new Date(response.data.createdAt);
                let cDate = date.getDate();
                let cMonth = (date.getMonth()+1) > 9 ? (date.getMonth()+1):'0'+(date.getMonth()+1);
                let cYear = date.getFullYear();
                let getFullDate = cDate+'-'+cMonth+'-'+cYear;

                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
                let day_night = "AM";

                if(hours > 12){
                    day_night = "PM";
                    hours = hours - 12;
                }
                if(hours < 10){
                    hours = "0" + hours;
                }
                if(minutes < 10){
                    hours = "0" + minutes;
                }
                if(seconds < 10){
                    seconds = "0" + seconds;
                }
                let currentTime = hours + ":" + minutes + ":" + seconds + " " + day_night;


                let chat = response.data.message;  // from userController.js => data = newChat
                console.log(chat);
                let html = `<div class="current-user-chat" id="`+response.data._id+`">
                                <h5> <span>`+chat+`</span>
                                    <i class="fa fa-trash" area-hidden="true" data-id="`+response.data._id+`" data-toggle="modal" data-target="#deleteChatModal"></i>    
                                    <i class="fa fa-edit" area-hidden="true" data-id="`+response.data._id+`" data-msg='`+chat+`' data-toggle="modal" data-target="#editChatModal"></i>    
                                </h5>
                                <p id="classDateORtime">`+getFullDate+`,`+currentTime+`</p>
                            </div>`;
                $('#chat-container').append(html);
                socket.emit('newChat',response.data);
                scrollChat();
            }else{
                alert(data.msg);
            }
        }
    });
});

socket.on('loadNewChat',function(data){
    var date = new Date(data.createdAt);
    let cDate = date.getDate();
    let cMonth = (date.getMonth()+1) > 9 ? (date.getMonth()+1):'0'+(date.getMonth()+1);
    let cYear = date.getFullYear();
    let getFullDate = cDate+'-'+cMonth+'-'+cYear;

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let day_night = "AM";

    if(hours > 12){
        day_night = "PM";
        hours = hours - 12;
    }
    if(hours < 10){
        hours = "0" + hours;
    }
    if(minutes < 10){
        hours = "0" + minutes;
    }
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    let currentTime = hours + ":" + minutes + ":" + seconds + " " + day_night;

    console.log(data.message);
    
    if(sender_id == data.receiver_id && receiver_id == data.sender_id){
        playMessageSound()
    let html = `<div class="distance-user-chat" id="`+data._id+`">
                     <h5><span>`+data.message+`</span></h5>
                     <p id="classDateORtime">`+getFullDate+`,`+currentTime+`</p>
                </div>`;
    $("#chat-container").append(html);
    }
    scrollChat();
});
const messageSound = document.getElementById("messageSound");
function playMessageSound() {
    // Play the sound
    messageSound.play();
}
$(document).ready(function() {
    $('.list-group-item').on('click', function() {
    // Get the data-id attribute of the clicked user list item
    const lis = document.querySelectorAll('.list-group-item');
    var userId = $(this).data('id');

    isSelectedtrue = userId==receiver_id_chats || userId == sender_id_chats
    // console.log(isSelectedtrue);

    if(isSelectedtrue){
        $('#' + userId).addClass('selected-user-chat');
    }

    lis.forEach(function (li) {
        isSelected = li.classList.contains('selected-user-chat')
        if(!isSelectedtrue & isSelected){
            $(li).removeClass('selected-user-chat');
        }
    })
    // console.log("userId : ",userId);
    });
});

let sender_id_chats={};
let receiver_id_chats={};

// load old chats
socket.on('loadChats', function(data){
    $('#chat-container').html('');
    var chats = data.chats;
    sender_id_chats = chats[0]['sender_id']
    receiver_id_chats = chats[0]['receiver_id']
    let html = "";
    for(let x = 0; x<chats.length;x++){
        let addClass = '';
        if(chats[x]['sender_id'] == sender_id){
            addClass = 'current-user-chat';
        }else{
            addClass = 'distance-user-chat';
        }  
        
        var date = new Date(chats[x]['createdAt']);
                        let cDate = date.getDate();
                        let cMonth = (date.getMonth()+1) > 9 ? (date.getMonth()+1):'0'+(date.getMonth()+1);
                        let cYear = date.getFullYear();
                        let getFullDate = cDate+'-'+cMonth+'-'+cYear;

                        let hours = date.getHours();
                        let minutes = date.getMinutes();
                        let seconds = date.getSeconds();
                        let day_night = "AM";

                        if(hours > 12){
                            day_night = "PM";
                            hours = hours - 12;
                        }
                        if(hours < 10){
                            hours = "0" + hours;
                        }
                        if(minutes < 10){
                            hours = "0" + minutes;
                        }
                        if(seconds < 10){
                            seconds = "0" + seconds;
                        }
                        let currentTime = hours + ":" + minutes + ":" + seconds + " " + day_night;

        html += `<div class="`+addClass+`" id="`+chats[x]['_id']+`">
                   <h5><span>`+chats[x]['message']+`</span>`;
                    if(chats[x]['sender_id'] == sender_id){
                        html +=`<i class="fa fa-trash" area-hidden="true" data-id="`+chats[x]['_id']+`" data-toggle="modal" data-target="#deleteChatModal"></i>
                        <i class="fa fa-edit" area-hidden="true" data-id="`+chats[x]['_id']+`" data-msg='`+chats[x]['message']+`' data-toggle="modal" data-target="#editChatModal"></i>
                    `;}
                    html += `  
                        </h5>
                        <p id="classDateORtime">`+getFullDate+`,`+currentTime+`</p>
                      </div>`;
    }
    $('#chat-container').append(html);
    scrollChat();
});
// Scroll reach on bottom automatic
function scrollChat(){
    $('#chat-container').animate({
        scrollTop: $("#chat-container").offset().top + $("#chat-container")[0].scrollHeight
    },0);
}


 // delete chat work
 $(document).on('click','.fa-trash', function(){
    let msg = $(this).parent().text();
    $('#delete-message').text(msg);

    $('#delete-message-id').val($(this).attr('data-id'));
 });

 $('#delete-chat-form').submit(function(event){
    event.preventDefault();
    var id = $('#delete-message-id').val();

    $.ajax({
        url:'/delete-chat',
        type:'POST',
        data:{id:id},
        success:function(res){
            if(res.success == true){
                $('#'+id).remove();
                $('#deleteChatModal').modal('hide');
                socket.emit('chatDeleted', id);
            }
            else{
                alert(res.msg);
            }
        }
    });
});
socket.on('chatMessageDeleted', function(id){
$('#'+id).remove();
});
 
//   update user chats 
$(document).on('click','.fa-edit',function(){
    $('#edit-message-id').val($(this).attr('data-id'));
    $('#update-message').val($(this).attr('data-msg'));
});

$('#update-chat-form').submit(function(event){
    event.preventDefault();
    var id = $('#edit-message-id').val();
    var msg = $('#update-message').val();

    $.ajax({
        url:'/update-chat',
        type:'POST',
        data:{id:id, message:msg},
        success:function(res){
            if(res.success == true){
                $('#editChatModal').modal('hide');
                $('#'+id).find('span').text(msg);
                $('#'+id).find('.fa-edit').attr('data-msg',msg);
                socket.emit('chatUpdated', {id:id, message:msg});
            }
            else{
                alert(res.msg);
            }
        }
    });
});

socket.on('chatMessageUpdated', function(data){
    $('#'+data.id).find('span').text(data.message);
});


// Add members js
$('.addMember').click(function(){
    var id = $(this).attr('data-id');
    var limit = $(this).attr('data-limit');
    
    $("#group_id").val(id);
    $("#limit").val(limit);

    // Create an array of selected members and send it with the correct key name 'members'
    var selectedMembers = $('.addMembersInTable input[name="members[]"]:checked').map(function() {
        return $(this).val();
    }).get();
    // console.log('selectedMembers',selectedMembers);

    $.ajax({
        url:'/get-members',
        type:'POST',
        data:{
            group_id: id,
            limit: limit,
            members: selectedMembers  // Send the selected members with the correct key name 'members'
        },
        success:function(res){
            // console.log(res);
            if(res.success == true){
                let users = res.data;
                let html = '';
                for (let i = 0; i < users.length; i++) {
                    // Use a ternary operator to check if the user is a member of the group
                    let isMemberOfGroup = users[i]['member'].length >0?true:false;
                    // console.log('isMemberOfGroup',isMemberOfGroup);
                    html += `<tr>
                                <td>
                                    <input type="checkbox" `+(isMemberOfGroup?'checked':'')+` name="members[]" value="${users[i]['_id']}" />
                                </td>
                                <td>${users[i]['firstname'] +' '+ users[i]['lastname']}</td>
                            </tr>`;
                }
                $('.addMembersInTable').html(html);
            }
        }
    })
});


// add member form submit code

$('#add-member-form').submit(function(event){
    event.preventDefault();

    var formData = $(this).serialize(); // jisse data formdata ke ander aa chuka h
    // console.log("formData",formData);
    $.ajax({
        url:'/add-members',
        type:'POST',
        data:formData,
        success:function(res){
            if(res.success){
                // console.log("res",res);
                $("#memberModal").modal('hide');
                $("#add-member-form")[0].reset();
                alert(res.msg)
            }else{
                $('#add-member-error').text(res.msg);
                setTimeout(()=>{
                    $('#add-member-error').text('');
                },3000);
            }
        },
        error: function (xhr, status, error) {
            console.log("HTTP Error:", status, error);
        }
    })
})


// ====== update Group script =========
$('.updateMember').click(function(){
    var obj = JSON.parse($(this).attr('data-obj'));
    $('#update_group_id').val(obj._id);
    $('#last_limit').val(obj.limit);
    $('#group_name').val(obj.name);
    $('#group_limit').val(obj.limit);

    // $('#file_name').val(obj.image);
    // console.log(obj);
    
});

$('#updateChatGroupForm').submit(function(e) { // Remove the extra `{` after `submit`
    e.preventDefault();
    $.ajax({
        url: "/update-chat-group",
        type: "POST",
        dataType: "JSON",
        data: new FormData(this),
        cache: false,
        contentType: false,
        processData: false,
        success: function(res) {
            console.log(res);
            alert(res.msg);
            if (res.success) {
                location.reload();
            }
        }
    });
}); // Remove the extra `}` after `submit`




// =========== delete chat group =========
$(".deleteGroup").click(function(){
    $('#delete_group_id').val($(this).attr('data-id'));
    $('#delete_group_name').text($(this).attr('data-name'));
    // console.log(($(this).attr('data-name')));
});

$('#deleteChatGroupFrom').submit(function(e){
    e.preventDefault();

    var formData = $(this).serialize();
    // console.log(formData);
    $.ajax({
        url: "/delete-chat-group",
        type: "POST",
        data: formData,
        success: function(res){
            alert(res.msg);
            if(res.success){
                location.reload();
            }
        }
    });
});



// ============= copy shareable link
$('.copy').click(function(){
    $(this).prepend('<span class="copied_text">Copied</span>');
    
    var group_id = $(this).attr('data-id');
    var url = window.location.host+'/share-group/'+group_id;
    
    var temp = $("<input>");
    $("body").append(temp);
    temp.val(url).select();
    document.execCommand("copy");
    temp.remove();
    setTimeout(()=>{
        $('.copied_text').remove();
    },3000);
});

// join group script
$('.join-now').click(function(){

    $(this).text('wait...');
    $(this).attr('disabled','disabled');

    var group_id = $(this).attr('data-id');
    $.ajax({
        url:"/join-group",
        type:"POST",
        data:{ group_id:group_id},
        success:function(res){
            alert(res.msg);
            if(res.success){
                location.reload();
            }
            else{
                $(this).text('Join Now');
                $(this).removeAttr('disabled');
            }
        }
    })
});


// --------group chatting section---

$('.group-list').click(function(){
    $('.group-start-head').hide();
    $('.group-chat-section').show();

    global_group_id = $(this).attr('data-id');
    
    loadGroupChats();
});
// scroll groupChats
function scrollChat2(){
    $('#group-chat-container').animate({
        scrollTop: $("#group-chat-container").offset().top + $("#group-chat-container")[0].scrollHeight
    },0);
}
// chat save of groups
$('#group-chat-form').submit(function(event){
    event.preventDefault();
    var message = $('#group-message').val();
    $.ajax({
        type:'POST',
        url:'/group-chat-save',
        data:{sender_id:sender_id, group_id:global_group_id,message:message},
        success:function(response){
            if(response.success){ 
                $('#group-message').val('');
                let message = response.chat.message;  // from userController.js => data = newChat
                let html = `<div class="current-user-chat" id="`+response.chat._id+`">
                                <h5> <span>`+message+`</span>
                                    <i class="fa fa-trash deleteGroupChat" area-hidden="true" data-id="`+response.chat._id+`" data-toggle="modal" data-target="#deleteGroupChatModal"></i>    
                                    <i class="fa fa-edit editGroupChat" area-hidden="true" data-id="`+response.chat._id+`" data-msg='`+message+`' data-toggle="modal" data-target="#editGroupChatModal"></i>    
                                </h5>`;
                                html +=`
                        </h5>`;

                        var date = new Date(response.chat.createdAt);
                        let cDate = date.getDate();
                        let cMonth = (date.getMonth()+1) > 9 ? (date.getMonth()+1):'0'+(date.getMonth()+1);
                        let cYear = date.getFullYear();
                        let getFullDate = cDate+'-'+cMonth+'-'+cYear;
                        
                        // let date = new Date();
                        let hours = date.getHours();
                        let minutes = date.getMinutes();
                        let seconds = date.getSeconds();
                        let day_night = "AM";

                        if(hours > 12){
                            day_night = "PM";
                            hours = hours - 12;
                        }
                        if(hours < 10){
                            hours = "0" + hours;
                        }
                        if(minutes < 10){
                            hours = "0" + minutes;
                        }
                        if(seconds < 10){
                            seconds = "0" + seconds;
                        }
                        let currentTime = hours + ":" + minutes + ":" + seconds + " " + day_night;


                        html +=`<div class="user-data">`+getFullDate+` ,<b>`+currentTime+`</b></div>`
                        
                    html+=`
                            </div>`;
                $('#group-chat-container').append(html);
                socket.emit('newGroupChat',response.chat);
                scrollChat2();
            }else{
                alert(data.msg);
            }
        }
    });
});

socket.on('loadNewGroupChat',function(data){

    if(global_group_id == data.group_id){
        let html = `<div class="distance-user-chat" id="`+data._id+`">
                        <h5>
                           <span>`+data.message+`</span>    
                        </h5>`;

                        var date = new Date(data.createdAt);
                        let cDate = date.getDate();
                        let cMonth = (date.getMonth()+1) > 9 ? (date.getMonth()+1):'0'+(date.getMonth()+1);
                        let cYear = date.getFullYear();
                        let getFullDate = cDate+'-'+cMonth+'-'+cYear;

                        let hours = date.getHours();
                        let minutes = date.getMinutes();
                        let seconds = date.getSeconds();
                        let day_night = "AM";

                        if(hours > 12){
                            day_night = "PM";
                            hours = hours - 12;
                        }
                        if(hours < 10){
                            hours = "0" + hours;
                        }
                        if(minutes < 10){
                            hours = "0" + minutes;
                        }
                        if(seconds < 10){
                            seconds = "0" + seconds;
                        }
                        let currentTime = hours + ":" + minutes + ":" + seconds + " " + day_night;


                        html +=`<div class="user-data">
                                    <img src="`+data.sender_id.image+`" class="user-chat-image"/>   
                                    <b>`+data.sender_id.firstname+` </b>`
                                    +getFullDate+`,
                                    <b>`+currentTime+`</b>
                               </div>`


                    html+=`
                    </div>`;
        $('group-chat-container').append(html);

        scrollChat2();
    }
});

function loadGroupChats(){
    $.ajax({
        url:"/load-group-chats",
        type:"POST",
        data:{group_id:global_group_id},
        success:function(res){
            if(res.success){
                let chats  = res.chats;
                var html = '';
                for (let i = 0; i < chats.length; i++) {
                    let className = 'distance-user-chat';
                    if(chats[i]['sender_id']._id == sender_id){
                        className = 'current-user-chat';
                    }

                    html += `<div class="`+className+`" id="`+chats[i]['_id']+`">
                        <h5>
                           <span>`+chats[i]['message']+`</span>`;

                if(chats[i]['sender_id']._id == sender_id){
                    html+=`<i class="fa fa-trash deleteGroupChat" area-hidden="true" data-id="`+chats[i]['_id']+`" data-toggle="modal" data-target="#deleteGroupChatModal"></i> 
                             <i class="fa fa-edit" area-hidden="true" data-id="`+chats[i]['_id']+`" data-msg='`+chats[i]['message']+`' data-toggle="modal" data-target="#editGroupChatModal"></i>`;
                        }
                     
                    html +=`
                        </h5>`;

                        var date = new Date(chats[i]['createdAt']);
                        let cDate = date.getDate();
                        let cMonth = (date.getMonth()+1) > 9 ? (date.getMonth()+1):'0'+(date.getMonth()+1);
                        let cYear = date.getFullYear();
                        let getFullDate = cDate+'-'+cMonth+'-'+cYear;

                        let hours = date.getHours();
                        let minutes = date.getMinutes();
                        let seconds = date.getSeconds();
                        let day_night = "AM";

                        if(hours > 12){
                            day_night = "PM";
                            hours = hours - 12;
                        }
                        if(hours < 10){
                            hours = "0" + hours;
                        }
                        if(minutes < 10){
                            hours = "0" + minutes;
                        }
                        if(seconds < 10){
                            seconds = "0" + seconds;
                        }
                        let currentTime = hours + ":" + minutes + ":" + seconds + " " + day_night;


                        if(chats[i]['sender_id']._id == sender_id){
                            html +=`<div class="user-data">`+getFullDate+` ,<b>`+currentTime+`</b></div>`
                        }
                        else{
                            html +=`<div class="user-data">
                                        <img src="`+chats[i]['sender_id'].image+`" class="user-chat-image"/>   
                                        <b>`+chats[i]['sender_id'].firstname+` </b>`
                                        +getFullDate+`,
                                        <b>`+currentTime+`</b>
                                    </div>`

                        }
                    html += `
                            
                    </div>`;
                }
                $('#group-chat-container').html(html);
                scrollChat2();
            }
            else{
                alert(res.msg);
            }
        }
    })
}


$(document).on('click', '.deleteGroupChat',function(){

    var msg = $(this).parent().find('span').text();
    $('#delete-group-message').text(msg);
    $('#delete-group-message-id').val($(this).attr('data-id'));

});

$('#delete-group-chat-form').submit(function(e){
    e.preventDefault();

    var id = $('#delete-group-message-id').val();
    console.log(id);
    $.ajax({
        url:"/delete-group-chat",
        type:"POST",
        data:{id:id},
        success:function(res){
            if(res.success==true){
                $("#"+id).remove();
                $('#deleteGroupChatModal').modal('hide');
                socket.emit('groupChatDeleted', id);
            }
            else{
                alert(res.msg);
            }
        }
    })
});

socket.on('groupChatMessageDeleted', function(id){
    $('#'+id).remove();
});


// update group chat messages

$(document).on('click', '.editGroupChat',function(){
    $('#edit-group-message-id').val($(this).attr('data-id'));
    $('#update-group-message').val($(this).attr('data-msg'));
});
$('#update-group-chat-form').submit(function(e){
    e.preventDefault();
    var id = $('#edit-group-message-id').val();
    var msg = $('#update-group-message').val();
    $.ajax({
        url:"/update-group-chat",
        type:"POST",
        data:{id:id, message:msg},
        success:function(res){
            if(res.success){
                $("#"+id).remove();
                $('#editGroupChatModal').modal('hide');
                $('#'+id).find('.editGroupChat').attr('data-msg',msg);
                socket.emit('groupChatUpdated', {id:id,message:msg});
            }
            else{
                alert(res.msg);
            }
        }
    })
});

socket.on('groupChatMessageUpdated', function(id){
    $('#'+data.id).find('span').text(data.message);  
});
});