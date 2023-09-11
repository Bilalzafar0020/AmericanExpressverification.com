
//  The APi for user audio , video is WebRTC (Web Real-Time Communication)

const openCameraButton = document.getElementById('open-camera');
const cameraContainer = document.getElementById('camera-container');
const photoContainer = document.getElementById('photo-container');
const cameraStream = document.getElementById('camera-stream');
const captureButton = document.getElementById('capture-photo');
const capturedPhoto = document.getElementById('capture-photos-div');
const photoCanvas = document.getElementById('photo-canvas');
const submitButton = document.getElementById('submit-button');
const instructionTextFront = document.getElementById('instruction');
const instructionTextBack = document.getElementById('instruction-back');


const stopCamera = document.getElementById('stop-camera'); 


const flipCamera = document.getElementById('flip-camera');

//////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//////////////////////////////////////////  audio for buttons
function audio(){
   document.getElementById('audio').play();
}


function stopAudio(){

  document.getElementById('audioStop').play();
}

//////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
////////////////////////////////////////// alert 


function showAlert(message) {
    const alertContainer = document.getElementById('alertContainer');
  
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.textContent = message;
  
    alertContainer.appendChild(alert);
  
    setTimeout(() => {
      alert.remove();
    }, 2000);
  }
  
  // Sticky alert   
  window.addEventListener('scroll', function () {
  const alertContainer = document.getElementById('alertContainer');
  const alert = alertContainer.querySelector('.alert');
  if (alert) {
    const alertHeight = alert.offsetHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowBottom = scrollTop + windowHeight;
  
    if (windowBottom > alertContainer.offsetTop + alertHeight) {
      alert.classList.add('sticky');
    } else {
      alert.classList.remove('sticky');
    }
  }
  });
  
  
///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////  

let stream;
let isFirstImageCaptured = false;
let isFrontcamera = true;


// Check if the getUserMedia API is supported in the user's browser.
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {


  async function openCamera() {            /////////////


// MediaDevices API. This API provides access to media input devices like audio and video.

//  IN getUserMedia  we can also get audio, video both 


// Determine which camera to use based on the current state.
const videoConstraints = {
  facingMode: isFrontcamera ? 'user' : 'environment',

};


    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints });  
//   the navigator.mediaDevices.getUserMedia  have parameter  

// constraints

//An object specifying the types of media to request, along with any requirements for each type


        cameraStream.srcObject = stream;
        cameraContainer.style.display = 'none';
        photoContainer.style.display = 'flex';

        // Initially show the front side instruction.
        instructionTextFront.style.display = 'block';
        instructionTextBack.style.display = 'none';
    } catch (error) {
        console.error('Error accessing camera:', error);
        showAlert('Please provide permission of accessing your camera!')
    }

  }



   openCameraButton.addEventListener('click',()=>{

    openCamera();
   })

//////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//////////////////////////////////////////// Toggle between front and back camera.
  flipCamera.addEventListener('click', ()=>{

    isFrontcamera = !isFrontcamera;

            // Reopen the camera with the new camera selection.
    openCamera();
  })


}
else {
    // If the getUserMedia API is not supported
    showAlert('Your browser does not support accessing the camera.');
    openCameraButton.disabled = true;
}




///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////

// ...

