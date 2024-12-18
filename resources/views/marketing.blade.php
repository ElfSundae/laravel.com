@extends('app')

@section('body-class', 'home')

@section('content')

<nav id="slide-menu" class="slide-menu" role="navigation">

	<div class="brand">
		<a href="/">
			<img src="/assets/img/laravel-logo-white.png" height="50" alt="Laravel white logo">
		</a>
	</div>

	<ul class="slide-main-nav">
		@include('partials.main-nav')
	</ul>

</nav>

<section class="hero">
	<div class="container">

        <div class="content">
            <h1>@lang('Love beautiful code? We do too.')</h1>
            <p>@lang('The PHP Framework For Web Artisans')</p>
        </div>

        @include('partials/browser')

        <div class="macbook">
<pre class="line-numbers"><code class="language-php">
&lt;?php


class Idea extends Eloquent
{

	/**
	 * Dreaming of something more?
	 *
	 * @with Laravel
	 */
	public function create()
	{
		// Have a fresh start...
	}

}</code></pre>
            {!! svg('macbook') !!}
        </div>

        <div class="callout rule">
            <span class="text">@lang("See What's New!")</span>
        </div>

        <div class="callouts">
            <a href="/docs/horizon" class="callout minimal third">
                <div class="callout-head">
                    <div class="callout-title">Laravel Horizon</div>
                    <div class="callout-icon">{!! svg('logo-horizon')!!}</div>
                </div>
                <p>@lang('Laravel Horizon provides a beautiful dashboard and code-driven configuration for your Redis queues.')</p>
            </a>
            <a href="https://nova.laravel.com" class="callout minimal third">
                <div class="callout-head">
                    <div class="callout-title">Laravel Nova</div>
                    <div class="callout-icon"><?php echo svg('laravel-nova'); ?></div>
                </div>
                <p>@lang('Laravel Nova is a beautiful administration panel designed by the creator of Laravel.')</p>
            </a>
            <a href="/docs/broadcasting" class="callout minimal third">
                <div class="callout-head">
                    <div class="callout-title">Laravel Echo</div>
                    <div class="callout-icon">{!! svg('logo-echo')!!}</div>
                </div>
                <p>@lang('Event broadcasting, evolved. Bring the power of WebSockets to your application without the complexity.')</p>
            </a>
        </div>
	</div>
</section>

{{-- <section class="panel laracon standout" id="laracon">
    <object type="image/svg+xml" data="/assets/img/laracon-16.svg" width="350"></object>
    <h2>This year Laracon goes <strong>bigger than ever</strong>. Early Bird tickets available for a limited time.</h2>
    <a href="http://laracon.us" class="btn"><em>Laracon US</em>Louisville, Kentucky</a>
    <a href="http://laracon.eu" class="btn"><em>Laracon EU</em>Amsterdam, Netherlands</a>
</section> --}}

<section class="panel features dark" id="features">
	<h1>@lang('Did someone say rapid?')</h1>
	<p class="intro">@lang('Elegant applications delivered at warp speed.')</p>
		<div class="blocks stacked">
			<div class="block odd">
				<div class="text">
					<h2>@lang('Expressive, beautiful syntax.')</h2>
					<p>@lang('Value elegance, simplicity, and readability? You’ll fit right in. Laravel is designed for people just like you. If you need help getting started, check out <a href="https://laracasts.com">Laracasts</a> and our <a href="/docs">great documentation</a>.')</p>
				</div>
				<div class="media">

					<div class='browser-window'>
						<div class='top-bar'>
							<div class='circles'>
								<div class="circle circle-red"></div>
								<div class="circle circle-yellow"></div>
								<div class="circle circle-green"></div>
							</div>
						</div>
						<div class='window-content'>
							<pre class="line-numbers"><code class="language-php">
class Purchase implements ShouldQueue
{

	/**
	 * Purchase a new podcast.
	 */
	public function handle(Repository $repo)
	{
		foreach ($this->purchases as $purchase)
		{
			//
		}
	}
</code></pre>
						</div>
					</div>

				</div>
			</div><!-- /.block -->
			<div class="block even">
				<div class="text">
					<h2>@lang('Tailored for your team.')</h2>
					<p>@lang('Whether you\'re a solo developer or a 20 person team, Laravel is a breath of fresh air. Keep everyone in sync using Laravel\'s database agnostic <a href="/docs/migrations">migrations</a> and <a href="/docs/migrations">schema builder</a>.')</p>
				</div>
				<div class="media">
					<div class="terminal-window">
						<div class='top-bar'></div>
						<div class='window-content'>
							<div class="dark-code">
							<pre><code class="language-bash">
~/Apps $ php artisan make:migration create_users_table
Migration created successfully!

~/Apps $ php artisan migrate --seed
Migrated: 2015_01_12_000000_create_users_table
Migrated: 2015_01_12_100000_create_password_resets_table
Migrated: 2015_01_13_162500_create_projects_table
Migrated: 2015_01_13_162508_create_servers_table
</code></pre></div>
						</div>
					</div>
				</div>
			</div><!-- /.block -->
			<div class="block odd">
				<div class="text">
					<h2>@lang('Modern toolkit. Pinch of magic.')</h2>
					<p>@lang('An <a href="/docs/eloquent">amazing ORM</a>, painless <a href="/docs/routing">routing</a>, powerful <a href="/docs/queues">queue library</a>, and <a href="/docs/authentication">simple authentication</a> give you the tools you need for modern, maintainable PHP. We sweat the small stuff to help you deliver amazing applications.')
				</div>
				<div class="media">

