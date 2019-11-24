"use strict";

    function randomDiap(n, m) {
            return Math.floor(Math.random() * (m - n + 1)) + n;
    }

    function mood(colorsCount) {
        var colors = ['', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый'];
        if (colorsCount > 7) { colorsCount = 7; }
        console.log('цветов: ' + colorsCount);
        var usedColors = { };
        for (var i = 1; i <= colorsCount; i++) {
            var n = randomDiap(1, 7);
            var colorName = colors[n];
            if (colorName in usedColors) {
                i--;
            } else {
                usedColors[colorName] = 1;
                console.log(colorName);
            }
        }
    }

    mood(9);