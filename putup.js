var LevelsMap = []; // array with level definition
var SpriteWidth = 32; // width of a single sprite
var SpriteHeight = 32; // height of  single sprite
var SceneInterval = 500; // 0.5 secs - refresh timeout (for scene motion)
var PlayerInterval = 100; // 0.100 secs  - refresh player interval (for characters moving) 
var EnemyInterval = 250; // 0.250 sec - refresh enemy move

var SceneTimer; // timer for scene's objects motions
var PlayerTimer;  // timer for player object motions
var EnemyTimer; // timer for enemy object moving
var CurrentLevel; // Currently playing level

var Enemies = []; // enemies property
var Player  = []; // player properties
var Levels  = []; // levels properties
var FlyingTop;    // fly 3 times on top before falling in jump mode
var Lives   = 3;  // number of lives

// enemy directions
var _UP = 0;
var _LEFT = 1;
var _DOWN = 2;
var _RIGHT = 3;

// Initialization of all levels (setting up levels)
function InitializeLevels()
{
    /*
        0 - space
        1 - wall
        2 - fire
        3 - key (1000 points)
        4 - lock
        5 - lock unlocked
        6 - secret
        7 - hidden secret (wall)
        8 - hidden block (space)
        9 - exit placeholder (wall)
        10 - exit (100 points for each time left)
        20 - Item Apple (500 points)
        21 - Item Cherry (100 points)
        22 - Item Pineaplle (500 points)
        23 - Item Grape (800 points)
        25 - Extra life
        30 - Enemy Type 1
        40 - Enemy Type 2
        50 - Enemy Type 3
        
    */ 
    
    var MapIndex = 0; // initial level
    // level data
    LevelsMap[MapIndex] = [
                            1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
                            1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
                            1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  4,  1,
                            1,  0,  0, 23, 23,  0,  0,  0,  0,  0,  0,  8,  0,  0,  1,  1,
                            1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  7,  0,  0,  1,  1,  1,
                            1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,  1,
                            1,  0, 20, 20,  0,  0,  0,  0,  0,  8,  0,  0,  1,  1,  1,  1,
                            1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  6,  1,  1,  1,  1,
                            1,  1,  1,  1,  1,  0,  0,  0,  0,  0,  9,  1,  1,  1,  1,  1,
                            1,  3,  0,  0,  0,  0,  0,  0,  0,  0,  0, 21, 21, 20, 20,  1,
                            1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1
    ];
    Player[MapIndex] = {"x":1, "y":3, "motionX":1, "motionY":3, "prev_motionX":0, "moveLeft":false, "moveRight":false, "jump":false, "jumpStartX":0, "jumpStartY":0, "fall":false, "action":false};
    Levels[MapIndex] = {"keys":0, "keys_collected":0, "locks":0, "locks_opened":0, "score":0, "time": 16};
    Enemies[MapIndex] = [
                            {"type":30, "x": 8 ,"y": 3,"direction":_LEFT, "motionX":8, "motionY":3},
                            {"type":30, "x": 6 ,"y": 6,"direction":_LEFT, "motionX":6, "motionY":6}
                        ];


    MapIndex++;
    LevelsMap[MapIndex] = [
                            1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
                            1,  0,  0,  0,  0,  0, 21, 21,  1, 20, 20,  0,  0,  0,  0,  1,
                            1,  0,  0,  1,  1,  1,  1,  1,  1,  4,  1,  1,  1,  1,  0,  1,
                            1,  1,  0,  0,  0,  0, 21, 21,  1, 20, 20,  0,  0,  0,  0,  1,
                            1,  3,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,
                            1,  1,  0,  0,  0,  0, 21, 21,  1, 20, 20,  0,  0,  0,  1,  1,
                            1,  1,  1,  0,  0,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,
                            1,  1,  1,  1,  0,  0, 21, 21,  1, 20,  0,  0,  0,  1,  1,  1,
                            1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  0,  1,  1,  1,  9,  1,
                            1, 20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,  1,
                            1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1
    ];
    Player[MapIndex] = {"x":1, "y":2, "motionX":1, "motionY":2, "prev_motionX":0, "moveLeft":false, "moveRight":false, "jump":false, "jumpStartX":0, "jumpStartY":0, "fall":false, "action":false};
    Levels[MapIndex] = {"keys":0, "keys_collected":0, "locks":0, "locks_opened":0, "score":0, "time": 16};
    Enemies[MapIndex] = [
                            {"type":30, "x": 4 ,"y": 9,"direction":_LEFT, "motionX":4, "motionY":9},
                            {"type":30, "x": 11 ,"y": 9,"direction":_LEFT, "motionX":11, "motionY":9}
                        ];
    MapIndex++;
    LevelsMap[MapIndex] = [
                            1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
                            1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
                            1,  0,  0,  0,  0,  0,  0, 20, 20,  0,  0,  0,  0,  0,  0,  1,
                            1,  1,  0,  0,  0,  0,  0,  1,  4,  0,  0,  0,  0,  0,  1,  1,
                            1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
                            1,  8,  0,  0,  0,  0,  0,  8,  8,  0,  0,  0,  0,  0,  8,  1,
                            1,  0,  1,  1,  1,  1,  1,  0,  0,  1,  1,  1,  1,  1,  0,  1,
                            1, 22,  0,  0,  1,  0,  0,  3, 20,  0,  0,  1,  0,  0, 22,  1,
                            1,  1,  0,  0,  1,  0,  0,  1,  1,  0,  0,  1,  0,  0,  1,  1,
                            1,  0,  0,  0,  9,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  1,
                            1,  2,  2,  2,  1,  2,  2,  2,  2,  2,  2,  1,  2,  2,  2,  1
    ];
    Player[MapIndex] = {"x":1, "y":0, "motionX":1, "motionY":0, "prev_motionX":0, "moveLeft":false, "moveRight":false, "jump":false, "jumpStartX":0, "jumpStartY":0, "fall":false, "action":false};
    Levels[MapIndex] = {"keys":0, "keys_collected":0, "locks":0, "locks_opened":0, "score":0, "time": 16};
    Enemies[MapIndex] = [
                            {"type":30, "x": 3 , "y": 5, "direction":_RIGHT, "motionX":3,  "motionY":5},
                            {"type":30, "x": 12, "y": 5, "direction":_LEFT,  "motionX":12, "motionY":5}
                        ];
    MapIndex++;
    LevelsMap[MapIndex] = [
                            1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
                            1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
                            1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 40,  0,  0,  3,  1,
                            1,  0,  4,  1,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,  1,  1,
                            1,  0,  0,  0,  0,  0, 40,  0,  0,  0,  0,  0,  0,  0,  0,  1,
                            1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,
                            1,  0,  0,  0,  0,  0,  0, 22, 22,  0,  0,  0,  0,  0,  0,  1,
                            1,  0,  0,  0,  0,  0,  0,  1,  1,  0,  0,  0,  0,  0,  0,  1,
                            1,  0,  0,  0,  0,  0,  1,  1,  1,  1,  0,  0,  0,  0,  0,  1,
                            1, 20, 20, 20, 20,  1,  1,  1,  1,  1,  1, 20, 20, 20, 20,  9,
                            1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1
    ];
    Player[MapIndex] = {"x":1, "y":6, "motionX":1, "motionY":6, "prev_motionX":0, "moveLeft":false, "moveRight":false, "jump":false, "jumpStartX":0, "jumpStartY":0, "fall":false, "action":false};
    Levels[MapIndex] = {"keys":0, "keys_collected":0, "locks":0, "locks_opened":0, "score":0, "time": 16};
    Enemies[MapIndex] = [
                            {"type":40, "x": 6 , "y": 4, "direction":_LEFT, "motionX":6 , "motionY":4},
                            {"type":40, "x": 11, "y": 2, "direction":_LEFT, "motionX":11, "motionY":2}
                        ];

    MapIndex++;
    LevelsMap[MapIndex] = [
                            1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 
                            1,  0,  0,  0,  1,  1,  1,  1,  0, 22, 22, 22, 22, 22,  0,  1,
                            1,  0,  0,  0,  0,  0,  1,  0,  0, 22, 22, 22, 22, 22, 23,  1,
                            1,  1,  0,  1,  1,  0,  1,  6,  0,  1,  1,  1,  1,  1,  1,  1,
                            1,  1,  0,  1,  0,  0,  0,  0,  0,  0,  1,  1,  0,  0,  0,  1,
                            1,  3,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  4,  0,  0,  1,
                            1,  1,  0,  1,  2,  2,  2,  2,  2,  2,  2,  1,  0,  0,  1,  1,  
                            1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  1, 
                            1,  1,  0,  0,  0,  1,  1,  0,  0,  1,  1,  1,  1,  0,  0,  1,
                            1,  9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1, 
                            1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 
    ];
    Player[MapIndex] = {"x":1, "y":2, "motionX":1, "motionY":2, "prev_motionX":0, "moveLeft":false, "moveRight":false, "jump":false, "jumpStartX":0, "jumpStartY":0, "fall":false, "action":false};
    Levels[MapIndex] = {"keys":0, "keys_collected":0, "locks":0, "locks_opened":0, "score":0, "time": 16};
    Enemies[MapIndex] = [
                            {"type":30, "x": 8 , "y": 5, "direction":_LEFT, "motionX":8 , "motionY":5},
                            {"type":30, "x": 10, "y": 9, "direction":_LEFT, "motionX":10, "motionY":9}
                        ];

    MapIndex++;
    LevelsMap[MapIndex] = [  
                            1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
                            1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1, 
                            1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  0,  1, 
                            1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  1, 
                            1,  0, 20, 22, 23,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1, 
                            1,  0,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
                            1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
                            1,  0,  1,  4,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1, 
                            1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1, 
                            1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  
                            1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  9,  2,  2,  1
    ];

    Player[MapIndex] = {"x":1, "y":1, "motionX":1, "motionY":1, "prev_motionX":0, "moveLeft":false, "moveRight":false, "jump":false, "jumpStartX":0, "jumpStartY":0, "fall":false, "action":false};
    Levels[MapIndex] = {"keys":0, "keys_collected":0, "locks":0, "locks_opened":0, "score":0, "time": 16};
    Enemies[MapIndex] = [
                            {"type":30, "x": 6 , "y": 4, "direction":_LEFT, "motionX":6 , "motionY":4},
                            {"type":30, "x": 10, "y": 7, "direction":_RIGHT, "motionX":10, "motionY":7}
                        ];
    MapIndex++;
    LevelsMap[MapIndex] = [ 
                            1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  
                            2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2,
                            2,  0,  0,  0,  8,  0,  0,  0,  0,  0,  8,  0,  0,  0,  0,  2,
                            2,  2,  0,  0,  0,  1,  1,  0,  1,  1,  0,  0,  0,  0,  2,  2,
                            2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2,
                            2,  2,  0,  0,  0,  1,  1,  3,  1,  1,  0,  0,  0,  0,  2,  2,
                            2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2,
                            2,  2,  0,  0,  0,  1,  1,  0,  1,  1,  0, 22, 22,  0,  2,  2, 
                            2, 22, 22, 22, 22,  1,  1,  1,  1,  1,  0,  1,  1,  7,  2,  2,  
                            2,  1,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  4,  0,  2, 
                            2,  1,  1,  1,  1,  1,  1,  9,  1,  1,  1,  1,  1,  2,  1,  1    
    ];

    Player[MapIndex] = {"x":7, "y":1, "motionX":7, "motionY":1, "prev_motionX":0, "moveLeft":false, "moveRight":false, "jump":false, "jumpStartX":0, "jumpStartY":0, "fall":false, "action":false};
    Levels[MapIndex] = {"keys":0, "keys_collected":0, "locks":0, "locks_opened":0, "score":0, "time": 16};
    Enemies[MapIndex] = [
                            {"type":40, "x": 1 , "y": 1, "direction":_LEFT, "motionX":1 , "motionY":1},
                            {"type":40, "x": 14, "y": 1, "direction":_RIGHT, "motionX":14, "motionY":1},
                            {"type":30, "x": 5, "y": 2, "direction":_RIGHT, "motionX":5, "motionY":2},
                        ];
    MapIndex++;
    LevelsMap[MapIndex] = [
                           1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 
                           1, 99,  0,  0,  0,  0,  0,  0,  1, 30,  0,  0,  0,  0,  0,  1, 
                           1,  0,  0,  0,  1,  1,  1,  0,  1, 21, 21,  0,  0,  0,  0,  1,
                           1,  0,  0,  0,  0,  1,  0,  0,  1,  1,  1,  0,  0,  0,  0,  1, 
                           1,  1,  0,  0,  1,  1,  1, 50,  0,  0,  0,  0,  0,  0,  0,  1,
                           1,  0, 20, 20,  1,  1,  0,  0,  0,  1,  1,  0,  0,  0,  4,  1,
                           1,  0,  1,  1,  1,  1,  1,  0,  0,  1,  1,  0, 23, 23,  0,  1,   
                           1,  0, 22, 22,  0,  1,  0,  0,  0,  1,  1,  0,  1,  1,  0,  1, 
                           1,  1,  1,  1,  0,  1,  1,  0,  0,  1,  0,  0,  0,  0,  0,  1,
                           1,  0,  3,  0,  0,  1,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1, 
                           1,  1,  1,  1,  1,  1,  1,  2,  2,  1,  2,  2,  2,  2,  2,  1
                        ];
    MapIndex++;
    LevelsMap[MapIndex] = [ 
                           1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 
                           1, 99,  0,  0,  0,  0,  0, 23, 23, 23, 23, 23, 23, 23, 23,  1, 
                           1,  0,  0,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  4,  1,
                           1,  0,  0,  1,  0,  0,  0,  1,  1,  1,  0,  0,  0,  0,  3,  1,
                           1,  1,  0,  1,  1,  0,  0,  1,  1,  0,  0,  0,  0,  0,  1,  1, 
                           1, 40,  0,  0,  0,  0,  0,  1,  0,  0,  0,  1,  0,  0,  0,  1,
                           1,  0,  0,  1,  1,  1,  0,  1,  1,  1,  0, 40,  0,  0,  0,  1, 
                           1,  0,  0,  0,  0,  0,  0,  1,  1,  0,  0,  0,  0,  1,  0,  1,
                           1,  1,  1,  0,  0,  1,  1,  1,  1,  1,  1,  0,  1,  1,  0,  1, 
                           1, 20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1, 25,  1, 
                           1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1      
                         ];
    MapIndex++;
    LevelsMap[MapIndex] = [ 
                           1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
                           1, 99,  0,  1,  0,  0,  0,  1,  1,  0,  0,  0,  0,  0,  3,  1, 
                           1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,  1,  1,   
                           1,  1,  0,  0,  0,  0,  1,  0,  0,  0,  1,  0,  0,  0,  0,  1,
                           1,  0,  0,  0,  0,  0 , 0,  0,  1,  0,  0,  0,  0,  0,  0,  1, 
                           1,  0,  0,  1,  0,  0,  0,  0,  0, 40,  0,  0,  1,  0,  0,  1, 
                           1, 23,  0,  0, 40,  0,  1,  0,  0,  1,  0,  0,  0,  0, 23,  1,
                           1,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  1,
                           1,  0,  4,  0,  0,  0,  0,  1,  1,  0,  0,  0,  0,  1,  0,  1,
                           1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
                           1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  1   
                         ];
    MapIndex++;
    LevelsMap[MapIndex] = [ 
                           1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
                           1, 99,  0,  0,  0,  0,  0,  1,  1,  0,  0,  0,  0,  0,  0,  1,
                           1,  0,  0,  1,  3,  0,  0,  0,  0,  0,  0,  0,  3,  1,  0,  1,
                           1,  0,  0,  1,  4,  0,  0, 23, 23,  0,  0,  0,  4,  1,  0,  1,
                           1,  0,  0,  0, 40,  0,  0,  0,  0,  0,  0,  0, 40,  0,  0,  1, 
                           1,  0,  0,  0,  0,  0,  1,  0,  0,  1,  0,  0,  0,  0,  0,  1,
                           1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,
                           1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,
                           1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,
                           1,  2,  2,  1,  2,  2,  1,  2,  2,  1,  2,  2,  1,  2,  2,  1
                         ];
    MapIndex++;
    LevelsMap[MapIndex] = [ 
                           1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
                           1, 99,  0,  0,  1,  1,  0,  0,  0,  0,  3,  0,  0,  0,  0,  1,
                           1,  0,  1,  0,  1,  1,  4,  0,  3,  0,  1,  1,  1,  0,  0,  1,
                           1,  0,  0,  0,  0, 40,  1,  2,  1,  2,  1,  0,  0,  0,  0,  1, 
                           1,  1,  1,  0,  1,  0,  1,  1,  1,  1,  1,  0,  1,  0,  1,  1,     
                           1,  1,  1,  0,  0, 40,  0,  0,  1,  0,  0,  0,  0,  0,  1,  1,
                           1,  1,  1,  1,  1,  0,  1,  0,  1,  0,  1,  0,  1,  1,  1,  1, 
                           1,  1,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  1,  1,  1,  1, 
                           1,  1,  1,  1,  1,  1,  1,  0,  4,  0,  1,  1,  1,  1,  1,  1,
                           1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  1,  1,  1,  1,  1,  1, 
                           1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1
                         ];
    MapIndex++;
    LevelsMap[MapIndex] = [ 
                           1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
                           1, 99,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
                           1,  0,  0,  0,  1,  1,  0,  0,  0,  0, 23, 23,  0,  0,  0,  1,
                           1,  1,  0,  0,  0,  1,  1,  1, 50,  1,  1,  1,  1, 50,  4,  1, 
                           1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
                           1,  0,  0,  1,  1,  1,  4,  1,  0,  1,  1,  0,  0,  0,  0,  1,
                           1,  0,  0,  0,  0,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  1, 
                           1,  1,  1,  0,  0,  1,  3, 23, 22, 22,  1,  1,  1,  0,  0,  1,
                           1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
                           1,  3,  0,  0,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,
                           1,  1   2,  2,  1,  1,  2,  2,  1,  2,  2,  1,  2,  2,  1,  1
                         ];
    MapIndex++;
    LevelsMap[MapIndex] = [ 
                           1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
                           1, 99,  0,  0,  0,  0,  0,  0, 23, 23, 23, 23, 23, 23, 23,  1,
                           1,  1,  1,  1,  1,  1,  0,  1,  2,  1,  2,  1,  2,  1,  2,  1,
                           1, 21, 21, 21, 21,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,
                           1,  1,  1,  1,  1,  0,  1,  1,  40, 0,  0,  0,  0,  0,  0,  1, 
                           1, 20, 20, 20,  0,  0,  1,  0,  0,  1,  0,  0,  1,  1,  0,  1,
                           1,  1,  1,  1,  0,  1,  1,  0,  1,  1,  0,  1,  1,  1,  0,  1, 
                           1, 23, 23,  0,  0,  1,  0,  0,  1, 40,  0,  0,  1,  1,  0,  1,  
                           1,  1,  1,  0,  1,  1,  0,  1,  1,  0,  1,  0,  1,  1,  0,  1,
                           1,  3,  3,  0,  0,  0,  0,  1,  1,  0,  0,  0,  1,  1, 25,  1, 
                           1,  1,  4,  1,  1,  1,  1,  1,  1,  1,  4,  1,  1,  1,  1,  1
                         ];
    MapIndex++;
    LevelsMap[MapIndex] = [ 
                           1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
                           1, 99,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
                           1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
                           1,  0,  0,  0, 23, 23, 23,  0,  0, 23, 23, 23,  0,  0,  0,  1,
                           1,  0,  0,  0,  1,  3,  1,  0,  0,  1,  3,  1,  0,  0,  0,  1,
                           1,  1,  0,  0,  1,  0,  1,  0,  0,  1,  0,  1,  0,  0,  1,  1, 
                           1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
                           1,  0,  0,  0,  0, 30,  0,  0,  0,  0, 30,  0,  0,  0,  0,  1,
                           1,  0,  0,  0,  0, 23,  0,  0,  0,  0, 23,  0,  0,  0,  0,  1,
                           1,  2,  2,  2,  2,  1,  2,  2,  2,  2,  1,  2,  2,  2,  2,  1
                         ];
    MapIndex++;
    LevelsMap[MapIndex] = [ 
                           1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
                           1, 99,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
                           1,  0,  0,  0,  0,  0,  0,  0, 40,  0,  0,  0,  0,  0,  0,  1,
                           1,  4,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,
                           1,  1,  2,  2,  1,  2,  2,  1,  2,  2,  1,  2,  2,  6,  1,  1,
                           1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
                           1, 40,  0,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,  1,  0,  1,
                           1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
                           1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
                           1,  3,  1,  2,  2,  2,  1,  2,  2,  2,  1,  2,  2,  2,  4,  1,
                           1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1
} // InitializeLevels()

// processing of level output
function ShowLevel(p_level)
{
    var l_top;
    var l_left;
    var v_class;
    var v_sprite;
    var v_scene = "";
    var v_id;
    Levels[p_level].keys = 0;
    Levels[p_level].locks = 0;
    if (p_level == 0) { Levels[p_level].score = 0; } else { Levels[p_level].score = Levels[p_level-1].score; } // starting score of level
    setScore(Levels[p_level].score);
    setLevel(p_level+1);
    
    for (var ly=0; ly<=10; ly++) // level height 11 sprites
    {
        for (var lx=0; lx<=15; lx++) // level width 16 sprites
        {
            // checking of sprite code and assign class
            switch (LevelsMap[p_level][lx+ly*16])
            {
                case  1: v_class = "wall"; break;
                case  2: v_class = "fire-1"; break;
                case  3: v_class = "key"; Levels[p_level].keys++; break;
                case  4: v_class = "lock-1"; Levels[p_level].locks++; break;
                case  5: v_class = "lock-2"; break;
                case  6: v_class = "secret"; break;
                case  7: v_class = "wall"; break; // hidden secret
                case  8: v_class = "space"; break; // hidden block
                case  9: v_class = "wall"; break; // exit placeholder
                case 10: v_class = "exit"; break;
                case 20: v_class = "r-apple"; break;
                case 21: v_class = "r-cherry"; break;
                case 22: v_class = "r-pineapple"; break;
                case 23: v_class = "r-grape"; break;
                case 25: v_class = "life"; break;
                // case 30: v_class = "enemy-1-right"; break;
                // case 40: v_class = "enemy-2-1"; break;

                default: v_class = "space";
            }
            // calculate sprite position
            l_left = SpriteWidth * lx;
            l_top = SpriteHeight * ly;
                       
            // add sprite to scene div
            v_sprite = "<div id='lvl-"+(lx+ly*16)+"' class='"+v_class+"' style='top:"+l_top+"px; left:"+l_left+"px;'></div>";
            v_scene += v_sprite; 
        }
    }

    // setup single player
    if (Player[p_level] != undefined)
    {
        Player[p_level].motionX = Player[p_level].x;
        Player[p_level].motionY = Player[p_level].y;
        Player[p_level].prev_motionX = Player[p_level].motionX;

        l_left = Player[p_level].motionX * SpriteWidth;
        l_top = Player[p_level].motionY * SpriteHeight;
    
        v_sprite = "<div id='player' class='player' style='top:"+l_top+"px; left:"+l_left+"px;'></div>";
        v_scene += v_sprite;
    }
    
    // setup enemies
    for (var i=0; i<Enemies[p_level].length; i++)
    {
        Enemies[p_level][i].motionX = Enemies[p_level][i].x;
        Enemies[p_level][i].motionY = Enemies[p_level][i].y;
    }
    v_scene += create_enemies(Enemies[p_level]);
        
    if (v_scene != "")
    {
        $("#wScene").html(v_scene);
    }
} // ShowLevel


function create_enemies(p_enemies)
{
    var v_div = "";
    var v_class;
    for (var i=0; i<p_enemies.length; i++)
    {
        v_class = "space";
        if (p_enemies[i].type == "30")
        {
            if (p_enemies[i].direction == _RIGHT) v_class = "enemy-1-right";
            if (p_enemies[i].direction == _LEFT) v_class = "enemy-1-left";
        }
        if (p_enemies[i].type == "40")
        {
            v_class = "enemy-2-1";
        }
        
        v_div += "<div id='enemy-" + i + "' class='"+v_class+"' style='top:" + 
                (p_enemies[i].motionY * SpriteHeight) + "px;left:" + 
                (p_enemies[i].motionX * SpriteWidth) + "px;'></div>";
    }
    return (v_div);
}


// main function to start
function start()
{
    CurrentLevel = 0; // set current level to initial
    InitializeGameSounds(); // set Audio data
    InitializeLevels(); // set up all levels 
    ShowLevel(CurrentLevel); // show initial level
    
    SceneTimer = setTimeout(SceneMotion, SceneInterval); // create timer for level motions
    PlayerTimer = setTimeout(PlayerMotion, PlayerInterval); // create timer for player moving
    EnemyTimer = setTimeout(EnemyMotion, EnemyInterval); // create timer for enemy moving
    
    
    // initialize of keyboard events
    $(document).keyup(function(e) {
	 // console.log('KeyUp' + e.key + ', ' + e.keyCode);
	 processKeyUp(e.key);
    });
    
     $(document).keydown(function(e) {
	  console.log('KeyDown' + e.key + ', ' + e.keyCode);
	 processKeyDown(e.key);
    });
} // start()

// apply motions on level sprites
function SceneMotion()
{
    
    var cnt = 0; // counter of sprites to apply motion
    
    //*** checking fire motion
    cnt = $(".fire-1").length; // get number of Fire-1 sprites 
    
    if (cnt>0) 
       {
           // if Fire-1 sprites are exists - change them all to Fire-2 sprites
           $(".fire-1").addClass("fire-2").removeClass("fire-1");
       }
    else
    {
        // in case when no Fire-1 sprites - checking Fire-2 sprites 
        cnt = $(".fire-2").length; // get number of Fire-2 sprites
        
        // if Fire-2 sprites are exists - change them all to Fire-1 sprites
        if (cnt>0) { $(".fire-2").addClass("fire-1").removeClass("fire-2"); }
    }

    //*** checking enemy 2 motion (similar to Fire check)
    cnt = $(".enemy-2-1").length;
    
    if (cnt>0) 
       {
           $(".enemy-2-1").addClass("enemy-2-2").removeClass("enemy-2-1");
       }
    else
    {
        cnt = $(".enemy-2-2").length;
        if (cnt>0) { $(".enemy-2-2").addClass("enemy-2-1").removeClass("enemy-2-2"); }
    }
    
    // Set ScheneTimer again
    SceneTimer = setTimeout(SceneMotion, SceneInterval); 
}

// apply motions on objects
function PlayerMotion()
{
    
    movePlayer();
    
    var v_object_code;
    
    // Set PlayerTimer again
    PlayerTimer = setTimeout(PlayerMotion, PlayerInterval);
}

function EnemyMotion()
{
    var moveX, moveY, dx, dy, pl_x, pl_y;
    var v_old_class = "";
    var v_class = "";
    
    pl_x = Player[CurrentLevel].x;
    pl_y = Player[CurrentLevel].y;

    for (var i = 0; i < Enemies[CurrentLevel].length; i++)
    {
        v_class = "";
        
        if (Enemies[CurrentLevel][i].type == "30")
        {
            if (Enemies[CurrentLevel][i].direction == _LEFT)
            {
                moveX = -0.5; moveY = 0;
            }
            
            if (Enemies[CurrentLevel][i].direction == _RIGHT)
            {
                moveX = 0.5; moveY = 0;
            }
            
            if (Enemies[CurrentLevel][i].motionX % 1 == 0)
            {
                // point - check walls
                if (Enemies[CurrentLevel][i].direction == _LEFT)
                {
                    if (moveEnemyAllowed(Enemies[CurrentLevel][i].x-1, Enemies[CurrentLevel][i].y))
                    {
                        Enemies[CurrentLevel][i].motionX += moveX;
                    }
                    else
                    {
                        // reverse
                        Enemies[CurrentLevel][i].direction = _RIGHT;
                        v_class = "enemy-1-right";
                    }
                }
                else if (Enemies[CurrentLevel][i].direction == _RIGHT)
                {
                    if (moveEnemyAllowed(Enemies[CurrentLevel][i].x+1, Enemies[CurrentLevel][i].y))
                    {
                        Enemies[CurrentLevel][i].motionX += moveX;
                    }
                    else
                    {
                        // reverse
                        Enemies[CurrentLevel][i].direction = _LEFT;
                        v_class = "enemy-1-left";
                    }                    
                }  
            }
            else
            {
                // on half way - continue moving
                Enemies[CurrentLevel][i].motionX += moveX;
                Enemies[CurrentLevel][i].motionY += moveY;
            }

        } // if (Enemies[CurrentLevel][i].type == "30")
        
        if (Enemies[CurrentLevel][i].type == "40")
        {
            moveX = 0; moveY = 0;
            dx=0; dy=0;
            
            // set next step of moving based on direction
            switch (Enemies[CurrentLevel][i].direction)
            {
                case _UP: moveY = -0.5; dy=-1; break;
                case _LEFT: moveX = -0.5; dx=-1; break;
                case _DOWN: moveY = 0.5; dy=1; break;
                case _RIGHT: moveX = 0.5; dx=1; break;
                default: break;
            }
            
            // check ability to move
            if (Enemies[CurrentLevel][i].motionX % 1 == 0 && Enemies[CurrentLevel][i].motionY % 1 == 0)
            {
                if (moveEnemyAllowed(Enemies[CurrentLevel][i].x+dx, Enemies[CurrentLevel][i].y+dy))
                {
                    // continue moving
                    Enemies[CurrentLevel][i].motionX += moveX;
                    Enemies[CurrentLevel][i].motionY += moveY;
                }
                else
                {
                    // moveX = 0;
                    // moveY = 0;
                    // move denied - change direction based on player position
                    if (Enemies[CurrentLevel][i].direction == _UP || Enemies[CurrentLevel][i].direction == _DOWN)
                    {
                        // change to LEFT-RIGHT
                        if (pl_x < Enemies[CurrentLevel][i].x)
                        {
                            Enemies[CurrentLevel][i].direction = _LEFT;
                            // moveX = -0.5;
                        }
                        else
                        {
                            Enemies[CurrentLevel][i].direction = _RIGHT;
                            // moveX = 0.5;                            
                        }
                    }
                    else
                    {
                        // change to UP-DOWN
                        if (pl_y < Enemies[CurrentLevel][i].y)
                        {
                            Enemies[CurrentLevel][i].direction = _UP;
                            // moveY = -0.5;
                        }
                        else
                        {
                            Enemies[CurrentLevel][i].direction = _DOWN;
                            // moveY = 0.5;                            
                        }
                    }
                    // EnemyMotion(); // recursive call
                }
            }
            else
            {
                // on half way - continue moving
                Enemies[CurrentLevel][i].motionX += moveX;
                Enemies[CurrentLevel][i].motionY += moveY;
            }
            
            
        }

        LevelsMap[CurrentLevel][Enemies[CurrentLevel][i].x+Enemies[CurrentLevel][i].y*16] = 0;

        if (Enemies[CurrentLevel][i].motionX % 1 == 0) Enemies[CurrentLevel][i].x = Enemies[CurrentLevel][i].motionX;
        if (Enemies[CurrentLevel][i].motionY % 1 == 0) Enemies[CurrentLevel][i].y = Enemies[CurrentLevel][i].motionY;

        LevelsMap[CurrentLevel][Enemies[CurrentLevel][i].x+Enemies[CurrentLevel][i].y*16] = Enemies[CurrentLevel][i].type;

        // change direction class
        if (v_class != "")
        {
            v_old_class= $("#enemy-"+i)[0].className;
            $("#enemy-"+i).addClass(v_class).removeClass(v_old_class);
        }
        $("#enemy-"+i).css('left', (Enemies[CurrentLevel][i].motionX*SpriteWidth)+'px').css('top', (Enemies[CurrentLevel][i].motionY*SpriteHeight)+'px');
        
    }
    EnemyTimer = setTimeout(EnemyMotion, EnemyInterval);
}


// move to next level
function LevelUp()
{
    CurrentLevel++; // increase CurrentLevel by 1
    if (CurrentLevel>=LevelsMap.length) CurrentLevel--; // if Current level more than maximal level - change CurrentLevel back
    ShowLevel(CurrentLevel); // show level
    
}

// move to previous level
function LevelDown()
{
    CurrentLevel--; // decrease CurrentLevel by 1
    if (CurrentLevel<0) CurrentLevel++; // if Current level less than minimal level - change CurrentLevel back
    ShowLevel(CurrentLevel); // show level
}

// events of releasing pressed key
function processKeyUp(p_key)
{
     if (p_key == "ArrowRight") // move right released 
	    {
    	    Player[CurrentLevel].moveRight = false;
	    }
	 if (p_key == "ArrowLeft") // move left
	    {
    	    Player[CurrentLevel].moveLeft = false;   
	    }
	 if (p_key == "ArrowUp" || p_key == " ") // jump - arrow up or space
	    {
    	    Player[CurrentLevel].jump = false; 
	    }
	 if (p_key == "ArrowDown") // cancel action 
	    {
    	    Player[CurrentLevel].action = false;
	    }	
}

// events of pressing key
function processKeyDown(p_key)
{
     if (p_key == "ArrowRight") // move right
	    {
    	    if (!Player[CurrentLevel].moveLeft) Player[CurrentLevel].moveRight = true;
	    }
	 if (p_key == "ArrowLeft") // move left
	    {
    	    if (!Player[CurrentLevel].moveRight) Player[CurrentLevel].moveLeft = true;   
	    }
	 if (p_key == "ArrowUp" || p_key == " ") // jump - arrow up or space
	    {
    	    if (!Player[CurrentLevel].jump)
    	    { 
             // on 1st press - remember start jumping position to limit jump 
    	     Player[CurrentLevel].jumpStartX = Player[CurrentLevel].x;
    	     Player[CurrentLevel].jumpStartY = Player[CurrentLevel].y;        	    
    	    }
    	    Player[CurrentLevel].jump = true; 

    	    
	    }
	 if (p_key == "ArrowDown") // put key into lock, break secrets
	    {
    	    Player[CurrentLevel].action = true;
	    }	
}


function movePlayerAllowed(x,y) // check only walls
{
    var result;
    var v_object_code = LevelsMap[CurrentLevel][x+y*16];
    
    switch (v_object_code)
    {
        case 1: result = false; break;
        case 4: result = false; break;
        case 5: result = false; break;
        case 6: result = false; break;
        case 7: result = false; break;
        case 9: result = false; break;
        default: result = true; break;
    }

    return (result);
}

function movePlayerAllowed2(x,y) // for fall - check also enemy to stay on
{
    var result;
    var v_object_code = LevelsMap[CurrentLevel][x+y*16];
    
    switch (v_object_code)
    {
        case  1: result = false; break;
        case  4: result = false; break;
        case  5: result = false; break;
        case  6: result = false; break;
        case  7: result = false; break;
        case  9: result = false; break;
        case 30: result = false; break;
        case 40: result = false; break;
        default: result = true; break;
    }

    return (result);
}

function moveEnemyAllowed(x,y) 
{
    var result = false;
    var v_object_code = LevelsMap[CurrentLevel][x+y*16];
    
    if (v_object_code == 0) result = true;

    return (result);
}

function startFalling(p_times)
{
    Player[CurrentLevel].fall = true;
    FlyingTop = p_times;
}


function stopFalling()
{
    Player[CurrentLevel].fall = false;
    // set jump start position at the bottom of fall if jump is pressed
    if (Player[CurrentLevel].jump)
    {
        Player[CurrentLevel].jumpStartX = Player[CurrentLevel].x;
        Player[CurrentLevel].jumpStartY = Player[CurrentLevel].y;        
    }
}


function movePlayer()
{
    var v_motionX = Player[CurrentLevel].motionX; 
    var v_motionY = Player[CurrentLevel].motionY;
    var v_checkX = Player[CurrentLevel].x;
    var v_checkY = Player[CurrentLevel].y;
    var v_chk; // for additional movement checks by X & Y
    var v_dropdown = false; // for checks of falling priority

    {
        // only if current X & Y in Level area - process key events

        if (Player[CurrentLevel].moveRight) // player pressed
        {
            if (v_checkX < 15) // move right allowed only when current position < 15 (right border of scene) 
            {
                if (v_checkX == v_motionX)
                {
                    if (v_checkY == v_motionY)
                    {

                        if (!movePlayerAllowed2(v_checkX + 1, v_checkY+1) && movePlayerAllowed2(v_checkX, v_checkY+1)
                            && (!Player[CurrentLevel].jump ))
                        {
                            if (v_motionX != Player[CurrentLevel].prev_motionX)
                            {
                            v_dropdown = true;
                            startFalling(0);
                            }
                        }
                        // when Y is on position
                        if (movePlayerAllowed(v_checkX + 1, v_checkY) && !v_dropdown) 
                        {
                            Player[CurrentLevel].motionX +=0.5;
                        }
                    }
                    else
                    {
                        // when Y is on half-step
                        v_chk = (Player[CurrentLevel].y<Player[CurrentLevel].motionY)?Math.ceil(Player[CurrentLevel].motionY):Math.floor(Player[CurrentLevel].motionY);
                        if (movePlayerAllowed(v_checkX+1, v_checkY) && movePlayerAllowed(v_checkX+1, v_chk)) 
                        {
                            Player[CurrentLevel].motionX +=0.5;
                        }
                    }
                    
                    
                }
                else
                {
                    // current state: half-step
                    Player[CurrentLevel].motionX +=0.5
                }

            }
        }
        
        if (Player[CurrentLevel].moveLeft)
        {
            if (v_checkX > 0) // move left allowed only when current position >0 (left border of scene) 
            {
                if (v_checkX == v_motionX)
                {
                    if (v_checkY == v_motionY)
                    {
                        
                        if (!movePlayerAllowed2(v_checkX - 1, v_checkY+1) && movePlayerAllowed2(v_checkX, v_checkY+1)
                            && (!Player[CurrentLevel].jump ))
                        {
                            if (v_motionX != Player[CurrentLevel].prev_motionX)
                            {
                            v_dropdown = true;
                            startFalling(0);
                            }
                        }
                        
                        // when Y is on position
                        if (movePlayerAllowed(v_checkX - 1, v_checkY) && !v_dropdown) 
                        {
                            Player[CurrentLevel].motionX -=0.5;
                        }
                    }
                    else
                    {
                        // when Y is on half-step
                        v_chk = (Player[CurrentLevel].y<Player[CurrentLevel].motionY)?Math.ceil(Player[CurrentLevel].motionY):Math.floor(Player[CurrentLevel].motionY);
                        if (movePlayerAllowed(v_checkX-1, v_checkY) && movePlayerAllowed(v_checkX-1, v_chk)) 
                        {
                            Player[CurrentLevel].motionX -=0.5;
                        }
                    }
                }
                else
                {
                    // current state: half-step
                    Player[CurrentLevel].motionX -=0.5
                }

            }
        }
        
        if (Player[CurrentLevel].jump)
	    {
    	    if (!Player[CurrentLevel].fall)
    	    {
    	    
    	        if (v_checkY > 0) // jump allowed only when current position >0 (top border of scene) 
                {
                    if (v_checkY == v_motionY)
                    {
                        if (((v_checkY-1) >= 0) && ((Player[CurrentLevel].jumpStartY-v_checkY+1) <=2 ))
                        {
                            v_chk = (Player[CurrentLevel].x<Player[CurrentLevel].motionX)?Math.ceil(Player[CurrentLevel].motionX):Math.floor(Player[CurrentLevel].motionX);
                
                            if (!movePlayerAllowed2(v_checkX, v_checkY-1) ||
                                !movePlayerAllowed2(v_chk, v_checkY-1)) 
                            {
                                startFalling(4);
                            }
                            else
                                if (movePlayerAllowed2(v_checkX, v_checkY-1)) Player[CurrentLevel].motionY -=0.5;

    	                }
                        else
                        {
                            startFalling(4); // invert jump into fall, but keep jump "pressed"
    	                }

                    }
                    else
                    {
                        // current state: half-step
                        Player[CurrentLevel].motionY -=0.5;
                    }
                }
                else
                {
                    if (v_checkY == 0) startFalling(4);
                }
            }
        }
        else
        {
            // check for fall when no jump
            if (v_motionY<15 && !Player[CurrentLevel].fall)
            {
                v_chk = (Player[CurrentLevel].x<Player[CurrentLevel].motionX)?Math.ceil(Player[CurrentLevel].motionX):Math.floor(Player[CurrentLevel].motionX);
                if (movePlayerAllowed2(v_checkX, v_checkY+1) || movePlayerAllowed2(v_chk, v_checkY+1)) 
                {
                    startFalling(0); // set falling flag
                }
                else
                {
                    // check half-step
                    if (v_checkY != v_motionY) startFalling(0); // set falling flag
                }
            }
        }
        
        
        if (Player[CurrentLevel].fall)
        {
            // if fall - move down till wall/enemy
            FlyingTop--;
        
            if (FlyingTop<=0)
            {
                FlyingTop=0;
            
                if (v_checkY<10) // fall until current position <10 (bottom border of scene)
                {
                    if (v_checkY == v_motionY)
                    {
                    
                        v_chk = (v_checkX<Player[CurrentLevel].motionX)?Math.ceil(Player[CurrentLevel].motionX):Math.floor(Player[CurrentLevel].motionX);
        	
                        if ( !movePlayerAllowed2(Player[CurrentLevel].x, v_checkY+1) || !movePlayerAllowed2(v_chk, v_checkY+1))                    
                        {
                            stopFalling();
        	            }
                        else
                        {
                            Player[CurrentLevel].motionY += 0.5;
                        }
                    }
                    else
                    {
                        // current state: half-step
                        Player[CurrentLevel].motionY +=0.5;
                    }
                }
                else
                {
        	        // last Y position - cancel falling
                    stopFalling();
    	        }
    	    }  
        }
        
        Player[CurrentLevel].prev_motionX = v_motionX;        

        // move player
        if (Player[CurrentLevel].motionX == v_motionX && Player[CurrentLevel].motionY == v_motionY) 
        {
            // no player move required
        }
        else
        {
            // moving player
         
            $("#player").css('left', (Player[CurrentLevel].motionX*SpriteWidth)+'px').css('top', (Player[CurrentLevel].motionY*SpriteHeight)+'px');
        }
        
        // set X & Y when player moved into position (not on a half-step)
        if (Player[CurrentLevel].motionX % 1 == 0) Player[CurrentLevel].x = Player[CurrentLevel].motionX;
        if (Player[CurrentLevel].motionY % 1 == 0) Player[CurrentLevel].y = Player[CurrentLevel].motionY;
    
        if (Player[CurrentLevel].motionX == Player[CurrentLevel].x && Player[CurrentLevel].motionY == Player[CurrentLevel].y)
        {
            // try to take item if exists
            TakeItem(CurrentLevel, Player[CurrentLevel].x, Player[CurrentLevel].y);   

            // check action
            if (Player[CurrentLevel].action)
            {
                actionPlayer();
                //Player[CurrentLevel].action = false;
            }

        }

    }
    
}

function showExit()
{
    var v_id;
    for (var ly=0; ly<=10; ly++) // level height 11 sprites
    {
        for (var lx=0; lx<=15; lx++) // level width 16 sprites
        {
            // checking of sprite code and assign class
            if (LevelsMap[CurrentLevel][lx+ly*16] == 9)
            {
                v_id = "#lvl-" + (lx+ly*16);
                $(v_id).addClass("exit").removeClass("wall");
                LevelsMap[CurrentLevel][lx+ly*16] = 10;
            }
        }
    }
}

function actionPlayer()
{
    var v_object_code;
    var v_address;
    var v_id;
    
    if (Player[CurrentLevel].y < 10)
    {
        v_address = Player[CurrentLevel].x+(Player[CurrentLevel].y+1)*16;
        v_object_code = LevelsMap[CurrentLevel][v_address];
        v_id = "#lvl-" + v_address;
        switch (v_object_code)
        {
            // lock
            case  4:
                    if (Levels[CurrentLevel].keys_collected > 0)
                    {
                        Levels[CurrentLevel].keys_collected--;
                        Levels[CurrentLevel].locks_opened++;
                        // set  code
                        LevelsMap[CurrentLevel][v_address] = 5;
                        // update sprite
                        $(v_id).addClass("lock-2").removeClass("lock-1");
                        PlaySound("PutKey");
                        
                        if (Levels[CurrentLevel].locks_opened == Levels[CurrentLevel].locks)
                        {
                            // show exit
                            showExit();
                        }
                    }
                    break;
            // secret
            case   6:
                    LevelsMap[CurrentLevel][v_address] = 23;
                    $(v_id).addClass("r-grape").removeClass("secret");
                    break;
            // hidden secret
            case   7:
                    LevelsMap[CurrentLevel][v_address] = 6;
                    $(v_id).addClass("secret").removeClass("wall");
                    break;

            default: break;
        }
    }
    
}


function TakeItem(p_level, px, py)
{
    var v_id = "#lvl-"+(px+py*16);
    var v_current_class = $(v_id)[0].className;
    switch (LevelsMap[p_level][px+py*16])
    {

        case  3: // key
                 Levels[p_level].keys_collected++;
                 Levels[p_level].score += 1000; // points
                 LevelsMap[p_level][px+py*16] = 0; // set empty
                 $(v_id).addClass("space").removeClass(v_current_class);
                 PlaySound("TakeKey");
                 setScore(Levels[p_level].score);
                 break;
        case 10: // EXIT
                 if (CurrentLevel < LevelsMap.length-1) 
                 {
                    // count score and level up
                    PlaySound("Exit");
                    LevelUp();
                 }
                 else
                 {
                     // Game complete
                 }
                 break;
        case 20: // apple
                 Levels[p_level].score += 500; // points
                 LevelsMap[p_level][px+py*16] = 0; // set empty
                 $(v_id).addClass("space").removeClass(v_current_class);
                 PlaySound("TakeItem");
                 setScore(Levels[p_level].score);
                 break;
        case 21: // cherry
                 Levels[p_level].score += 100; // points
                 LevelsMap[p_level][px+py*16] = 0; // set empty
                 $(v_id).addClass("space").removeClass(v_current_class);
                 PlaySound("TakeItem");
                 setScore(Levels[p_level].score);
                 break;
        case 22: // pineapple
                 Levels[p_level].score += 500; // points
                 LevelsMap[p_level][px+py*16] = 0; // set empty
                 $(v_id).addClass("space").removeClass(v_current_class);
                 PlaySound("TakeItem");
                 setScore(Levels[p_level].score);
                 break;
        case 23: // grape
                 Levels[p_level].score += 800; // points
                 LevelsMap[p_level][px+py*16] = 0; // set empty
                 $(v_id).addClass("space").removeClass(v_current_class);
                 PlaySound("TakeItem");
                 setScore(Levels[p_level].score);
                 break;
        case 25: // Life
                 Lives++; // lives
                 LevelsMap[p_level][px+py*16] = 0; // set empty
                 $(v_id).addClass("space").removeClass(v_current_class);
                 PlaySound("TakeItem");
                 break;
        default: break;
    }

}


function PlaySound(p_sound_name)
{
    var v_id = -1;
    if (p_sound_name == "TakeItem") v_id = 0;
    if (p_sound_name == "TakeKey") v_id = 1;
    if (p_sound_name == "PutKey") v_id = 2;
    if (p_sound_name == "Exit") v_id = 3;
    if (p_sound_name == "TakeLife") v_id = 4;
            
    if (v_id != -1) 
    {
        var source = GameAudioContext.createBufferSource();
        source.buffer = AudioBufferLoader.bufferList[v_id];
        source.connect(GameAudioContext.destination);
        source.start(0);
    }
}

// set/update score
function setScore(p_val)
{
    $(".score").html("<font color='white' class='game-font'>Score "+p_val+"</font>");
}

function setLevel(p_val)
{
    var v_val = p_val;
    if (p_val<10) v_val = "0"+p_val;
    $(".level").html("<font color='white' class='game-font'>Level "+v_val+"</font>");
}



// WEB AUDIO API 

var GameAudioContext;
var AudioBufferLoader;

function InitializeGameSounds()
{
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    GameAudioContext = new AudioContext();

    AudioBufferLoader = new BufferLoader(
    GameAudioContext,
    [
      'sounds/TakeItem.mp3', // EatItem
      'sounds/TakeKey.mp3', // Take key
      'sounds/PutKey.mp3', // Put key
      'sounds/Exit.mp3', // Exit
      'sounds/TakeLife.mp3' // Take life
    ],
    CompleteGameSoundsInit
    );

  AudioBufferLoader.load();
}

function CompleteGameSoundsInit(bufferList) 
{
 // no action required
}

// BufferLoader Class
function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";


  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}
