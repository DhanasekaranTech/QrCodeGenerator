import React, { useState } from 'react'

const QrCode = () => {
    const [img, setImg] = useState("");
    const [load, setLoad] = useState();
    const [qrData, setQrData] = useState("")
    const [qrSize,setQrSize] = useState("")
    
    async function generateQr() {
        setLoad(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}*${qrSize}&data=${qrData}`;
            setImg(url);
        } catch(error) {
            console.log(error);
        } finally {
            setLoad(false);
        }
    }

    function downloadQr() {
        fetch(img)
            .then((response) => response.blob())
            .then((blob) => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = "qrcode.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.error("error in download qr code "+error);
            })
    }
  return (
      <div className='app-container'>
          <h1>QR Code Generator</h1>
          {load && <p>please wait...</p> }
         {img && <img src={img} alt="" className='qr-img' />}
          <div className='inputs'>
              <label htmlFor="dataInput" className='input-label'>
                  Data for QR code:
              </label>
              <input type="text" value={qrData} id='dataInput' placeholder='Enter data for QR code' onChange={(e)=>setQrData(e.target.value)} />
              <label htmlFor="sizeInput" className='input-label'>
                  Image size(e.g.,150)
              </label>
              <input type="text" id='sizeInput' value={qrSize}  placeholder='Enter image size' onChange={(e)=>setQrSize(e.target.value)} />
              <button className='gen-btn' onClick={generateQr}>Generate QR Code</button>
              <button className='dow-btn' onClick={downloadQr}>Download QR Code</button>

          </div>
          <p className='footer'>Designed by <a href="/">Spy-D Tech</a> </p>
    </div>
  )
}

export default QrCode