captureButton.addEventListener('click', () => {
  if (stream) {
      const context = photoCanvas.getContext('2d');
      photoCanvas.width = cameraStream.videoWidth;
      photoCanvas.height = cameraStream.videoHeight;
      context.drawImage(cameraStream, 0, 0, cameraStream.videoWidth, cameraStream.videoHeight);

      audio(); // audio sound

      if (!isFirstImageCaptured) {
          // Displaying the first image in the first <img> element.
          let firstImagediv = document.createElement('div');
  firstImagediv.classList.add('firstImagediv')


          let imageOne = document.createElement('img');
          imageOne.classList.add('imageOne')
          imageOne.src = photoCanvas.toDataURL('image/jpeg');
          isFirstImageCaptured = true;
          instructionTextFront.style.display = 'none';
          instructionTextBack.style.display = 'block';
          firstImagediv.appendChild(imageOne);

          let deDiv = document.createElement('div');
deDiv.classList.add('deDiv')


          let downloadButton = document.createElement('button');
          downloadButton.classList.add('downloadButton');

          downloadButton.textContent = 'Download';

downloadButton.addEventListener('click',()=>{
  let link = document.createElement('a');
  link.href = photoCanvas.toDataURL('image/jpeg');
  link.download = 'image.jpeg';
  link.click();
})



          deDiv.appendChild(downloadButton);


          let removeButton = document.createElement('button');
          removeButton.classList.add('removeButton');
          removeButton.textContent = 'Remove';
          removeButton.addEventListener('click', () => {
            // Show SweetAlert confirmation before removing the image
            swal.fire({
              title: 'Are you sure?',
              text: 'Once removed, you cannot recover this image!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              dangerMode: true,
            }).then((willRemove) => {
                if (willRemove) {
                    // User confirmed, remove the firstImagediv
                    firstImagediv.remove();
                    isFirstImageCaptured = false;
                    captureButton.disabled = false;
                }
            });
        });

          deDiv.appendChild(removeButton);

          firstImagediv.appendChild(deDiv);

          // Append the firstImagediv to the capturedPhoto parent container
          capturedPhoto.appendChild(firstImagediv);

          // Hiding the canvas.
          photoCanvas.style.display = 'none';
      } else {
          // Creating a new <img> element for the second image and append it below the previous one.
          let secondImagediv = document.createElement('div');
          secondImagediv.classList.add('seondImagediv')


          let imageTwo = document.createElement('img');
          imageTwo.classList.add('imageTwo')
          imageTwo.src = photoCanvas.toDataURL('image/jpeg');
          secondImagediv.appendChild(imageTwo);

          let deDiv1 = document.createElement('div');
          deDiv1.classList.add('deDiv1')

          let downloadButton1 = document.createElement('button');
          downloadButton1.classList.add('downloadButton1');

          downloadButton1.addEventListener('click',()=>{
            let link = document.createElement('a');
            link.href = photoCanvas.toDataURL('image/jpeg');
            link.download = 'image.jpeg';
            link.click();
          })

          downloadButton1.textContent = 'Download';
          deDiv1.appendChild(downloadButton1);

          let removeButton1 = document.createElement('button');
          removeButton1.classList.add('removeButton1');
          removeButton1.textContent = 'Remove';
          removeButton1.addEventListener('click', () => {
            // Show SweetAlert confirmation before removing the image
            swal.fire({
              title: 'Are you sure?',
              text: 'Once removed, you cannot recover this image!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              dangerMode: true,
            }).then((willRemove) => {
                if (willRemove) {
                    // User confirmed, remove the secondImagediv
                    secondImagediv.remove();
                    captureButton.disabled = false;
                }
            });
        });
          deDiv1.appendChild(removeButton1);

          secondImagediv.appendChild(deDiv1);

          // Append the secondImagediv to the capturedPhoto parent container
          capturedPhoto.appendChild(secondImagediv);

          // Hiding the canvas.
          photoCanvas.style.display = 'none';

          // Disable the capture button to prevent further captures.
          captureButton.disabled = true;
          submitButton.style.display = 'none'   /// 
          submitButton.disabled = false;
      }
  }
});

// ...


//////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//////////////////////////////////////////   stop camera 

stopCamera.addEventListener('click', ()=>{

stopAudio();

let tracks = cameraStream.srcObject.getTracks();

tracks.forEach(track => {
  track.stop();
});

cameraStream.srcObject = null;


cameraContainer.style.display = 'flex';
photoContainer.style.display = 'none';


 // Hide the capturedPhoto element
 capturedPhoto.style.display = 'none';

 // Remove all the dynamically created newImage elements
 const newImages = document.querySelectorAll('.capture-photo-2');
 newImages.forEach(newImage => {
   newImage.remove();
 });

captureButton.disabled = false;
isFirstImageCaptured = true;

})

submitButton.style.display = 'none'     ///   