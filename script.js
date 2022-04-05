const $saved = document.getElementById('saved')
const $countdown = document.getElementById('countdown')
const $form = document.getElementById('form')
const $title = document.getElementById('title')
const $datetime = document.getElementById('datetime')
const $clear = document.getElementById('clear')


function dateDiff (start, end) {
    const diff = end - start > 0 ? end - start : 0
    const format = (num) => num < 10 ? `0${num}` : num
    
    return {
      days: format(Math.floor(diff / 1000 / 60 / 60 / 24)),
      hours: format(Math.floor(diff / 1000 / 60 / 60 % 24)),
      minutes: format(Math.floor(diff / 1000 / 60 % 60)),
      seconds: format(Math.floor(diff / 1000 % 60))
    }
  }

//add EventListener to submit button
$form.addEventListener('submit', function(e){
    e.preventDefault()

    //Stores data localStorage
    localStorage.setItem('targets', $title.value)
    localStorage.setItem('target', $datetime.value)
    

    timer = setInterval(function(){
        const now = new Date()
        const target = new Date($datetime.value)

        const diff = dateDiff(now, target)

        // const title = localStorage.getItem('targets')
        // $saved.innerHTML = title
        $countdown.innerHTML = `${diff.days}d : ${diff.hours}h : ${diff.minutes}m : ${diff.seconds}s`
    })

    $form.style.display = 'none'
    $clear.style.display = 'block'
})

//retrieve data from localStorage
const ls = localStorage.getItem('target')

if(ls){
    timer = setInterval(function(){
        const now = new Date()
        const target = new Date(ls)

        const diff = dateDiff(now, target)

        $saved.innerHTML = $title
        $countdown.innerHTML = `${diff.days}d : ${diff.hours}h : ${diff.minutes}m : ${diff.seconds}s`
    })
    $form.style.display = 'none'
    $clear.style.display = 'block'
}

//adds click event to clear the countdown
$clear.addEventListener('click', function(e){
    clearInterval(timer)
    localStorage.removeItem('target')
    $countdown.innerHTML = '00:00:00:00'
    $clear.style.display = 'none'
})