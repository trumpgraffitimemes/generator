import React, {useEffect, useState} from 'react';
import styles from './Quote.module.css';

function Quote({quotep}) {
    const [quote, setQuote]=useState();
    //const [quotep, setQuotep]=useState();

    useEffect(() => {
        
        fetch('https://api.whatdoestrumpthink.com/api/v1/quotes')
          .then(function (response) {
            return response.json();
          })
          .then(function (rep) {
              //console.log(rep.messages)
            setQuote(rep);            
            /*setInterval(()=>{
                const long = rep.messages.non_personalized.length
                const randomnum=Math.floor(Math.random()*long-1)
                setQuote(rep.messages.non_personalized[randomnum])
            }, 20000)*/
        });
          
        }, []);

        function handleClick(){ 
        setTimeout(()=>{
            
            const long = quote.messages.personalized.length
            const randomnum=Math.floor(Math.random()*long-1)
            quotep(quote.messages.personalized[randomnum])
        }, 100)}     

//{quotep ? <p className={styles.quote}>"ROBERT" {quotep}</p> : <></>}
//{quote ? <h2 className={styles.quote}>{quote}</h2> : <></>}

    return(
           <div>
               <button className={styles.button} onClick={handleClick}>Random Quote</button>    
            </div>

    );
    }

    export default Quote