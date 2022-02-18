function copySamples () {
    tmpListLF = list_Left
    tmpListRF = list_Right
    list_Left = []
    list_Right = []
}
function sendData () {
    basic.showString("B")
    for (let värde of tmpListLF) {
        bluetooth.uartWriteValue("LF", värde)
    }
    basic.pause(100)
    for (let värde of tmpListRF) {
        bluetooth.uartWriteValue("RF", värde)
    }
    basic.showIcon(IconNames.Happy)
}
function initConstants () {
    music.setVolume(0)
    k_LF = 1.8379
    m_LF = -901
    k_RF = 2.0824
    m_RF = -1026
    invers = 1023
    g = 9.82
    list_Right = []
    list_Left = []
    tmpListLF = []
    tmpListRF = []
    pauseTime = 4.7
    frequency = 200
    sampleTotalTime = 5
    t1 = 0
    t2 = 0
    currpt = []
}
bluetooth.onBluetoothConnected(function () {
    basic.showString("C")
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showString("D")
    control.reset()
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    basic.showString("C")
    initCountdown()
    sampleToLists()
    copySamples()
    basic.pause(100)
    sendData()
    bluetooth.uartWriteValue("D", 0)
    reset()
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
    seqNo = seqNo + 1
    bluetooth.uartWriteNumber(seqNo)
})
function initServices () {
    bluetooth.startUartService()
    bluetooth.setTransmitPower(7)
}
function falseStart () {
    basic.showString("F")
}
function initCountdown () {
    for (let index = 0; index <= 2; index++) {
        music.playTone(392, music.beat(BeatFraction.Half))
        basic.pause(748.278)
    }
    music.playTone(698, music.beat(BeatFraction.Whole))
}
function reset () {
    tmpListLF = []
    tmpListRF = []
}
function sampleToLists () {
    for (let index = 0; index < sampleTotalTime; index++) {
        for (let index = 0; index < frequency; index++) {
            tmp_RF = invers - pins.analogReadPin(AnalogPin.P1)
            var_RF = k_RF * tmp_RF + m_RF
            var_RF = var_RF * g
            list_Right.push(var_RF)
            tmp_LF = invers - pins.analogReadPin(AnalogPin.P2)
            var_LF = k_LF * tmp_LF + m_LF
            var_LF = var_LF * g
            list_Left.push(var_LF)
            basic.pause(pauseTime)
        }
    }
}
let var_LF = 0
let tmp_LF = 0
let var_RF = 0
let tmp_RF = 0
let currpt: number[] = []
let t2 = 0
let t1 = 0
let sampleTotalTime = 0
let frequency = 0
let pauseTime = 0
let g = 0
let invers = 0
let m_RF = 0
let k_RF = 0
let m_LF = 0
let k_LF = 0
let list_Right: number[] = []
let tmpListRF: number[] = []
let list_Left: number[] = []
let tmpListLF: number[] = []
let seqNo = 0
seqNo = 0
initServices()
initConstants()
basic.showLeds(`
    # . . # #
    # . . # #
    # # # . .
    # . # . .
    # # # . .
    `)
basic.forever(function () {
	
})
