;(function(global, $){
	if (!$) { throw 'No jQuery/$ object to integrate BackToHash into.'; }
	$.fn.BackToHash = function(mayAdd) {
		var mayAdd      = !!mayAdd, //如果选择器元素可以添加到dom中，则使其为真。
			$this 		= $(this), //如果不是mayAdd，则缓存jQuery对象。
			tSelector   = this.selector,
			$view       = $(global), 
			$collection = $this,
			checkScroll = function() {
				if(mayAdd) {
					$collection = $(tSelector);
				}
				$collection.each(function() {
					var hash = $(this).attr('id') || $(this).attr('name'),
						BoundingClientRect = $(this).offset().top - $view.scrollTop(),
						inSetArea = Math.abs(BoundingClientRect) < 20;
					if(hash && inSetArea) {location.hash = hash;}
				});
			};
		//如果不是mayAdd，但是您也需要添加新元素来使用这个插件，在添加后，调用这个函数，参数是您想要添加的选择器。
		$collection.add = function(selector) {
			$collection = $.merge($collection, $(selector));
			return $collection;
		}
		$view.bind('scroll.backtohash', checkScroll);
		return $collection;
	}
}(window, jQuery));