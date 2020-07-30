import React, {useEffect, useState} from 'react';
import styles from './Quote.module.css';

function Quote() {
    const [quote, setQuote]=useState();
    const [quotep, setQuotep]=useState();

    useEffect(() => {
        
        fetch('https://api.whatdoestrumpthink.com/api/v1/quotes')
          .then(function (response) {
            return response.json();
          })
          .then(function (rep) {
              console.log(rep.messages)
            setQuote(rep.messages.non_personalized[0]);
            
            setInterval(()=>{
                const long = rep.messages.personalized.length
                const randomnum=Math.floor(Math.random()*long-1)
                setQuotep(rep.messages.personalized[randomnum])
            }, 5000)
            
            
            setInterval(()=>{
                const long = rep.messages.non_personalized.length
                const randomnum=Math.floor(Math.random()*long-1)
                setQuote(rep.messages.non_personalized[randomnum])
            }, 20000)
        });
          
        }, []);

//{quotep ? <p className={styles.quote}>"ROBERT" {quotep}</p> : <></>}


    return(
           <div className={styles.container}>
            {quote ? <h2 className={styles.quote}>{quote}</h2> : <></>}
            
            </div>

    );
    }

    export default Quote