let styLink = document.createElement('link')
styLink.setAttribute('rel', 'stylesheet')
styLink.setAttribute('href', "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css")
document.head.appendChild(styLink)

let popperScrpt = document.createElement('script')
popperScrpt.src = 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js'
document.head.appendChild(popperScrpt)

let jQScript = document.createElement('script')
jQScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js'
document.head.appendChild(jQScript)

let bootScript = document.createElement('script')
bootScript.src = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js'
document.head.appendChild(bootScript)

function openForm() {
  document.getElementById("myForm").style.hidden = false;
}

function closeForm() {
  document.getElementById("myForm").style.hidden = true;
}

function toggle() {
  document.getElementById('myForm').hidden = !document.getElementById('myForm').hidden 
}

  
function getData() {
  chrome.storage.sync.get('id3', function (obj) {
    console.log(obj)
    if (obj.id3 == undefined){
      document.getElementById('subBtn').disabled = true
      document.getElementById('errDiv').hidden = false
    } else {
      document.getElementById('subBtn').disabled = false
      document.getElementById('errDiv').hidden = true
    }
  });
}

window.addEventListener('load', function() {
  // getData() // UNCOMMENT ONCE YOU'RE EXECUTING
  document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      document.getElementById('myForm').hidden = true
    }
  };

  let mybutton = document.getElementById("stress-extension-btn");
  let ratings = document.getElementsByName('rating');
  let rating1 = document.getElementsByName('rating1');

  mybutton.addEventListener("click", toggle);


  const form = document.getElementById('my-form');
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    let myID
    document.getElementById('subBtn').disabled = true
    let val, ind;
    for (let i = 0; i < ratings.length; i++){
      if (ratings[i].checked) {
        val = ratings[i].value
        ind = i
        break
      }
    }
    let val1, ind1;
    for (let i = 0; i < rating1.length; i++){
      if (rating1[i].checked) {
        val1 = rating1[i].value
        ind1 = i
        break
      }
    }
    chrome.storage.sync.get('id3', function (obj) {
      try {
        myID = obj.id3.ID
        if(myID == undefined){
            throw "exit"
        }
        const data = new FormData(form);
        data.append('How serious is it?', val)
        data.append('How sure do you feel you can work it out?', val1)
        data.append('ID', myID)
        data.append('URL', window.location.href)
        data.append('Title', document.title)
        data.append('Scroll_X_Position', window.scrollX)
        data.append('Scroll_Y_Position', window.scrollY)
        chrome.storage.sync.get('prompted', function (obj2) {
          console.log(obj2.prompted)
          data.append('Prompted', obj2.prompted ? 'Prompted' : 'Self-Report')
          chrome.storage.sync.set({'prompted': false}, function() {console.log('Prompted')});
          const action = e.target.action;
          fetch(action, {
            method: 'POST',
            body: data,
          })
          .then(() => {
            document.getElementById('prompt').hidden = true
            document.getElementById('subBtn').disabled = false
            ratings[ind].checked = false
            rating1[ind1].checked = false
          })
        })        
      } catch (error) {
        console.log('asdf')
        document.getElementById('errDiv').hidden = false
        document.getElementById('subBtn').disabled = true
      }
  
    })
  });
})
