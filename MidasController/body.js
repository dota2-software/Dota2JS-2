/*-----------------------------------------------
//////////////// vk.com/d2jscripts //////////////
//////////////// MidasController ////////////////
//////////////// Авторы: ////////////////////////
//////////////// https://vk.com/lalka_karo4 ///// 
//////////////// https://vk.com/the_kako ////////
/////////////////////////////////////////////////
-----------------------End---------------------*/


//интервал(в секундах) через который будет делаться проверка
var interval = 0.1


function MidasControllerF() {
  
   var Midas = Game.GetAbilityByName(User, 'item_hand_of_midas')
   
 if (Game.GetAbilityByName(User, 'item_hand_of_midas') != 1)
 if (Abilities.GetCooldownTimeRemaining(Midas) < 5) {

   GameEvents.SendEventClientSide('antiaddiction_toast', { "message": "Хэй бро, \nMidas перезарядится через 5 секунд.", "duration": "4" })
}}




var MidasControllerClick = function () {
    if (!RuneController.checked) {
        Game.ScriptLogMsg('Script disabled: MidasController', '#ff0000')
        return
    }


    //циклически замкнутый таймер с проверкой условия с интервалом 'interval'
    function f() {
        $.Schedule(interval, function () {
            MidasControllerF()
            if (MidasController.checked)
                f()
        })
    }
    f()
    Game.ScriptLogMsg('Script enabled: MidasController', '#00ff00')
}

var MidasController = Game.AddScript(1, "MidasController", MidasControllerClick)