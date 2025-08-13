(function(){
  const mascot = document.querySelector('.mascot');
  if(!mascot) return;

  const eyeL = mascot.querySelector('.eye--l');
  const eyeR = mascot.querySelector('.eye--r');
  const mouth = mascot.querySelector('.mouth');
  const max = window.matchMedia('(max-width: 900px)').matches ? 5 : 8;

  function moveParts(e){
    const rect = mascot.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const dx = (e.clientX - cx) / (rect.width/2);
    const dy = (e.clientY - cy) / (rect.height/2);
    const txEye = Math.max(-1, Math.min(1, dx)) * max;
    const tyEye = Math.max(-1, Math.min(1, dy)) * max;
    const txMouth = txEye * .6;
    const tyMouth = tyEye * .6;

    eyeL.style.transform = `translate(calc(-50% + ${txEye}px), calc(-50% + ${tyEye}px))`;
    eyeR.style.transform = `translate(calc(-50% + ${txEye}px), calc(-50% + ${tyEye}px))`;
    mouth.style.transform = `translate(calc(-50% + ${txMouth}px), calc(-50% + ${tyMouth}px))`;
  }

  function resetParts(){
    eyeL.style.transform = 'translate(-50%, -50%)';
    eyeR.style.transform = 'translate(-50%, -50%)';
    mouth.style.transform = 'translate(-50%, -50%)';
  }

  [eyeL, eyeR, mouth].forEach(el=>{
    el.style.transition = 'transform .18s cubic-bezier(.2,.7,.2,1)';
  });

  window.addEventListener('mousemove', moveParts);
  window.addEventListener('mouseleave', resetParts);
  window.addEventListener('touchmove', (e)=>{
    const t = e.touches[0];
    moveParts({ clientX: t.clientX, clientY: t.clientY });
  }, {passive:true});
})();
