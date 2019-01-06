/*
 * LED CLOCK
 *
 * Copyright 2015 8am.
 * http://8am.jp/
 *
 */

$(function() {
  var numOfHorizontalDots = 5;
  var numOfVerticalDots = 7;
  var container;
  var digits;
  var dots;
  var blink;
  var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  init();
  show();
  play();

  $(window).on("load orientationchange resize", function(e) {
    show();
  });

  $(window).on("deviceorientation", function(e) {
    $("#led-clock .dot").css("background-color", "hsl(0, 0%, 8%)");
    $("#led-clock .dot.on").css("background-color", "hsl(" + (event.gamma * 2).toFixed(1) + ", 50%, 50%)");
  });

  function show() {
    var windowwidth = $(window).width();
    var windowheight = $(window).height();
    var cellwidth = Math.floor( windowwidth / 36 );
    var margin = Math.max(Math.floor(cellwidth * 0.1), 1);
    var size = Math.ceil(cellwidth - margin * 2);
    dots.width(size).height(size).css("margin", margin);
    $(".digit").css("margin", Math.floor(cellwidth * 0.25));
    $(".separator").css("margin", Math.floor(cellwidth * 0.25));
    container.css("margin-top", (windowheight - container.height()) * 0.5);
  }

  function play() {
    var d = new Date();
    var n = (('0' + d.getHours()).slice(-2) + ('0' + d.getMinutes()).slice(-2) + ('0' + d.getSeconds()).slice(-2)).split('');
    dots.removeClass("on");
    $.each( n, function( key, value ) { digits[key][value].addClass("on"); });
    blink.toggleClass("on", (n[5] % 2 === 1));

    requestAnimationFrame(play);
  }

  function init() {
    var classes = [
      "d5 d7",
      "d0 d2 d3 d5 d6 d7 d8 d9",
      "d0 d1 d2 d3 d5 d6 d7 d8 d9",
      "d0 d2 d3 d4 d5 d6 d7 d8 d9",
      "d5 d7",

      "d0 d2 d3 d5 d6 d8 d9",
      "d1",
      "d1 d4",
      "d4",
      "d0 d2 d3 d7 d8 d9",

      "d0 d5 d6 d8 d9",
      "d4",
      "d1",
      "d4 d7",
      "d0 d2 d3 d8 d9",

      "d0 d4 d5 d6",
      "d3 d5 d6 d8 d9",
      "d1 d3 d5 d6 d8 d9",
      "d2 d3 d4 d5 d6 d7 d8 d9",
      "d0 d9",

      "d0 d4 d6 d8",
      "d4",
      "d1 d2 d4 d7",
      "d4",
      "d0 d3 d4 d5 d6 d8 d9",

      "d0 d3 d6 d8",
      "d2",
      "d1 d7",
      "d4",
      "d0 d3 d5 d6 d8 d9",

      "d2 d5",
      "d0 d2 d3 d5 d6 d8 d9",
      "d0 d1 d2 d3 d5 d6 d7 d8 d9",
      "d0 d2 d3 d4 d5 d6 d8 d9",
      "d2",
    ];

    var dot = ($("<div/>").addClass("dot"));
    var cell = ($("<div/>").addClass("cell").append(dot.clone()));

    var line = ($("<div/>").addClass("line"));
    for (i = 0; i < numOfHorizontalDots; i++) line.append(cell.clone());
    var digit = ($("<div/>").addClass("digit"));
    for (i = 0; i < numOfVerticalDots; i++) digit.append(line.clone());

    var d = digit.find(".dot");
    for (i = 0; i < classes.length; i++) d.eq(i).addClass(classes[i]);

    var separatorline = ($("<div/>").addClass("line"));
    separatorline.append(cell.clone());
    var separator = ($("<div/>").addClass("separator"));
    for (i = 0; i < numOfVerticalDots; i++) separator.append(separatorline.clone());
    var d = separator.find(".dot");
    $.each( [2, 4], function( key, value ) { d.eq(value).addClass("blink"); });

    container = $("#led-clock");
    container.append(
      digit.clone(),
      digit.clone(),
      separator.clone(),
      digit.clone(),
      digit.clone(),
      separator.clone(),
      digit.clone(),
      digit.clone()
    );

    digits = [];
    $(".digit").each(function(i) {
      digits[i] = [];
      for (j = 0; j < 10; j++) digits[i][j] = $(this).find(".d" + j);
    });
    dots = $(".dot");
    blink = $(".blink");
  }
});
