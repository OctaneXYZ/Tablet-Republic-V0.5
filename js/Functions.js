//-_- App-MainMenu
$(document).on("click", ".Tablet-Back-Btn", function () {
    $("body").attr("data-App", "MainMenu");
    $(".MainMenu").scrollLeft(0);
    setTimeout(() => {
        $(".App-LogOutput").removeAttr("data-ShowingTab");
        $(".App-BusinessUpgrade").css("--Page", 0);
        $(".App-BusinessUpgrade").attr("data-Page", 0);
        $(".App-BusinessUpgrade").removeAttr("data-PageStart", "true");
        $(".App-BusinessUpgrade").removeAttr("data-PageEnd", "true");
        $(".Squads-Box").removeClass("Active-Squad");
        $(".Squads-Players").removeClass("Active-Squads-Players");
        $(".BusinessBuy-Box").removeClass("Active-BusinessBuy");
        $(".BusinessBuy-Stage").removeClass("Active-BusinessBuy-Stage");
        $(".App-BuyVehicle").removeAttr("data-showingtab");
        $(".App-BuyItem").removeAttr("data-showingtab");
    }, 300);
});
$(document).on("click", ".MainMenu-App-StartBtn", function () {
    This_App = $(this).attr("data-StartApp");
    $("body").attr("data-App", This_App);
});
var Last_App = "MainMenu";

//-_- Open/Close Tablet
$(document).keydown(function (event) {
    Last_App = $("body").attr("data-App");
    console.log(Last_App);
    if (event.which == 73) {
        Tablet_Up = ($("body").attr("data-Tablet") == "Show");
        if (Tablet_Up) {
            $("body").removeAttr("data-Tablet");
        } else {
            $("body").attr("data-Tablet", "Show");
            setTimeout(() => {
                if (!Tablet_Up) {
                    if (Last_App == undefined) {
                        $("body").attr("data-App", "MainMenu");
                    } else {
                        $("body").attr("data-App", Last_App);
                    }
                }
            }, 300);
            $(".MainMenu").scrollLeft(0);
        }
        setTimeout(() => {
            if (Tablet_Up) {
                $("body").removeAttr("data-App");
            }
        }, 450);
        $(".Main-Inventory").addClass("Main-Inventory-Show");
        $(".Main-Back").addClass("Main-Back-Show");
    }
});

//-_- Money Wash
$(document).on("click", ".MainMenu-App-StartBtn[data-startapp='MoneyWash']", function () {
    $(".MoneyWash-Ammount").val("");
});
var Washing_Time_Hour_Per_Dollar = 0;
var Washing_Time_Min_Per_Dollar = 0;
var Washing_Time_Sec_Per_Dollar = 0.1;
$(document).on("click", ".MoneyWash-Btn", function () {
    let Washing_Time = (Washing_Time_Hour_Per_Dollar * 60 * 60) + (Washing_Time_Min_Per_Dollar * 60) + (Washing_Time_Sec_Per_Dollar);
    let Money_Input = $(".MoneyWash-Ammount").val();
    let Money_Ammount = parseInt($(".MoneyWash-Ammount").val());
    let MoneyWash_Clean_Money = parseInt($(".MoneyWash-Clean-Money").text().replace(/,/g, ""));
    let MoneyWash_Black_Money = parseInt($(".MoneyWash-Black-Money").text().replace(/,/g, ""));
    Is_Washing = ($(".App-MoneyWash").attr("data-IsWashing") == "true");
    // console.log(Money_Ammount);
    // console.log(Washing_Time);
    if (!Is_Washing) {
        if ((Money_Ammount != 0) && (Money_Input != "")) {
            if (Money_Ammount <= MoneyWash_Black_Money) {
                Washing_Time = parseInt((Washing_Time * Money_Ammount));
                // console.log(Washing_Time);
                $(".MoneyWash-Clock-Bar-Val").css("--Rate", 0);
                $(".App-MoneyWash").attr("data-IsWashing", "true");
                var Seconds_Remaining = Washing_Time;
                New_Washing_Second(Seconds_Remaining, Washing_Time);
                Seconds_Remaining = Seconds_Remaining - .1;
                Washing_Seconds_Remaining = setInterval(function () {
                    if (Seconds_Remaining > 0) {
                        New_Washing_Second(Seconds_Remaining, Washing_Time);
                        Seconds_Remaining = Seconds_Remaining - .1;
                    }
                    else {
                        MoneyWash_Clean_Money = (MoneyWash_Clean_Money + Money_Ammount);
                        MoneyWash_Black_Money = (MoneyWash_Black_Money - Money_Ammount);
                        // console.log(MoneyWash_Clean_Money, MoneyWash_Black_Money)
                        $(".MoneyWash-Clock").text("- - : - - : - -");
                        $(".MoneyWash-Clean-Money").text(MoneyWash_Clean_Money.toLocaleString());
                        $(".MoneyWash-Black-Money").text(MoneyWash_Black_Money.toLocaleString());
                        $(".App-MoneyWash").removeAttr("data-IsWashing");
                        clearInterval(Washing_Seconds_Remaining);
                    }
                }, 100);
            }
            else {
                $(".App-MoneyWash").attr("data-MaxReached", "true");
            }
        }
    }
});
$(document).on("click keypress keyup keydown focus ", ".MoneyWash-Ammount", function () {
    $(".App-MoneyWash").removeAttr("data-MaxReached");
});
function New_Washing_Second(Seconds_Remaining, Washing_Time) {
    // $(".MoneyWash-Clock").text(new Date(Seconds_Remaining * 1000).toISOString().substring(11, 16));
    $(".MoneyWash-Clock").text(new Date(Seconds_Remaining * 1000).toISOString().substring(11, 19));
    let Time_Percentage = ((100 / Washing_Time) * (Washing_Time - Seconds_Remaining));
    $(".MoneyWash-Clock-Bar-Val").css("--Rate", Time_Percentage);
}