					<div class='browser-window'>
						<div class='top-bar'>
							<div class='circles'>
								<div class="circle circle-red"></div>
								<div class="circle circle-yellow"></div>
								<div class="circle circle-green"></div>
							</div>
						</div>
						<div class='window-content'>
							<pre class="line-numbers"><code class="language-php">
Route::resource('photos', 'PhotoController');

/**
 * Retrieve A User...
 */
Route::get('/user/{user}', function(App\User $user)
{
	return $user;
})
</code></pre>
					</div>
				</div>
			</div><!-- /.block -->
		</div>
	</section>

	<section class="panel ecosystem light" id="ecosystem">
		<h1>@lang('The Laravel Ecosystem')</h1>
		<p class="intro">@lang('Revolutionize how you build the web.')</p>

        <div class="container">
    		<a href="https://forge.laravel.com" class="callout full forge">
    			<div class="content">
					{!! svg('forge') !!}
    				<p>@lang('Instant PHP Platforms On Linode, DigitalOcean, and more. Push to deploy, PHP 7.2, HHVM, queues, and everything you need to launch and deploy amazing Laravel applications.')</p>
    				<p>@lang('Launch your application in minutes!')</p>
    			</div>
                <img src="/assets/img/forge-ui-preview.png" alt="Forge UI Preview" height="350" />
    		</a>
            <div class="callouts">
                <a class="third callout pop" href="/docs/homestead">
                    <div class="callout-head">
                        <div class="callout-title">Homestead</div>
                        <div class="callout-icon">{!! svg('h') !!}</div>
                    </div>
                    <div class="callout-body">
                        <p>@lang('The official Laravel development environment. Powered by Vagrant, Homestead gets your entire team on the same page with the latest PHP, MySQL, Postgres, Redis, and more.')</p>
                    </div>
                </a>
                <a class="third callout pop teal" href="https://laracasts.com">
                    <div class="callout-head">
                        <div class="callout-title">Laracasts</div>
                        <div class="callout-icon">{!! svg('play') !!}</div>
                    </div>
                    <div class="callout-body">
                        <p>@lang('Hundreds (yes, hundreds) of Laravel and PHP video tutorials with new videos added every week. Skim the basics or start your journey to Laravel mastery. All for the price of lunch.')</p>
                    </div>
                </a>
                <a class="third callout pop" href="/docs/billing">
                    <div class="callout-head">
                        <div class="callout-title">Laravel Cashier</div>
                        <div class="callout-icon">{!! svg('cashier') !!}</div>
                    </div>
                    <div class="callout-body">
                        <p>@lang('Make subscription billing painless with built-in Stripe integration. Coupons, swapping subscriptions, cancellations, and even PDF invoices are ready out of the box.')</p>
                    </div>
                </a>
            </div>
            <div class="callout rule">
                <span class="text">@lang('And so much more!')</span>
            </div>
            <div class="packages">
                <div class="package-row">
                    <div class="package">
                        <div class="icon">{!! svg('package') !!}</div>
                        <div class="content">
                            <a href="/docs/valet" class="package-title">Valet</a>
                            <p>@lang('A Laravel development environment for Mac minimalists. No Vagrant, no Apache, no fuss.')</p>
                        </div>
                    </div>
                    <div class="package">
                        <div class="icon">{!! svg('package') !!}</div>
                        <div class="content">
                            <a href="/docs/mix" class="package-title">Mix</a>
                            <!-- <p>If you've ever been frustrated with Gulp and asset compilation, Elixir is for you.</p> -->
                            <p>@lang('Laravel Mix makes front-end a breeze. Start using SASS and Webpack in minutes.')</p>
                        </div>
                    </div>
                    <div class="package">
                        <div class="icon">{!! svg('package') !!}</div>
                        <div class="content">
                            <a href="https://lumen.laravel.com" class="package-title">Lumen</a>
                            <p>@lang('If all you need is an API and lightning fast speed, try Lumen. It’s Laravel super-light.')</p>
                        </div>
                    </div>
                </div>
                <div class="package-row">
                    <div class="package">
                        <div class="icon">{!! svg('package') !!}</div>
                        <div class="content">
                            @if(rand(0, 1))
                            <a href="https://cachethq.io" class="package-title">Cachet</a>
                            <p>@lang('Cachet is the best way to inform customers of downtime. This is your status page.')</p>
                            @else
                            <a href="https://styleci.io" class="package-title">StyleCI</a>
                            <p>@lang('StyleCI is the PHP coding style continuous integration service for Laravel.')</p>
                            @endif
                        </div>
                    </div>
                    <div class="package">
                        <div class="icon">{!! svg('package') !!}</div>
                        <div class="content">
                            <a href="https://spark.laravel.com" class="package-title">Spark</a>
                            <p>@lang('Powerful SaaS application scaffolding. Stop writing boilerplate & focus on your application.')</p>
                        </div>
                    </div>
                    <div class="package">
                        <div class="icon">{!! svg('package') !!}</div>
                        <div class="content">
                            <a href="https://statamic.com" class="package-title">Statamic</a>
                            <p>@lang('Need a CMS that runs on Laravel and is built for developers <em>and</em> clients? Look no further.')</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</section>
@endsection
