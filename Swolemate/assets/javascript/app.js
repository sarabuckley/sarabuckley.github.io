var sel;
var times = 0;
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('select[name="times"]').onchange = changeEventHandler;
}, false);

function changeEventHandler(event) {
    // You can use “this” to refer to the selected element.
    if (!event.target.value) console.log("Please select one!");
    else {
        sel = event.target.value;
        console.log("selected: " + sel);
    }
}



/*
$("#startBtn").on("click", function () {

    var maxTimes = sel;
    var again;
    console.log(maxTimes);
    
    $("#full-timer").Circlebar({
        startTime: sel*60,
        maxValue: sel*60,
        fontSize: "30px",
        triggerPercentage: true,
        fontColor: "#777"

    });
    function cycleTimer() {

        if (times < maxTimes) {
            $("#minute-timer").Circlebar({
                startTime: 60,
                maxValue: 60,
                fontSize: "30px",
                triggerPercentage: true,
                fontColor: "#777"

            });
            times++;
            console.log(times);
            again = setTimeout(cycleTimer, 60000);

        } else {
            clearTimeout(again);
            times = 0;
        }
    };

    cycleTimer();
   
});
*/
