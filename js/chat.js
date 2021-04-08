const button=document.querySelector(".chatExpansion");
const chatBox=document.querySelector(".chatBox");
function openForm() {
    
    button.style.display="none";
    createChat();
  }
  
  function closeForm() {
    
    button.style.display="block";
    chatBox.innerHTML="";
  } 
function createChat(){
    const form =document.createElement("form");
    form.classList.add("chatContainer");
    form.classList.add("chatForm");

    const title=document.createElement("h2");
    title.innerHTML="Chat";

    const closeButton=document.createElement("button");
    closeButton.classList.add("closeButton");
    closeButton.setAttribute("onclick","closeForm()");
    closeButton.setAttribute("type","button");
    closeButton.innerHTML="X";

    const label=document.createElement("label");
    label.setAttribute("for","chatbox");
    label.innerHTML="Messages";

    const textmessage=document.createElement("div");
    textmessage.classList.add("chatHistory");
    textmessage.innerHTML="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus praesentium similique in voluptas nemo aut eveniet hic optio alias expedita voluptatum ipsum sunt illum, possimus nostrum accusantium, tenetur qui placeat.    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque explicabo consequuntur molestias reiciendis architecto sapiente a nisi itaque? Labore nemo vitae odio itaque exercitationem eaque debitis mollitia maiores quaerat nesciunt.    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, deserunt dolorem esse, nobis porro eos maxime sapiente eum, unde atque totam illo et ex! In libero consequatur ab animi! Impedit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint aliquam tempora reprehenderit laudantium neque perspiciatis tempore quia. Vel, at commodi error est inventore qui cumque illum nemo, officiis nam tenetur."

    const textarea=document.createElement("textarea");
    textarea.setAttribute("placeholder","Type message...");
    textarea.setAttribute("name","chatbox");
    textarea.required=true;
    
    const sendButton=document.createElement("button");
    sendButton.setAttribute("type","submit");
    sendButton.classList.add("sendButton");
    sendButton.innerHTML="Send";

    chatBox.appendChild(form);
    form.appendChild(title);
    form.appendChild(closeButton);
    form.appendChild(textmessage);
    form.appendChild(label);
    form.appendChild(textarea);
    form.appendChild(sendButton);
    
}