//-_- Mails
$(document).on("click", ".MainMenu-App-StartBtn[data-startapp='Mails']", function () {
    $(".Mails-Container").scrollTop(0);
});

//-_- LogOutput
$(document).on("click", ".MainMenu-App-StartBtn[data-startapp='LogOutput']", function () {
    $(".LogOutput-Tab-Container:nth-child(1) .LogOutput-Tab").click();
    $(".LogOutput-Container").scrollTop(0);
});
$(document).on("click", ".LogOutput-Tab", function () {
    let This_Tab = $(this).attr("data-Tab");
    $(".App-LogOutput").attr("data-ShowingTab", This_Tab);
    $(`.LogOutput-Box-Section[data-section='${This_Tab}']`).scrollTop(0);
});

//-_- MOTD
$(document).on("click", ".MainMenu-App-StartBtn[data-startapp='MOTD']", function () {
    $(".MOTD-Box-Text").scrollTop(0);
    $(".MOTD-Input").val("");
});
$(document).on("click", ".MOTD-Btn", function () {
    let New_Message = $(".MOTD-Input").val();
    $(".MOTD-Box-Text").text(New_Message);
    $(".MOTD-Input").val("");
});

//-_- BusinessManage
var Player_BlackMoeny_Deposit = 5000000;
var Player_BlackMoeny_Money = 1000;
var Player_WhiteMoeny_Deposit = 5000000;
var Player_WhiteMoeny_Money = 1000;
$(document).on("click", ".MainMenu-App-StartBtn[data-startapp='BusinessManage']", function () {
    Update_BusinessManage();
    $(".BusinessManage-Money-Box:nth-child(1) .BusinessManage-Money-Tab").click();
    $(".BusinessManage-Ammount").val("");
});
function Update_BusinessManage() {
    $(".BusinessManage-Money-Text[data-DepositVal='BlackMoeny']").text(Player_BlackMoeny_Deposit.toLocaleString());
    $(".BusinessManage-Money-Text[data-MoneyVal='BlackMoeny']").text(Player_BlackMoeny_Money.toLocaleString());
    $(".BusinessManage-Money-Text[data-DepositVal='WhiteMoeny']").text(Player_WhiteMoeny_Deposit.toLocaleString());
    $(".BusinessManage-Money-Text[data-MoneyVal='WhiteMoeny']").text(Player_WhiteMoeny_Money.toLocaleString());
}
$(document).on("click", ".BusinessManage-Money-Tab", function () {
    let This_Tab = $(this).attr("data-Money");
    $(".App-BusinessManage").attr("data-ShowingMoney", This_Tab);
});
$(document).on("click", ".BusinessManage-Deposit", function () {
    let Player_Money;
    let Player_Deposit;
    let Active_Tab = $(".App-BusinessManage").attr("data-ShowingMoney");
    if (Active_Tab == "BlackMoeny") {
        Player_Deposit = Player_BlackMoeny_Deposit;
        Player_Money = Player_BlackMoeny_Money;
    } else if (Active_Tab == "WhiteMoeny") {
        Player_Deposit = Player_WhiteMoeny_Deposit;
        Player_Money = Player_WhiteMoeny_Money;
    }
    let Player_Old_Money = Player_Money;
    let Player_Old_Deposit = Player_Deposit;
    let Transaction_Ammount = parseInt($(".BusinessManage-Ammount").val());
    if (Player_Money < Transaction_Ammount) {
        $(".App-BusinessManage").attr(`data-NotEnough${Active_Tab}Money`, "true");
        console.log(`Player Old ${Active_Tab} Money : ${Player_Old_Money} ||| NOT ENOUGTH to Deposit`);
    } else {
        Player_Deposit = Player_Deposit + Transaction_Ammount;
        Player_Money = Player_Money - Transaction_Ammount;
        if (Active_Tab == "BlackMoeny") {
            Player_BlackMoeny_Deposit = Player_Deposit;
            Player_BlackMoeny_Money = Player_Money;
        } else if (Active_Tab == "WhiteMoeny") {
            Player_WhiteMoeny_Deposit = Player_Deposit;
            Player_WhiteMoeny_Money = Player_Money;
        }
        Update_BusinessManage();
        console.log(`
        Old ${Active_Tab} Money : ${Player_Old_Money} \n
        New ${Active_Tab} Money is : ${Player_Money}\n
        Old ${Active_Tab} Deposit : ${Player_Old_Deposit} \n
        New ${Active_Tab} Deposit is : ${Player_Deposit} 
        `
        );
    }
});
$(document).on("click", ".BusinessManage-Withdraw", function () {
    let Player_Money;
    let Player_Deposit;
    let Active_Tab = $(".App-BusinessManage").attr("data-ShowingMoney");
    if (Active_Tab == "BlackMoeny") {
        Player_Deposit = Player_BlackMoeny_Deposit;
        Player_Money = Player_BlackMoeny_Money;
    } else if (Active_Tab == "WhiteMoeny") {
        Player_Deposit = Player_WhiteMoeny_Deposit;
        Player_Money = Player_WhiteMoeny_Money;
    }
    let Player_Old_Money = Player_Money;
    let Player_Old_Deposit = Player_Deposit;
    let Transaction_Ammount = parseInt($(".BusinessManage-Ammount").val());
    if (Player_Deposit < Transaction_Ammount) {
        $(".App-BusinessManage").attr(`data-NotEnough${Active_Tab}Deposit`, "true");
        console.log(`Player ${Active_Tab} Deposit : ${Player_Old_Money} ||| NOT ENOUGTH to Withdraw`);
    } else {
        Player_Deposit = Player_Deposit - Transaction_Ammount;
        Player_Money = Player_Money + Transaction_Ammount;
        if (Active_Tab == "BlackMoeny") {
            Player_BlackMoeny_Deposit = Player_Deposit;
            Player_BlackMoeny_Money = Player_Money;
        } else if (Active_Tab == "WhiteMoeny") {
            Player_WhiteMoeny_Deposit = Player_Deposit;
            Player_WhiteMoeny_Money = Player_Money;
        }
        Update_BusinessManage();
        console.log(`
        Old ${Active_Tab} Money : ${Player_Old_Money} \n
        New ${Active_Tab} Money is : ${Player_Money}\n
        Old ${Active_Tab} Deposit : ${Player_Old_Deposit} \n
        New ${Active_Tab} Deposit is : ${Player_Deposit} 
        `
        );
    }
});
$(document).on("click keypress keyup keydown focus", ".BusinessManage-Money-Tab, .BusinessManage-Ammount", function () {
    $(".App-BusinessManage").removeAttr("data-NotEnoughWhiteMoenyMoney").removeAttr("data-NotEnoughBlackMoenyMoney").removeAttr("data-NotEnoughWhiteMoenyDeposit").removeAttr("data-NotEnoughBlackMoenyDeposit");
});
$(document).on("click keypress keyup keydown focus", ".BusinessManage-Money-Tab, .BusinessManage-Deposit", function () {
    $(".App-BusinessManage").removeAttr("data-NotEnoughWhiteMoenyDeposit").removeAttr("data-NotEnoughBlackMoenyDeposit");
});
$(document).on("click keypress keyup keydown focus", ".BusinessManage-Money-Tab, .BusinessManage-Withdraw", function () {
    $(".App-BusinessManage").removeAttr("data-NotEnoughWhiteMoenyMoney").removeAttr("data-NotEnoughBlackMoenyMoney");
});

