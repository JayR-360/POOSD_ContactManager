let userID = 0;
let firstName = "";
let lastName = "";

function SearchContacts()
{
    let srch = document.getElementById("").value;
    document.getEklementById("contactSearchResult").innerHTML = srch;

    let contactList = "";

    let tmp = {search:srch, userID:userID};
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/SearchContacts.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try 
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                document.getElementById("contactSearchResult").innerHTML = "Contact(s) has been retrieved";
                let jsonObject = JSON.parse(xhr.responseText);

                for( let i=0; i<jsonObject.results.length; i++ )
                {
                    contactList += jsonObject.results[i];
                    if (i < jsonObject.results.length - 1) {
                        contactList += "<br />\r\n";
                    }
                }
                document.getElementById("contactSearchResult").innerHTML = contactList;
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("contactSearchResult").innerHTML = err.message;
    }
}