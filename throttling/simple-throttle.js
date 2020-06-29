document.body.onload = addElement;
  let parent = throttleButton = null;

  function addElement() {
    // creating throttle button
    let throttleButton = document.createElement("button");
    throttleButton.innerHTML = "<h3>Нажимай максимально быстро</h3>";
    throttleButton.style="background-color: red; width: min-content; padding: 8px; cursor: pointer; text-align: center"
    parent = document.getElementById("parent");
    document.body.insertBefore(throttleButton, parent);

    // optimization method
    const simpleThrottle = (func, limit) => {
      let inThrottle
      return function() {
        const args = arguments
        const context = this
        if (!inThrottle) {
          func.apply(context, args)
          inThrottle = true
          setTimeout(() => inThrottle = false, limit)
        }
      }
    }

    // notification
    var style_0 = ['padding: 1rem;',
             'font: 1.3rem/3 Georgia;',
             'color: red;'].join('');
    console.log('%c%s', style_0, 'Следи за счетчиком вызова')

    // test
    throttleButton.addEventListener('click', simpleThrottle(()=>{
      return console.log('Я буду вызываться не чаще одного раза в секунду')
    }, 1000));
}