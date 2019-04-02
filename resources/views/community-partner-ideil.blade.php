@extends('app')

@section('body-class', 'community')

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

<section class="partner-profile">
    <div class="container">
        <a href="/partners"><h4>Laravel Partners</h4></a>

        <div class="partner-profile-header clearfix">
            <div class="partner-logo"><img src="/assets/svg/partner-logo-ideil-full.svg"></div>
            <div class="partner-ctas">
                <a href="mailto:welcome@ideil.com"><div class="btn btn-primary">Hire ideil</div></a>
                <a href="https://about.ideil.com/"><div class="btn btn-default">Visit Website</div></a>
            </div>
        </div>

        <div class="row">
            <div class="partner-profile-overview col-md-6">
                <div class="partner-profile-img"><img src="/assets/img/partner-img-ideil.png"></div>

                <div class="partner-proficiencies">
                    <h4>Proficiencies</h4>
                    <div class="flex">
                        <ul class="partner-proficiencies-list multi-col flex-fill">
                            <li>Laravel Development</li>
                            <li>Vue.js</li>
                            <li>APIs / Microservices</li>
                            <li>UI/UX Product Design</li>
                            <li>Software Architecture</li>
                            <li>Project Management</li>
                        </ul>

                        <ul class="partner-proficiencies-list multi-col flex-fill">
                            <li>Technical Leadership</li>
                            <li>E-commerce</li>
                            <li>Rescue Projects</li>
                            <li>Codebase Audit</li>
                            <li>iOS App Development</li>
                            <li>Android App Development</li>
                        </ul>
                    </div>
                </div>

                <div class="partner-social">
                    <h4>Elsewhere</h4>

                    <ul class="partner-social-list">
                        <li><a href="https://github.com/ideil"><img src="/assets/svg/icon-github.svg"></a></li>
                        <li><a href="https://twitter.com/ideil"><img src="/assets/svg/icon-twitter.svg"></a></li>
                        <li><a href="https://www.linkedin.com/company/ideil/"><img src="/assets/svg/icon-linkedin.svg"></a></li>
                        <li><a href="https://www.facebook.com//ideilcom"><img src="/assets/svg/icon-facebook.svg"></a></li>
                    </ul>
                </div>
            </div>

            <div class="partner-profile-bio col-md-6">
                <h2>About Ideil</h2>
                <p>We are a web development company of 30+ high-skilled professionals.</p>

                <p>Our main focus is custom software development. This is the thing that we enjoy doing the most as it is always a new challenge for us to take.</p>

                <p>The web stack we're working with involves the hottest and at the same time battle-tested solutions and frameworks — Laravel, Vue.js, Nginx, MySQL. To offer our clients seamless support and full-cycle service we have a team of mobile developers that collaborate tightly with our backend team. This helps us minimize the communication barriers that are often present in distributed teams.</p>

                <p>Communication is the key for every successful partnership and we value every bit of your time and hear every word. You make yourself clear on the topic and we distribute responsibilities among the members of the team. Tasks just get done.</p>

                <p>deil. has a keen sense of satisfaction and you can experience it as well with your next delivered product. Be it a brilliant design, sophisticated technology or carefully considered details, people can not resist this magic.</p>
            </div>
        </div>
    </div>
</section>
@endsection
