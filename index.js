const audio = document.querySelector('audio')
const video = document.querySelector('video')
const player = document.querySelector('.player')
const filler = document.getElementById('filler')

const playBtn = document.getElementById('play')
const forwardBtn = document.getElementById('forward')
const backBtn = document.getElementById('back')

const visualizeBtn = document.getElementById('visualize')
const resetBtn = document.getElementById('reset')

let intervalId

const updateBar = () => {
    filler.style.width = `${
        (audio.currentTime / audio.duration.toFixed(3)) * 100
    }%`
}

window.onload = () => {
    video.currentTime = 10
    intervalId = setInterval(() => {
        updateBar()
    }, 1000)
}

const onPlay = () => {
    if (audio.paused) {
        audio.play()
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'
    } else {
        audio.pause()
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>'
    }
}
playBtn.onclick = onPlay

const onForward = () => {
    audio.currentTime = audio.currentTime + 5
    updateBar()
    clearInterval(intervalId)
    intervalId = setInterval(() => {
        updateBar()
    }, 1000)
}
forwardBtn.onclick = onForward

const onBack = () => {
    audio.currentTime = audio.currentTime - 5
    updateBar()
    clearInterval(intervalId)
    intervalId = setInterval(() => {
        updateBar()
    }, 1000)
}
backBtn.onclick = onBack

const onReset = () => {
    audio.currentTime = 0
    updateBar()
    clearInterval(intervalId)
    intervalId = setInterval(() => {
        updateBar()
    }, 1000)
}
resetBtn.onclick = onReset

window.onkeydown = (e) => {
    console.log(e)
    if (e.keyCode === 39) {
        onForward()
    } else if (e.keyCode === 37) {
        onBack()
    } else if (e.keyCode === 32) {
        onPlay()
    }
}

let visualizer = false
const visualizerContainer = document.getElementsByClassName('visualizer')[0]

visualizeBtn.onclick = () => {
    if (visualizer) {
        visualizerContainer.style.top = '-120vh'
        player.parentNode.style.height = '100vh'
        player.parentNode.style.top = '0'
        video.pause()
    } else {
        video.play()
        visualizerContainer.style.top = '0'
        player.parentNode.style.height = '50vh'
        player.parentNode.style.top = '50vh'
    }
    visualizer = !visualizer
}
