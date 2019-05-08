var myName = "马磊";

var myacronym = "MLM";

function test(abbr){
    var result = []
    for(var i = 0; i < abbr.length; i++ ){
        var j = i;
        result[i] = function(){
            return abbr.charCodeAt(j);
        }
    }
    return result;
}

function sum(arr){
    var result = 0;
    for (let i = 0; i < arr.length; i++) {
        result += arr[i]();
    }
    return result;
}

var fs = test(myacronym);
console.log(sum(fs));