  let popup = {
      selectors:  {
          'shadow': '.main > .shadow',
          'popup': '.popup',
          'popup_close': '.popup-close',
      },

      init: function(){
        let _this = this;
        let elem = null;
        let dataXY = null;

        $(_this.selectors.shadow+", "+_this.selectors.popup_close).on("click", function(){
          if ($("."+elem.attr("data-popup")).attr("data-toggle") == "show") {
            _this.hide(elem);
            $("."+elem.attr("data-popup")).attr("data-toggle", "hide");
          }
        });

        $(".time-popupLeft").on("click", function(){
          if ($("."+$(this).attr("data-popup")).attr('data-toggle') == "hide") {
            elem = $(this);
            dataXY = elem.offset();

            if ($(document).width() <= 767) {
              _this.show($(this), (dataXY.top + 70), "auto", "50%", "auto", true);
              $("."+$(this).attr("data-popup")).css({"margin" : "0 0 0 -150px",});
            }
            else {
              _this.show($(this), (dataXY.top + 70), "auto", (dataXY.left + 90), "auto", true);
              $("."+$(this).attr("data-popup")).css({"margin" : "0 0 0 0",});
            }

            $("."+$(this).attr("data-popup")).attr("data-toggle", "show");
          }
        });

        $(".time-popupRight").on("click", function(){
          if ($("."+$(this).attr("data-popup")).attr('data-toggle') == "hide") {
            elem = $(this);
            dataXY = elem.offset();
            if ($(document).width() <= 767) {
              _this.show($(this), (dataXY.top - 30), "auto", "50%", "auto", true);
              $("."+$(this).attr("data-popup")).css({"margin" : "0 0 0 -150px",});
            }
            else {
              _this.show($(this), (dataXY.top - 30), "auto", (dataXY.left + 270), "auto", true);
              $("."+$(this).attr("data-popup")).css({"margin" : "0 0 0 0",});
            }
            $("."+$(this).attr("data-popup")).attr("data-toggle", "show");
          }
        });

        $("[data-popup='form-popup']").on("click", function(){
          if ($("."+$(this).attr("data-popup")).attr('data-toggle') == "hide") {
            elem = $(this);
            dataXY = elem.offset();

            if ($(document).width() <= 767) {
              _this.show($(this), (dataXY.top - 250), "auto", "50%", "auto", true);
              $("."+$(this).attr("data-popup")).css({"margin" : "0 0 0 -155px",});
            }
            else {
              _this.show($(this), (dataXY.top - 200), "auto", "50%", "auto", true);
              $("."+$(this).attr("data-popup")).css({"margin" : "0 0 0 -257px",});
            }
            $("."+$(this).attr("data-popup")).attr("data-toggle", "show");
          }
        });

        $("[data-popup='form2-popup']").on("click", function(){
          if ($("."+$(this).attr("data-popup")).attr('data-toggle') == "hide") {
            elem = $(this);
            dataXY = elem.offset();

            if ($(document).width() <= 767) {
              _this.show($(this), (dataXY.top - 300), "auto", "50%", "auto", true);
              $("."+$(this).attr("data-popup")).css({"margin" : "0 0 0 -155px",});
            }
            else {
              _this.show($(this), (dataXY.top - 300), "auto", "50%", "auto", true);
              $("."+$(this).attr("data-popup")).css({"margin" : "0 0 0 -257px",});
            }
            $("."+$(this).attr("data-popup")).attr("data-toggle", "show");
          }
        });

        $("[data-popup='contact-popup_up']").on("click", function(){
          if ($("."+$(this).attr("data-popup")).attr('data-toggle') == "hide") {
            elem = $(this);
            dataXY = elem.offset();

            if ($(document).width() <= 767) {
              _this.show($(this), "370", "auto", "50%", "auto", false);
              $("."+$(this).attr("data-popup")).css({"margin" : "0 0 0 -150px",});
            }
            else {
              _this.show($(this), "90", "auto", (dataXY.left-250), "auto", false);
              $("."+$(this).attr("data-popup")).css({"margin" : "0 0 0 0",});
            }
            $("."+$(this).attr("data-popup")).attr("data-toggle", "show");
          }
        });

        $("[data-popup='contact-popup_down']").on("click", function(){
          if ($("."+$(this).attr("data-popup")).attr('data-toggle') == "hide") {
            elem = $(this);
            dataXY = elem.offset();

            if ($(document).width() <= 767) {
              _this.show($(this), "auto", "220", "50%", "auto", false);
              $("."+$(this).attr("data-popup")).css({"margin" : "0 0 0 -150px",});
            }
            else {
              _this.show($(this), "auto", "70", "50%", "auto", false);
              $("."+$(this).attr("data-popup")).css({"margin" : "0 0 0 0",});
            }
            $("."+$(this).attr("data-popup")).attr("data-toggle", "show");
          }
        });
      },

      show: function(elem, top, bottom, left, right, shadow){
        let _this = this;

        if (shadow === true && $(document).width() > 767) {
          $("body").addClass("noScroll");
        }

        $("."+elem.attr("data-popup")).css({"display" : "flex"});

        switch (elem.attr("data-direction")) {
          case "up":
            $("."+elem.attr("data-popup")).css(
              {
                "top" : "-800px",
                "bottom" : bottom,
                "left" : left,
                "right" : right,
              }
            ).animate(
              {
                top: top,
              },
            300);
            break;
          case "down":
            $("."+elem.attr("data-popup")).css(
              {
                "top" : top,
                "bottom" : "-800px",
                "left" : left,
                "right" : right,
              }
            ).animate(
              {
                bottom: bottom,
              },
            300);
            break;
          case "right":
            $("."+elem.attr("data-popup")).css(
              {
                "top" : top,
                "bottom" : bottom,
                "left" : "9800px",
                "right" : right,
              }
            ).animate(
              {
                left: left,
              },
            300);
            break;
          case "left":
            $("."+elem.attr("data-popup")).css(
              {
                "top" : top,
                "bottom" : bottom,
                "left" : "-800px",
                "right" : right,
              }
            ).animate(
              {
                left: left,
              },
            300);
            break;
        }

        if (shadow === true) {
          $(_this.selectors.shadow).css({"display" : "block"}).animate({opacity : "0.5"}, 300);
        }
      },
      hide: function(elem){
        let _this = this;

        switch (elem.attr("data-direction")) {
          case "up":
            $("."+elem.attr("data-popup")).animate(
              {
                top: "-800",
              },
            300);
            break;
          case "down":
            $("."+elem.attr("data-popup")).animate(
              {
                bottom: "-800",
              },
            300);
            break;
          case "right":
            $("."+elem.attr("data-popup")).animate(
              {
                left: "4800",
              },
            300);
            break;
          case "left":
            $("."+elem.attr("data-popup")).animate(
              {
                left: "-800",
              },
            300);
            break;
        }
        $(_this.selectors.shadow).css({"display" : "none"});
        $("body").removeClass("noScroll");
        setTimeout(function () {
          $("."+elem.attr("data-popup")).css({"display" : "none"});
        }, 300);
      },
  };
  let cookiePopup = {
    selectors:  {
        'popup': '.cookiePopup',
        'button': '.cookiePopup-button',
    },
    init: function(){
      let _this = this;

      if (localStorage.getItem('cookieCheck') != 1) {
        console.log(localStorage.getItem('cookieCheck'));
        $(_this.selectors.popup).removeClass("hide");
      }

      $(_this.selectors.button).on("click", function(){
        localStorage.setItem('cookieCheck', 1);
          $(_this.selectors.popup).animate(
          {
            top: "-500",
          },
        300);
        setTimeout(function () {
          $(_this.selectors.popup).addClass("hide");
        }, 300);
      });
    },
  }

  popup.init();
  cookiePopup.init();
