import React, {useEffect, useState} from 'react';
import styles from './PictureSource.module.css';

function PictureSource() {
    const [pics, setPics]=useState();
    const [numberg, setNumberg]=useState(0);
    const [zz, setZz]=useState(0);


    useEffect(() => {
        
        fetch('https://api.imgflip.com/get_memes')
          .then(function (response) {
            return response.json();
          })
          .then(function (rep) {
            const memes=rep.data.memes;
            setPics(memes);  
            setZz(Math.floor(Math.random()*memes.length-1))
        });
          
        }, []);
        
        function onhandle(){
            const long=pics.length

            if (zz===long){setNumberg(0);}
            else if(zz===0){setNumberg(long);}
            else {setNumberg(zz);
            setZz(zz+1)
            }
        }

    return(
           <div className={styles.container}> 
           <button onClick={onhandle}>Change pic</button>
            {pics ? <img src={pics[numberg].url} alt="meme" className={styles.pics}/> : <></>}
            </div>

    );





}

export default PictureSource