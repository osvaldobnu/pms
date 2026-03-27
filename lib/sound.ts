export function playBeep({
    frequency = 880, // Hz (880 = beep agradável)
    duration = 200,  // ms
    volume = 0.2,
} = {}) {
    if (typeof window === 'undefined') return

    const AudioContext =
        window.AudioContext || (window as any).webkitAudioContext

    const context = new AudioContext()

    const oscillator = context.createOscillator()
    const gain = context.createGain()

    oscillator.type = 'sine'
    oscillator.frequency.value = frequency

    gain.gain.value = volume

    oscillator.connect(gain)
    gain.connect(context.destination)

    oscillator.start()

    setTimeout(() => {
        oscillator.stop()
        context.close()
    }, duration)
}