browser.storage.sync.get(
    {
        prefix : 'AU',
        company_key: '',
    },
    config => {
        if (! config.company_key){
            console.log("If you're reading this and expecting something to happen,  it's probably because you have not saved the options");
            console.log(config);
            return;
        }

        function checkkey(e) {

            if (e.isTrusted && e.code == 'Space' && e.ctrlKey){
                if (e.target.nodeName != "TEXTAREA"){
                    return;
                }

                var textarea = e.target;
                if (textarea.value.startsWith("AU"))
                return;
                
                getnumber(function(ticketnumber){
                    var ticketname = `${ticketnumber} - ${textarea.value}`; 
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


        function getnumber(callback){
            var xhr = new XMLHttpRequest();
            xhr.open("GET", `https://api.countapi.xyz/hit/${config.company_key}/ticket`);
            xhr.responseType = "json";
            xhr.onload = function() {
                callback( config.prefix + (7000 + this.response.value));
            }
            xhr.send();
        }
        document.addEventListener('keydown', checkkey);
    },
);

