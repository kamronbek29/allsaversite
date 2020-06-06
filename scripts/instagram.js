// Code By Webdevtrick ( https://webdevtrick.com )
const _ = e => document.querySelector(e);
const render = _('.result');


// create video
const createVideo = data => {
  let v = document.createElement('video');
  v.id = "direct_link";
  v.src = data.content; 
  v.controls = true;
  v.autoplay = true;
  v.muted = true;

  // create info
  let info = document.createElement('p');
  info.textContent = "Click the right button on video and select save as.";

  let downlaodbutton = document.createElement("a");
  downlaodbutton.href = data.content;
  downlaodbutton.text = "Download";
  downlaodbutton.target = "_blanc";

  render.innerHTML = ""; 
  render.appendChild(v);
  render.appendChild(info);
  render.appendChild(downlaodbutton);
};

// create image
const createImg = data => {
  // create image
  let i = document.createElement('img');
  i.id = "direct_link";
  i.src = data.content;

  // create info
  let info = document.createElement('p');
  info.textContent = "Click the right button on the image and select save image..";

  render.innerHTML = ""; 
  render.appendChild(i); 	
  render.appendChild(info); 

};

// extract html
const getMedia = () => {
  render.innerHTML = "<div class='image-placeholder'></div>";
  // get input value
  let url = _('input').value;
  if (url) {
    fetch(url).
    then(r => r.text()).
    then(r => {
      // render html
      render.innerHTML = r;
      // wait, find meta and create video or image
      let w = setTimeout(() => {
        let v = _('meta[property="og:video"]');
        if (v) {
          createVideo(v);
        } else {
          let img = _('meta[property="og:image"]');
          if (img) {
            createImg(img);
          } else {
            document.body.innerHTML = body;
            alert('Error extracting Instagram image / video.');
          };
        }
        clearTimeout(w);
      }, 200);
    });
  } else {
    _('input').setAttribute('placeholder', 'Invalid address, use a proper Insagram link');

  }
};