//-_- Members
$(document).on("click", ".MainMenu-App-StartBtn[data-startapp='Members']", function () {
    $(".Members").scrollTop(0);
});

//-_- BusinessUpgrade
$(document).on("click", ".MainMenu-App-StartBtn[data-startapp='BusinessUpgrade']", function () {
    $(".App-BusinessUpgrade").css("--Page", 1);
    $(".App-BusinessUpgrade").attr("data-Page", 1);
    $(".App-BusinessUpgrade").attr("data-PageStart", "true");
});
$(document).on("click", ".BusinessUpgrade-Button-Left", function () {
    let This_Page = $(".App-BusinessUpgrade").css("--Page");
    var Pages = $('.BusinessUpgrade-Boxes-Page').length;
    console.log(This_Page, Pages);
    if (This_Page > 1) {
        This_Page--;
        $(".App-BusinessUpgrade").css("--Page", This_Page);
        $(".App-BusinessUpgrade").attr("data-Page", This_Page);
        console.log(This_Page, Pages);
    }
    if (This_Page == 1) {
        $(".App-BusinessUpgrade").removeAttr("data-PageEnd");
        $(".App-BusinessUpgrade").attr("data-PageStart", "true");
    } else if (This_Page == Pages) {
        $(".App-BusinessUpgrade").removeAttr("data-PageStart");
        $(".App-BusinessUpgrade").attr("data-PageEnd", "true");
    } else {
        $(".App-BusinessUpgrade").removeAttr("data-PageStart");
        $(".App-BusinessUpgrade").removeAttr("data-PageEnd");
    }
});
$(document).on("click", ".BusinessUpgrade-Button-Right", function () {
    let This_Page = $(".App-BusinessUpgrade").css("--Page");
    var Pages = $('.BusinessUpgrade-Boxes-Page').length;
    console.log(This_Page, Pages);
    if (This_Page < Pages) {
        This_Page++;
        $(".App-BusinessUpgrade").css("--Page", This_Page);
        $(".App-BusinessUpgrade").attr("data-Page", This_Page);
        console.log(This_Page, Pages);
    }
    if (This_Page == 1) {
        $(".App-BusinessUpgrade").removeAttr("data-PageEnd");
        $(".App-BusinessUpgrade").attr("data-PageStart", "true");
    } else if (This_Page == Pages) {
        $(".App-BusinessUpgrade").removeAttr("data-PageStart");
        $(".App-BusinessUpgrade").attr("data-PageEnd", "true");
    } else {
        $(".App-BusinessUpgrade").removeAttr("data-PageStart");
        $(".App-BusinessUpgrade").removeAttr("data-PageEnd");
    }
});

