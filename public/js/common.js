$("#postTextarea,#replyTextarea").keyup((event)=>{
  var textbox = $(event.target);
  var value = textbox.val().trim();
 
  var isModal = textbox.parents(".modal").length == 1;
  var submitButton = isModal ? $("#submitReplyButton") : $("#submitPostButton");

    if(submitButton.length == 0) return alert("No submit button found");

    if (value == "") {
        submitButton.prop("disabled", true);
        return;
    }

    submitButton.prop("disabled", false);
})

$("#submitPostButton").click(()=>{
    var button = $(event.target);
    var textbox = $("#postTextarea");
    var data = {
        content : textbox.val()
    }

    $.post("/api/posts", data, postData => {
        var html = createPostHtml(postData);
        $(".postsContainer").prepend(html);
        textbox.val("");
        button.prop("disabled", true);
    })
})

// Comment Button

$("#replyModal").on("show.bs.modal", (event) => {
    var button = $(event.relatedTarget);
    var postId = getPostIdFromElement(button);
    $("#submitReplyButton").data("id", postId);

    $.get("/api/posts/" + postId, results => {
        outputPosts(results, $("#originalPostContainer"));
    })
})

          // Like Button

$(document).on("click",".likeButton", (event) => {
    var button = $(event.target);
    var postId = getPostIdFromElement(button);
    
    if(postId === undefined){
        return;
    }

    $.ajax({
        url:`/api/posts/${postId}/like`,
        type:"PUT",
        success:(postData) =>{

    button.find("span").text(postData.likes.length || "");
         
           if(postData.likes.includes(userLoggedIn._id)){
               button.addClass("active");
           }else{
               button.removeClass("active");
           }
        }
    })
})

           // Retweet Button

$(document).on("click",".retweetButton", (event) => {
    var button = $(event.target);
    var postId = getPostIdFromElement(button);
    
    if(postId === undefined){
        return;
    }

    $.ajax({
        url:`/api/posts/${postId}/retweet`,
        type:"POST",
        success:(postData) =>{

    button.find("span").text(postData.retweetUsers.length || "");
         
           if(postData.retweetUsers.includes(userLoggedIn._id)){
               button.addClass("active");
           }else{
               button.removeClass("active");
           }
        }
    })
})

function getPostIdFromElement(element){
   var isRoot = element.hasClass("post");
   var rootElement = isRoot ? element : element.closest(".post");
   var postId = rootElement.data().id;

   if(postId === undefined) return console.log("Post id is undefined");

   return postId
}

function createPostHtml(postData){

    if(postData == null) return alert("post object is null");

    var isRetweet = postData.retweetData !== undefined;
    var retweetedBy = isRetweet ? postData.postedBy.username : null;
    var postData = isRetweet ? postData.retweetData : postData;

    const postedBy = postData.postedBy;
    const displayName = postedBy.firstName + " " + postedBy.lastName;
    const timeStamp = timeDifference(new Date(), new Date(postData.createdAt));;
    var verified = "";
   var likeButtonActiveClass = postData.likes.includes(userLoggedIn._id) ? "active" : "";
   var retweetButtonActiveClass = postData.retweetUsers.includes(userLoggedIn._id) ? "active" : "";

    if(postedBy.isVerified){
     verified = '/images/verified.svg'
    }

    var retweetText = '';
    if(isRetweet){
        retweetText = `<span>Retweeted By <a href='/profile/${retweetedBy}'>@${retweetedBy}</a></span>`
    }

    return `<div class='post' data-id='${postData._id}'>
                <div class='postActionContainer'> 
                <i class='fas fa-retweet'></i>
                   ${retweetText}
                </div>
                <div class='mainContentContainer'>
                    <div class='userImageContainer'>
                        <image src='${postedBy.profilePic}'>
                    </div>
                    <div class='postContentContainer'>
                       <div class='header'>
                         <a href='/profile/${postedBy.username}' class='displayName'>${displayName}</a>
                         <img class='verified' src='${verified}'>
                         <span class='username'>@${postedBy.username}</span>
                         <span class='date'>${timeStamp}</span>
                       </div>
                       <div class='postBody'>
                         <span>${postData.content}</span>
                       </div>
                       <div class='postFooter'>
                          <div class='postButtonContainer'>
                             <button data-toggle='modal' data-target='#replyModal'>
                                 <i class='far fa-comment'></i>
                             </button>
                          </div>
                          <div class='postButtonContainer green'>
                             <button class="retweetButton ${retweetButtonActiveClass}">
                                 <i class='fas fa-retweet'></i>
                                 <span>${postData.retweetUsers.length || ""}</span>
                             </button>
                          </div>
                          <div class='postButtonContainer red'>
                             <button class="likeButton ${likeButtonActiveClass}">
                                 <i class='far fa-heart'></i>
                                 <span>${postData.likes.length || ""}</span>
                             </button>
                          </div>
                       </div>
                    </div>
                </div>
             </div>`
}


function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        if(elapsed/1000 < 30) return "Just now";
        
        return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}