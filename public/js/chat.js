const button=document.querySelector(".chatExpansion");
const chatBox=document.querySelector(".chatBox");
function openForm() {
    
    button.style.display="none";
    createChat();
    chatBox.style.display="block";
  }
  
function closeForm() {
  
  button.style.display="block";
  chatBox.style.display="none";
}

function createChat(){
    let form =document.createElement("form");
    form.classList.add("chatContainer");
    form.classList.add("chatForm");

    let PeopleDiv=document.createElement("div");
    PeopleDiv.classList.add("chatSelectorFlex");
    let titleDiv=document.createElement("div");
    titleDiv.classList.add("chatSelector");
    titleDiv.classList.add("selected");
    let title=document.createElement("span");
    title.innerHTML="Chat";
    titleDiv.appendChild(title);
    PeopleDiv.appendChild(titleDiv);
    

    let closebuttonDiv=document.createElement("div");
    closebuttonDiv.classList.add("Xdiv");
    let closeButton=document.createElement("button");
    closeButton.classList.add("closeButton");
    closeButton.setAttribute("onclick","closeForm()");
    closeButton.setAttribute("type","button");
    closeButton.innerHTML="X";
    closebuttonDiv.appendChild(closeButton);

    // const label=document.createElement("label");
    // label.setAttribute("for","chatbox");
    // label.innerHTML="Messages";

    let messageArea=document.createElement("div");
    messageArea.classList.add("chatHistory");
    let textmessageS=document.createElement("div");
    textmessageS.classList.add("sent");
    let textmessageR=document.createElement("div");
    textmessageR.classList.add("recieved");
    textmessageS.innerHTML="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus praesentium similique in voluptas nemo aut eveniet hic optio alias expedita voluptatum ipsum sunt illum, possimus nostrum accusantium, tenetur qui placeat. "
    textmessageR.innerHTML="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus praesentium similique in voluptas nemo aut eveniet hic optio alias expedita voluptatum ipsum sunt illum, possimus nostrum accusantium, tenetur qui placeat. "
    messageArea.appendChild(textmessageR);
    messageArea.appendChild(textmessageS);


    let textarea=document.createElement("textarea");
    textarea.setAttribute("placeholder","Type message...");
    textarea.setAttribute("name","chatbox");
    textarea.required=true;
    
    let sendButton=document.createElement("button");
    sendButton.setAttribute("type","submit");
    sendButton.classList.add("sendButton");
    sendButton.innerHTML="Send";

    chatBox.appendChild(form);
    form.appendChild(PeopleDiv);
    form.appendChild(closebuttonDiv);
    form.appendChild(messageArea);
  
    form.appendChild(textarea);
    form.appendChild(sendButton);
}

    