//-_- Squads
$(document).on("click", ".MainMenu-App-StartBtn[data-startapp='Squads']", function () {
    $(".Squads-Box-Container:nth-child(1) .Squads-Box").click();
    $(".Squads-Container").click().scrollTop(0);
});
$(document).on("click", ".Squads-Box", function () {
    let This_Squad = $(this).parent().index() + 1;
    $(".Squads-Box").removeClass("Active-Squad");
    $(`.Squads-Box-Container:nth-child(${This_Squad}) .Squads-Box`).addClass("Active-Squad");
    $(".Squads-Players").removeClass("Active-Squads-Players");
    $(`.Squads-Players:nth-child(${This_Squad})`).addClass("Active-Squads-Players");
    $(`.Squads-Players:nth-child(${This_Squad})`).scrollTop(0);
});

//-_- BusinessBuy
$(document).on("click", ".MainMenu-App-StartBtn[data-startapp='BusinessBuy']", function () {
    $(".BusinessBuy-Box-Container:nth-child(1) .BusinessBuy-Box").click();
    $(".BusinessBuy-Container").click().scrollTop(0);
});
$(document).on("click", ".BusinessBuy-Box", function () {
    let This_Squad = $(this).parent().index() + 1;
    $(".BusinessBuy-Box").removeClass("Active-Squad");
    $(`.BusinessBuy-Box-Container:nth-child(${This_Squad}) .BusinessBuy-Box`).addClass("Active-Squad");
    $(".BusinessBuy-Stage").removeClass("Active-BusinessBuy-Stage");
    $(`.BusinessBuy-Stage:nth-child(${This_Squad})`).addClass("Active-BusinessBuy-Stage");
    $(`.BusinessBuy-Stage:nth-child(${This_Squad})`).scrollTop(0);
});

