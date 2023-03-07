// ------------------------------ menu BURGER ------------------------------ //

"use strict";
window.addEventListener("DOMContentLoaded", (event) => {
    /* menu */
    const menu = document.getElementById("Menu");
    const cmdMenu = document.getElementById("CmdMenu");
    const Logo = document.getElementById("Logo");
    const header = document.querySelector("header");

    /* menu BURGER ANIMATION */
    //const Anim = document.getElementById("X");

    const up = document.getElementById("menu-up");
    const middle = document.getElementById("menu-middle");
    const down = document.getElementById("menu-down");

    //Count when the menu is clicked
    var isChecked = 1;

    cmdMenu.addEventListener('click', function () {
        menu.style.display = (menu.style.display == 'none') ? 'inherit' : 'none';

        isChecked += 1;

        /* menu BURGER ANIMATION */
        if (isChecked % 2 == 0) {
            up.style.transform = 'translate(0%, 400%) rotate(45deg)';
            down.style.transform = 'translate(0%, 200%) rotate(-45deg)';
            middle.style.visibility = 'hidden';

            up.style.transition = "all 0.5s";
            down.style.transition = "all 0.5s";
            
            header.style.filter = 'blur(0px)';

        } else {
            up.style.transform = 'rotate(0deg) scale(1)';
            down.style.transform = 'rotate(0deg) scale(1)';
            middle.style.visibility = 'visible';
        }
    });

    //Loading page
    window.onload = function () {
        //Windows width
        var ww = window.innerWidth; //In pixels
        menu.style.display = (ww > 650) ? '' : 'none';
        cmdMenu.style.display = (ww > 650) ? 'none' : '';
    };
    //Changing width
    window.onresize = function () {
        //Windows width
        var ww = window.innerWidth; //In pixels
        menu.style.display = (ww > 650) ? '' : 'none';
        cmdMenu.style.display = (ww > 650) ? 'none' : '';
    };

});