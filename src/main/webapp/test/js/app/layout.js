var mainPageObj = {
	init: function() {
		this.action();
	},
	action: function() {
		$('.main-nav-link').off('click').on('click', function() {
			var tabId = $(this).attr('id');
			console.log(tabId);
			var li =	'<li class="d-flex align-items-center nav-item">' +
		            	'	<a class="nav-link" id="profile-tab" data-bs-toggle="tab" href="#tab-'+ tabId + '" role="tab" aria-selected="false">'+ tabId + '</a>' +
		            	'	<i class="mdi mdi-close main_tab_close" data-main-tab-id="'+ tabId + '"></i>' +
		            	'</li>';
			$('.home-tab .nav-tabs').append(li);
			$('.home-tab .tab-pane').removeClass('show').removeClass('active');
			var content = 	'<div class="tab-pane main-tab-pane fade show active" id="tab-'+ tabId + '" role="tabpanel" aria-labelledby="overview">' +
							'    <div class="row">' +
							'		<div class="col-sm-12">' +
										tabId +
							'		</div>' +
							'	</div>' +
							'</div>';
			$('.home-tab .tab-content').append(content);
		});
		$(document).on('click', '.main_tab_close', function(e) {
			const tabId = $(this).data('main-tab-id');
			var li = $(this).closest('li');
			var tabSize = $('.home-tab .nav-tabs li').length - 1;
			var curIdx = li.index(); 
			console.log(tabSize, curIdx);
			$(li).remove();
			$('.home-tab .tab-pane').eq(curIdx).remove();
			if(tabSize > curIdx) {
				$('.home-tab .tab-pane').removeClass('show').removeClass('active');
				$('.home-tab .tab-pane').eq(curIdx == 0 ? 0 : curIdx - 1).addClass('show').addClass('active');
			}
		});
	}
};

$(document).ready( function() {
	mainPageObj.init();
});