//-_- BuyVehicle
$(document).on("click", ".MainMenu-App-StartBtn[data-startapp='BuyVehicle']", function () {
    $(".BuyVehicle-Tab-Container:nth-child(1) .BuyVehicle-Tab").click();
});
$(document).on("click", ".BuyVehicle-Tab-Buy", function () {
    $(".App-BuyVehicle").attr("data-ShowingTab", "Buy");
});
$(document).on("click", ".BuyVehicle-Tab-Own", function () {
    $(".App-BuyVehicle").attr("data-ShowingTab", "Own");
});
$(document).on("click", ".BuyVehicle-Tab-Fav", function () {
    let Is_Fav = ($(".App-BuyVehicle").attr("data-ShowFav") == "true");
    if (Is_Fav) {
        $(".App-BuyVehicle").removeAttr("data-ShowFav");
    } else {
        $(".App-BuyVehicle").attr("data-ShowFav", "true");
    }
    console.log(Is_Fav);
});
$(document).on("click", ".BuyVehicle-Box-Fav-Box", function () {
    let Is_Fav = ($(this).parent().parent().parent().attr("data-Fav") == "true");
    if (Is_Fav) {
        $(this).parent().parent().parent().removeAttr("data-Fav")
    } else {
        $(this).parent().parent().parent().attr("data-Fav", "true")
    }
    console.log(Is_Fav);
});
$(document).on("click", ".BuyVehicle-BuySection .BuyVehicle-Box-Btn", function () {
    let This_Box = ($(this).parent().parent().parent());
    This_Box.clone().appendTo(".BuyVehicle-OwnSection");
});

//-_- Buy-Item
$(document).on("click", ".MainMenu-App-StartBtn[data-startapp='BuyItem']", function () {
    $(".BuyItem-Tab-Container:nth-child(1) .BuyItem-Tab").click();
});
$(document).on("click", ".BuyItem-Tab-Shop,  .BuyItem-Delivery .BuyItem-Box-Buy-Btn", function () {
    $(".App-BuyItem").attr("data-ShowingTab", "Shop");
});
$(document).on("click", ".BuyItem-Tab-Delivery", function () {
    $(".App-BuyItem").attr("data-ShowingTab", "Delivery");
    Start_Test_Timer();
});
$(document).on("click", ".BuyItem-Tab-Lager", function () {
    $(".App-BuyItem").attr("data-ShowingTab", "Lager");
});
$(document).on("click", "[data-Ready='true'] .BuyItem-Amount-Box", function () {
    let Collect_Me = $(this).parent();
    console.log(Collect_Me);
    Collect_Me.remove()
});
$(document).on("click", ".BuyItem-Amount-Minus", function () {
    Current_Amount = parseInt($(this).parent().parent().find(".BuyItem-Amount").text());
    if (Current_Amount > 1) {
        Current_Amount--
        $(this).parent().parent().find(".BuyItem-Amount").text(Current_Amount)
    } 
});
$(document).on("click", ".BuyItem-Amount-Plus", function () {
    Current_Amount = parseInt($(this).parent().parent().find(".BuyItem-Amount").text());
    Current_Stuck = parseInt($(this).parent().parent().parent().find(".BuyItem-Box-Stock").text());
    if (Current_Amount < Current_Stuck) {
        Current_Amount++
        $(this).parent().parent().find(".BuyItem-Amount").text(Current_Amount)
    } 
});
function Start_Test_Timer() {
    var Test_Seconds_Remaining = 7;
    $(".BuyItem-Time").text(new Date(Test_Seconds_Remaining * 1000).toISOString().substring(11, 19));
    Waiting_Test_Seconds_Remaining = setInterval(function () {
        if (Test_Seconds_Remaining > 0) {
            Test_Seconds_Remaining--;
            $(".BuyItem-Time").text(new Date(Test_Seconds_Remaining * 1000).toISOString().substring(11, 19));
        }
        else {
            $(".BuyItem-Delivery .BuyItem-Box-Container").attr("data-Ready", "true");
            clearInterval(Waiting_Test_Seconds_Remaining);
        }
        console.log(Test_Seconds_Remaining)
    }, 1000);
}