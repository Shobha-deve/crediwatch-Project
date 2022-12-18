import React, {useState} from 'react'
import Scoretable from './Scoretable';
console.log("Hi");

const ScoreRiskBadge =({score,risk})=>{
    console.log(risk);
    console.log(score);
    let [highRisk, updateHigh] = useState(0);
    let [mediumRisk, updateMedium] = useState(0);
    let [lowRisk, updatelow] = useState(0);
    let [overallScore,updateover] =useState([]);    
    function getscoredata(){
       
            score.map((allscore) => {
                updateover(overallScore=>[...overallScore,allscore]);
                return (overallScore);
                console.log(overallScore);
            }).map((score, index) => {
                if (score === 0 || score <= 5) {
                    lowRisk = lowRisk + 1;
                }
                else if (score <= 10) {
                    mediumRisk = mediumRisk + 1;
                }
                else if (score <= 15) {
                    highRisk = highRisk + 1;
                }
            })
                updateHigh(highRisk);
                updateMedium(mediumRisk);
                updatelow(lowRisk);
            
            switch (risk) {
                case "high":
                    return highRisk;
                    break;
                case "medium":
                    return mediumRisk;
                    break;
                case "low":
                    return lowRisk;
                    break;
                default:
                    return (<div>invalid</div>);
                    break;
            }
        }
    
    return(<div>
         {getscoredata}
    </div>);
}

export default ScoreRiskBadge;