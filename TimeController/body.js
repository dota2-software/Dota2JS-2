/*-----------------------------------------------
//////////////// vk.com/d2jscripts //////////////
//////////////// TimeController ////////////////
//////////////// Авторы: ////////////////////////
//////////////// https://vk.com/lalka_karo4 ///// 
//////////////// https://vk.com/the_kako ////////
/////////////////////////////////////////////////
-----------------------End---------------------*/


//интервал(в секундах) через который будет делаться проверка
var interval = 0.1

midas = true
rune = true

function TimeControllerF() {

    var User = Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID())
    var Midas = Game.GetAbilityByName(User, 'item_hand_of_midas')
    var time = Math.floor(Game.GetDOTATime(false, false) % 120)

    if (rune == true) {
        if (time == 105)
            GameEvents.SendEventClientSide('antiaddiction_toast', { "message": "Внимание! \nДо появления рун осталось 15 секунд.", "duration": "3" })
    }
    if (midas == true) {
        if (Game.GetAbilityByName(User, 'item_hand_of_midas') != 1)
            if (Math.floor(Abilities.GetCooldownTimeRemaining(Midas)) == 5) {
                GameEvents.SendEventClientSide('antiaddiction_toast', { "message": "Хэй бро, \nMidas перезарядится через 5 секунд.", "duration": "4" })
            }
    }
}




var TimeControllerClick = function () {
    if (!TimeController.checked) {
        Game.ScriptLogMsg('Script disabled: TimeController', '#ff0000')
        return
    }

    GameEvents.Subscribe('game_newmap', function () {
        Game.TimeController = false
        Game.TimeController2 = false
    })
    if (!Game.TimeController) {
        Game.TimeController = true
        Game.AddCommand("__MidasTime", function () { if (midas == true) { midas = false } else { midas = true } }, "", 0)
    }
    if (!Game.TimeController2) {
        Game.TimeController2 = true
        Game.AddCommand("__RuneTime", function () { if (rune == true) { rune = false } else { rune = true } }, "", 0)
    }

    //циклически замкнутый таймер с проверкой условия с интервалом 'interval'
    function f() {
        $.Schedule(interval, function () {
            TimeControllerF()
            if (TimeController.checked)
                f()
        })
    }
    f()
    Game.ScriptLogMsg('Script enabled: TimeController', '#00ff00')
}

var TimeController = Game.AddScript(1, "TimeController", TimeControllerClick)