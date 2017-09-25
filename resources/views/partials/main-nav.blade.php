<li class="nav-docs"><a href="/docs">@lang('Documentation')</a></li>
<li class="nav-laracasts"><a href="https://laracasts.com">Laracasts</a></li>
<li class="nav-laravel-news"><a href="https://laravel-news.com">@lang('News')</a></li>
<li class="nav-partners"><a href="/partners">@lang('Partners')</a></li>
<li class="nav-forge"><a href="https://forge.laravel.com">Forge</a></li>

<li class="dropdown community-dropdown">
	<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">@lang('Ecosystem') <span class="caret"></span></a>
	<ul class="dropdown-menu" role="menu">

		<li><a href="https://envoyer.io">Envoyer</a></li>
		<li><a href="https://lumen.laravel.com">Lumen</a></li>
		<li><a href="https://spark.laravel.com">Spark</a></li>

		<li class="divider"></li>

		<li><a href="https://laracon.eu">Laracon EU</a></li>
		<li><a href="http://laracon.us">Laracon US</a></li>
		<li><a href="https://laracon.net">Laracon Online</a></li>

		<li class="divider"></li>

		<li><a href="https://laracasts.com/discuss">Forums</a></li>
		<li><a href="https://github.com/laravel/laravel">GitHub</a></li>
		<li><a href="https://larajobs.com/?partner=5#/">Jobs</a></li>
		<li><a href="http://www.laravelpodcast.com/">Podcast</a></li>
		<li><a href="https://larachat.co">Slack</a></li>
		<li><a href="https://twitter.com/laravelphp">Twitter</a></li>
	</ul>
</li>

<li class="dropdown language-dropdown">
	<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
		<img src="/assets/flag/{{ app()->getLocale() }}.png" width="22">
	</a>
	<ul class="dropdown-menu dropdown-menu-right language-dropdown-menu" role="menu">
		<li><a href="#" data-locale=""><img src="/assets/flag/en.png" width="17"> English</a></li>
		<li><a href="#" data-locale="zh"><img src="/assets/flag/zh.png" width="17"> 中文</a></li>
	</ul>
</li>
