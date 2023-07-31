
  let slider = {
      selectors:  {
          'items': '.slider-items',
          'item': '.slider-item',
          'track': '.slider-track',
          'prev': '.btnPrev',
          'next': '.btnNext',
          'dots': '.dots-layouts',
          'dot': '.dots-layouts .dots',
          // unq
          'dots_unq': '.dots-layoutsKatalog',
          'dot_unq': '.dots-layoutsKatalog .dots',
      },

      position: 0,
      sliderToShow: 0,
      sliderToScroll: 0,
      itemsCount: 0,
      itemWidth: 0,
      moveScroll: 0,
      id: "",
      items: "",
      track: "",
      item: "",
      btnNext: "",
      btnNextDis: "",
      btnPrev: "",
      dots: "",
      dot: "",
      // unq
      dots_unq: "",
      dot_unq: "",
      finalMovecheck: false,

      sensitivity: 20,
      swipeStart: null,
      swipePosition: null,
      dotsCheck: null,
      finalCheck: false,
      finalCheckBtn: false,
      finalMove: 0,
      actionCheck: 0,

      initParam: function(elem, sliderToShow, sliderToScroll, media, fixWidth, dotsCheck){
        let _this = this;

        _this.id = elem;
        _this.items = $(elem +" "+ _this.selectors.items);
        _this.track = $(elem +" "+ _this.selectors.track);
        _this.item = $(elem +" "+ _this.selectors.item);
        _this.btnNext = $(elem +" "+ _this.selectors.next);
        _this.btnPrev = $(elem +" "+ _this.selectors.prev);
        _this.dots = $(elem +" "+ _this.selectors.dots);
        // unq
        _this.dots_unq = $(elem +" "+ _this.selectors.dots_unq);

        _this.sliderToShow =  sliderToShow;
        _this.sliderToScroll = sliderToScroll;
        _this.finalCheck = false;
        _this.finalCheckBtn = false;
        _this.finalMove = 0;
        _this.actionCheck = 0;
        _this.finalMovecheck = false;
        _this.dotsCheck = null;
        _this.actionDotsUnq();
        _this.actionItem();

        if(fixWidth === true){
          _this.itemWidth = _this.items.width() / _this.sliderToShow;

          $(_this.item).each(function(){
            $(_this.item).css({
              width: _this.itemWidth,
            });
          });
        }
        else{
          _this.itemWidth = _this.item.width();
        }

        _this.itemsCount = _this.item.length
        _this.dotsCheck = dotsCheck;

        if(media != null){
          _this.mediaSlider(media);
        }

        _this.moveScroll = _this.sliderToScroll * _this.itemWidth;
        _this.finalMove =  _this.track.outerWidth(true) -  _this.items.width();
      },

      init: function(elem, sliderToShow = 3, sliderToScroll = 2, media = null, fixWidth = true, dotsCheck = false){
        let _this = this;
        _this.initParam(elem, sliderToShow, sliderToScroll, media, fixWidth, dotsCheck);

        let saved_width = $(window).width();

        _this.btnPrev.on('touchstart click', function(){
          if (_this.finalCheckBtn === true) {
            _this.actionCheck -= 1;
            _this.actionDotsUnq();
            _this.actionItem();
            _this.finalCheckBtn = false;
            return false
          }
          if(!(_this.btnPrev.hasClass("disabled"))){
            _this.prev();
            $(_this.id+" "+_this.selectors.item).removeClass("active");
          }
          return false
        });
        _this.btnNext.on('touchstart click', function(){

          if ($(this).hasClass("disabled") && $(_this.id+" "+_this.selectors.item+" .box.active").closest(_this.selectors.item).attr("data-numberslide") != (_this.item.length - 1)) {
            _this.finalCheckBtn = true;

            _this.actionCheck += 1;
            _this.actionDotsUnq();
            _this.actionItem();
            return false
          }
          if(!(_this.btnNext.hasClass("disabled"))){
            _this.next();
            $(_this.id+" "+_this.selectors.item).removeClass("active");
          }
          return false
        });

        _this.items.on("touchstart", function (e) {
           _this.TouchStart(e);
         });
        _this.items.on("touchmove", function (e) {
          _this.TouchMove(e);
        });
        _this.items.on("touchend", function (e) {
          _this.TouchEnd(e);
          $(_this.id+" "+_this.selectors.item).removeClass("active");
        });

        _this.items.on("mousedown", function (e) {
          _this.MausStart(e);

          _this.items.bind("mouseup mouseleave", function (e) {
            _this.MausEnd(e);
            $(_this.id+" "+_this.selectors.item).removeClass("active");

            _this.items.unbind("mouseup mouseleave");
          });
        });

        $(window).resize(function(){
          if(media != null && $(window).width() != saved_width){
            _this.initParam(elem, sliderToShow, sliderToScroll, media, fixWidth, dotsCheck);
            _this.position = 0;
            _this.movePosition();
          }
        });

        if(_this.dotsCheck == true){
          _this.contentDots();

          $(_this.id+" "+_this.selectors.dot).on("touchstart click", function () {
            _this.finalMovecheck = false;

            if ($(this).attr("data-number") <= ($(elem +" "+ _this.selectors.dot).length - 1)) {
              _this.finalCheckBtn = false;
            }

            _this.actionCheck = +($(this).attr("data-number"));
            _this.actionItem();
            _this.moveDots($(this));
            $(_this.id+" "+_this.selectors.item).removeClass("active");
          });

          // unq
          $(_this.id+" "+_this.selectors.dot_unq).on("touchstart click", function () {
            _this.finalMovecheck = false;

            if ($(this).attr("data-number") <= ($(elem +" "+ _this.selectors.dot_unq).length - 1)) {
              _this.finalCheckBtn = false;
            }

            _this.actionCheck = +($(this).attr("data-number"));
            _this.actionItem();
            _this.moveDotsUnq($(this));
            $(_this.id+" "+_this.selectors.dot_unq).removeClass("active");
            $(this).addClass("active");
            $(_this.id+" "+_this.selectors.item).removeClass("active");
            $(_this.id+" "+_this.selectors.item+"[data-numberSlide='"+$(this).attr('data-number')+"']").addClass("active");
          });
        }

        _this.checkBtn();
      },

      prev: function(){
        let _this = this;
        let itemLeft = Math.abs(_this.position) / _this.itemWidth;
        _this.actionCheck -= 1;

        _this.position += itemLeft >= _this.sliderToScroll ? _this.moveScroll : itemLeft * _this.itemWidth;
        _this.movePosition();
      },
      next: function(){
        let _this = this;
        let itemLeft = _this.itemsCount - (Math.abs(_this.position) + _this.sliderToShow * _this.itemWidth) / _this.itemWidth;
        _this.actionCheck += 1;

        if(itemLeft >= _this.sliderToScroll){
            _this.position -= _this.moveScroll;
        }
        else if(itemLeft < 0){
          _this.position = 0;
        }
        else{
          _this.position -= itemLeft * _this.itemWidth;
        }

        _this.movePosition();
      },

      movePosition: function(itemLeft = 0){
        let _this = this;
        let action = Math.ceil(Math.abs(_this.position / _this.moveScroll));

        if ((Math.abs(_this.position) + _this.itemWidth * (_this.sliderToShow + 1)) > _this.track.width()) {
          _this.position = -_this.finalMove;
          _this.finalMovecheck = true;
        }
        else if(_this.finalMovecheck === true){
          _this.position = -((_this.moveScroll * Math.ceil((_this.itemsCount - (_this.sliderToShow * _this.itemWidth) / _this.itemWidth) / _this.sliderToScroll)) - _this.moveScroll)
          _this.finalMovecheck = false;
        }

        _this.track.css({
          transform: `translateX(${_this.position}px)`,
        });

        if(_this.dotsCheck == true){
          _this.actionDots(action);
          _this.actionDotsUnq();
        }

        _this.actionItem();

        _this.checkBtn();
      },
      checkBtn: function(){
        let _this = this;

        _this.btnPrev.removeClass("disabled");
        _this.btnNext.removeClass("disabled");
        _this.finalCheck = false;

        if(_this.position === 0){
          _this.btnPrev.addClass("disabled");
        }
        else if(_this.position <= -_this.finalMove){
          _this.finalCheck = true;
          _this.btnNext.addClass("disabled");
        }
      },

      mediaSlider: function(media){
        let _this = this;

          let widthBody = $("body").width();

          media.forEach(function(item, i, arr){
            if(item[0] > widthBody){
              _this.sliderToShow =  item[1][0];
              _this.sliderToScroll = item[1][1];

              if(_this.dotsCheck == true){
                _this.contentDots();
              }
            }
          });
      },

      TouchStart: function(e){
        let _this = this;

        _this.swipeStart = { x: e.originalEvent.changedTouches[0].clientX, y: e.originalEvent.changedTouches[0].clientY };
        _this.swipePosition = { x: _this.swipeStart.x, y: _this.swipeStart.y };
      },
      TouchMove: function(e){
        let _this = this;

        _this.swipePosition = { x: e.originalEvent.changedTouches[0].clientX, y: e.originalEvent.changedTouches[0].clientY };
      },
      TouchEnd: function(e){
        let _this = this;

        _this.CheckAction();

        _this.swipeStart = null;
        _this.swipePosition = null;
      },
      MausStart: function(e){
        let _this = this;

        _this.swipeStart = { x: e.clientX, y: e.clientY };
        _this.swipePosition = { x: _this.swipeStart.x, y: _this.swipeStart.y };
      },
      MausEnd: function(e){
        let _this = this;

        _this.swipePosition = { x: e.clientX, y: e.clientY };
        _this.CheckAction();

        _this.swipeStart = null;
        _this.swipePosition = null;
      },
      CheckAction: function(){
        let _this = this;

        var d = {
          x: _this.swipeStart.x - _this.swipePosition.x,
          y: _this.swipeStart.y - _this.swipePosition.y
        };

        if(Math.abs(d.x) > Math.abs(d.y)) {
          if(Math.abs(d.x) > _this.sensitivity) {
            if(d.x > 0) {
              _this.next();
            }
            else {
              _this.prev();
            }
          }
        }
      },

      actionDots: function(dotAction){
        let _this = this;
        $(_this.id+" "+_this.selectors.dot).each(function(index, element){
          $(element).removeClass("active");
          if (index == dotAction) {
            $(element).addClass("active");
          }
        });
      },
      actionDotsUnq: function(dotAction){
        // unq
        let _this = this;
        $(_this.id+" "+_this.selectors.dot_unq).removeClass("active");
        $(_this.id+" "+_this.selectors.dot_unq+"[data-number='"+_this.actionCheck+"']").addClass("active");
      },
      actionItem: function(){
        let _this = this;
        $(_this.id+" .slider-item .box").removeClass("active");
        $(_this.id+" .slider-item[data-numberslide='"+_this.actionCheck+"'] .box").addClass("active");
      },
      moveDots: function(elem){
        let _this = this;
        let moveDotsActionValue = $(_this.id+" "+_this.selectors.dot+".active").attr("data-number") - elem.attr("data-number");

        if (moveDotsActionValue > 0) {

          if (elem.attr("data-number") == 0) {
            _this.position = 0;
          }
          else {
            _this.position +=  _this.moveScroll * Math.abs(moveDotsActionValue);
          }

          _this.movePosition();

        }
        else if(moveDotsActionValue < 0){

          if (elem.attr("data-number") == ($(_this.id+" "+_this.selectors.dot).length - 1)) {
            _this.position = -((_this.itemsCount - _this.sliderToShow) * _this.itemWidth);
          }
          else {
            _this.position -= _this.moveScroll * Math.abs(moveDotsActionValue);
          }
          _this.movePosition();
        }
        else{
          return false;
        }

      },
      moveDotsUnq: function(elem){
        let _this = this;
        let moveDotsActionValue = $(_this.id+" "+_this.selectors.dot_unq+".active").attr("data-number") - elem.attr("data-number");

        if (moveDotsActionValue > 0 && (_this.moveScroll * (+elem.attr("data-number"))) < ((_this.itemsCount - _this.sliderToShow) * _this.itemWidth)) {

          if (_this.moveScroll * (+elem.attr("data-number")) == 0) {
            _this.position = 0;
          }
          else {
            _this.position =  -(_this.moveScroll * (+elem.attr("data-number")));
          }

          _this.movePosition();

        }
        else if(moveDotsActionValue < 0){

          if ((_this.moveScroll * Math.abs(moveDotsActionValue) + Math.abs(_this.position)) >= ((_this.itemsCount - _this.sliderToShow) * _this.itemWidth)) {
            _this.position = -((_this.itemsCount - _this.sliderToShow) * _this.itemWidth);
          }
          else {
            _this.position -= _this.moveScroll * Math.abs(moveDotsActionValue);
          }
          _this.movePosition();
        }
        else{
          return false;
        }

      },
      contentDots: function(){
        let _this = this;

        _this.dots.empty();
        let countMove = Math.ceil((_this.itemsCount - (_this.sliderToShow * _this.itemWidth) / _this.itemWidth) / _this.sliderToScroll);
        for(let i = 0; i <= countMove; i++){
          if(i == 0){
            _this.dots.append("<div class='dots active' data-number='"+i+"'></div>");
          }
          else{
            _this.dots.append("<div class='dots' data-number='"+i+"'></div>");
          }
        }
      },
  };

  let sliderKatalog = Object.create(slider);
  sliderKatalog.init(
    "#sliderKatalog",
    3,
    1,
    [[2000, [2, 1]], [1345, [1, 1]]],
    false,
    true
  );

  let sliderPrimary = Object.create(slider);
  sliderPrimary.init(
    "#sliderPrimary",
    1,
    1,
    [],
    true,
    true
  );
