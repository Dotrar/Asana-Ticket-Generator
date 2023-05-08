chrome.storage.sync.get(
    {
        prefix : 'APAC',
    },
    config => {
        function checkkey(e) {

            if (e.isTrusted && e.code == 'Space' && e.ctrlKey){
                if (e.target.nodeName != "TEXTAREA"){
                    return;
                }

                textarea = e.target;
                if (textarea.value.startsWith(config.prefix))
                return;

                getnumber(function(ticketnumber){
                    const ticketname = `${ticketnumber} - ${textarea.value}`; 
                    textarea.value = ticketname;
                    textarea.innerHTML =ticketname;
                    textarea.previousSibling.innerHTML = ticketname;
                    //mark text change input on asana so that it doesn't remove our text. this works for some reason.
                    textarea.dispatchEvent(new KeyboardEvent('keydown', {'key':'Space'} ));
                    textarea.dispatchEvent(new KeyboardEvent( 'keyup' , {'key':'Space'} ));
                    textarea.dispatchEvent(new KeyboardEvent('keydown', {'key':'Backspace'} ));
                    textarea.dispatchEvent(new KeyboardEvent( 'keyup' , {'key':'Backspace'} ));
                });
            }
        }

        function randomTicketKey() { 
            let str = "";
            for (let i = 0; i < 5; i++){
                str += Math.floor(Math.random() * 10)
            }
          return str
        }

        function getnumber(callback){
                callback(config.prefix + randomTicketKey());
        }
        document.body.addEventListener('keydown', checkkey);
    },
);

