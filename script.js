// ------------------------------ MENU BURGER ------------------------------ //

"use strict";
window.addEventListener("DOMContentLoaded", (event) => {
    /* MENU */
    const Menu = document.getElementById("Menu");
    const CmdMenu = document.getElementById("CmdMenu");
    const Logo = document.getElementById("Logo");

    /* MENU BURGER ANIMATION */
    const Anim = document.getElementById("X");

    //Count when the menu is clicked
    var isChecked = 1;

    CmdMenu.addEventListener('click', function () {
        Menu.style.display = (Menu.style.display == 'none') ? 'inherit' : 'none';
        
        isChecked += 1;

        /* MENU BURGER ANIMATION */
        if (isChecked % 2 == 0) {
            Anim.style.transform = 'rotate(45deg) scale(1.5)';
            Anim.style.transition = "all 0.5s";
        } else {
            Anim.style.transform = 'rotate(0deg)';
        }
    });

    //Loading page
    window.onload = function () {
        //Windows width
        var ww = window.innerWidth; //In pixels
        Menu.style.display = (ww > 650) ? '' : 'none';
        CmdMenu.style.display = (ww > 650) ? 'none' : '';
    };
    //Changing width
    window.onresize = function () {
        //Windows width
        var ww = window.innerWidth; //In pixels
        Menu.style.display = (ww > 650) ? '' : 'none';
        CmdMenu.style.display = (ww > 650) ? 'none' : '';
    };

});