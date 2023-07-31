$(document).ready(function() {
  let menuToggle = {
    selectors:  {
      'menu_header': 'header .nav_menu-mobile',
      'menu_nav_header': '.menu-mobile',
      'menu_nav_close': '.menu-mobile .popup-close-menu',
      'menu_nav_item': '.menu-mobile a',

    },
    init: function(){
      let _this = this;

      $(_this.selectors.menu_header).on("click", function(){
        if ($(this).data("toggle") == "hide") {
          _this.show(_this.selectors.menu_nav_header);
          $(this).data("toggle", "show");
        }
      });

      $(_this.selectors.menu_nav_close+", "+_this.selectors.menu_nav_item+"[href^='#']").on("click", function(){
        if ($(_this.selectors.menu_header).data("toggle") == "show") {
          _this.hide(_this.selectors.menu_nav_header);
          $(_this.selectors.menu_header).data("toggle", "hide");
        }
      });
    },
    hide: function(elem){
      $(elem).slideUp(200);
    },
    show: function(elem){
      $(elem).slideDown(200);
    },
  }

  menuToggle.init();
});
