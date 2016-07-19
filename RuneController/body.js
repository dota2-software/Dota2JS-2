/*-----------------------------------------------
//////////////// vk.com/d2jscripts //////////////
//////////////// RuneController /////////////////
//////////////// Авторы: ////////////////////////
//////////////// https://vk.com/lalka_karo4 ///// 
//////////////// https://vk.com/the_kako ////////
/////////////////////////////////////////////////
-----------------------End---------------------*/


//интервал(в секундах) через который будет делаться проверка
var interval = 0.1

//var time = Math.floor(Game.GetDOTATime(false,false)%60)


function RuneControllerF() {
    /*
    var DotaTime = Game.GetDOTATime(false, true)
    var Seconds = DotaTime.toFixed(0)
    var Minutes = Math.floor(Seconds / 60)
    Seconds = Seconds % 60
    */

    var time = Math.floor(Game.GetDOTATime(false, false) % 120)

	 if (time == 0)
        GameEvents.SendEventClientSide('antiaddiction_toast', { "message": "Внимание! \nРуны появились.", "duration": "4" })
	
    if (time == 105)
        GameEvents.SendEventClientSide('antiaddiction_toast', { "message": "Внимание! \nДо появления рун осталось 15 секунд.", "duration": "4" })
}

/* Часики 
function UpdateClock(){
    var DotaTime = Game.GetDOTATime( false, true )
    var Seconds = DotaTime.toFixed(0)
    var Minutes = Math.floor(Seconds / 60)
    Seconds = Seconds % 60
    Minutes = Minutes

    if (Minutes == -1)
        Minutes = "-0"

    var ClockText = Minutes+":"

    if (Math.abs(Seconds) < 10)
        ClockText = ClockText+"0"

    if (Seconds < 0)
        ClockText = ClockText+Math.abs(Seconds)
       else
           ClockText = ClockText+Seconds 

    $('#ClockTime').text = ClockText;

    $.Schedule( 0.1, UpdateClock );
} */


var RuneControllerClick = function () {
    if (!RuneController.checked) {
        Game.ScriptLogMsg('Script disabled: RuneController', '#ff0000')
        return
    }


    //циклически замкнутый таймер с проверкой условия с интервалом 'interval'
    function f() {
        $.Schedule(interval, function () {
            RuneControllerF()
            if (RuneController.checked)
                f()
        })
    }
    f()
    Game.ScriptLogMsg('Script enabled: RuneController', '#00ff00')
}

var RuneController = Game.AddScript(1, "RuneController", RuneControllerClick)