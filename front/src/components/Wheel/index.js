import React, { useEffect } from 'react';
// import WheelComponent from 'react-wheel-of-prizes';
import { default as WheelComponent } from './TTTWheel';
import 'react-wheel-of-prizes/dist/index.css';
import { updateTicket } from '../Redux/reduxActionTicket';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie'


const Wheel = (props) => {
  const { ticket } = useSelector((state) => state);
  const cookies = Cookies.get();
  const dispatch = useDispatch();
  const segments = [
    'infuseur de thé',
    '100g thé détox ou infusion',
    '100g thé signature',
    'coffret découverte 39 €',
    'coffret découverte 69 €'
  ]
  const segColors = [
    '#dab162',
    '#000000',
    '#eee5cf',
    '#81a78c',
    '#326148'
  ]


  const onFinished = (winner) => {
    const congratsHTML = `
    <h2>Félicitations ! Nous sommes heureux de vous annoncer que vous avez remporté:<br/>
    <span>${props.prize} !</span></h2>
    <p>Vous devriez recevoir votre lot sous <u>5 à 10 jours ouvrés</u>. Faites-en bon usage ! Et n'oubliez pas, vous êtes toujours libre d'enregistrer d'autres tickets si vous le souhaitez, pour remporter encore plus de lots !</p>`;
    const result = document.querySelector('.prize-draw .result');
    const rect = result.getBoundingClientRect();
    Cookies.remove('ticket')
    Cookies.remove('prize')
    result.innerHTML = congratsHTML;
    window.scrollTo(rect.x, rect.y);
    dispatch(updateTicket(props.ticket));
  }

  return (
    <div className='prize-draw'>
      <h1>Tentez votre chance avec la roulette !</h1>
      <WheelComponent
        segments={segments}
        segColors={segColors}
        winningSegment={props.prize}
        onFinished={(winner) => onFinished(winner)}
        primaryColor='#326148'
        contrastColor='white'
        buttonText="C'est parti !"
        isOnlyOnce={false}
        size={390}
        upDuration={500}
        downDuration={1000}
      />
      <div className='result'>
        <p></p>
      </div>
    </div>

  )
}

export default Wheel;