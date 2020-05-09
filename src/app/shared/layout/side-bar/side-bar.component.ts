import { Component, OnInit } from '@angular/core';
declare var $ : any;
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  faCoffee = faCoffee;
  constructor() { }

  
  
  ngOnInit(): void {
    var SeparatorTitle = $('.sidebar-separator-title');
  
  // Collapse/Expand icon
$('#collapse-icon').addClass('fa-angle-double-left'); 

// Collapse click
$('#body-row').mouseover(function() {
    SidebarCollapse();
});

$('#body-row').mouseout(function() {
  SidebarCollapse1();
});
function SidebarCollapse1() {
  $('.menu-collapsed').toggleClass('d-none');
  $('.sidebar-submenu').toggleClass('d-none');
  $('.submenu-icon').toggleClass('d-none');
  $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');
  
  // Treating d-flex/d-none on separators with title
      SeparatorTitle.addClass('d-flex');
  
  
  // Collapse/Expand icon
  $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
}


function SidebarCollapse () {
    $('.menu-collapsed').toggleClass('d-none');
    $('.sidebar-submenu').toggleClass('d-none');
    $('.submenu-icon').toggleClass('d-none');
    $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');
    // Treating d-flex/d-none on separators with title
        SeparatorTitle.removeClass('d-flex');

    // Collapse/Expand icon
    $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
}
SidebarCollapse ();
  }

}
