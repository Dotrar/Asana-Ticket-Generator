browser.storage.sync.get(
    {
        prefix : 'AU',
        company_key: '',
    },
    config => {
        document.getElementById('prefix-box').value = config.prefix;
        document.getElementById('company_key-box').value = config.company_key;
    },
);

document.getElementById('save-button').onclick = function(){
    browser.storage.sync.set(
        {
            prefix : document.getElementById('prefix-box').value,
            company_key: document.getElementById('company_key-box').value
        },
        ()=>{
            document.getElementById('result').innerText = "Saved";
            setTimeout(function(){
                document.getElementById('result').innerText = "";
            },3000);
        });
};
