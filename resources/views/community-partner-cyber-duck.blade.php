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
            <div class="partner-logo" style="margin-top: 14px;"><img src="/assets/img/partner-img-cyberduck-logo.png" width="240"></div>
            <div class="partner-ctas">
                <a href="https://www.cyber-duck.co.uk/our-culture/careers"><div class="btn btn-primary">Get Hired</div></a>
                <a href="https://www.cyber-duck.co.uk/how-we-work/technology/laravel?utm_source=Laravel%20Partner&utm_medium=Sponsorship"><div class="btn btn-default">Visit Website</div></a>
            </div>
        </div>

        <div class="row">
            <div class="partner-profile-overview col-md-6">
                <div class="partner-profile-img"><img src="/assets/img/partner-img-cyberduck.png"></div>

                <div class="partner-proficiencies">
                    <h4>Proficiencies</h4>
                    <div class="flex">
                        <ul class="partner-proficiencies-list multi-col flex-fill">
                            <li>Laravel Development</li>
                            <li>Laravel Consulting</li>
                            <li>Vue, React and Angular</li>
                            <li>APIs</li>
                            <li>Software Architecture</li>
                        </ul>

                        <ul class="partner-proficiencies-list multi-col flex-fill">
                            <li>Service Design</li>
                            <li>User Centred Design (UCD)</li>
                            <li>UI/UX Product Design</li>
                            <li>Technical Leadership</li>
                            <li>Project Management Office (PMO)</li>
                        </ul>
                    </div>
                </div>

                <div class="partner-social">
                    <h4>Elsewhere</h4>

                    <ul class="partner-social-list">
                        <li><a href="https://www.facebook.com/cyberducklondon"><img src="/assets/svg/icon-facebook.svg"></a></li>
                        <li><a href="https://twitter.com/Cyberduck_uk"><img src="/assets/svg/icon-twitter.svg"></li>
                        <li><a href="https://www.linkedin.com/company/cyber-duck/"><img src="/assets/svg/icon-linkedin.svg"></a></li>
                    </ul>
                </div>
            </div>

            <div class="partner-profile-bio col-md-6">
                <h2>About Cyber Duck</h2>
                <p>We have been trusted for over 13 years by organisations such as The Bank of England, Mitsubishi Electric and Cancer Research to produce game changing applications through service design underpinned by a user centred approach and an astute knowledge of Laravel and Vue.js.</p>
                <p>Our team is comprised of 45+ user experience experts, software developers and marketing strategists based in the UK and USA. We have been using Laravel for over 6 years since its inception and it is our preferred framework for product development. Working in an agile fashion, we have built and maintained bespoke products for many industries, constantly iterating and evolving platforms as business requirements change.</p>
                <p>We are an ISO 9001 certified in quality process and ISO27001 certified in security management as well as ISO9241 accredited in human centred design. On top of that we are Google Analytics and Google Tag Manager certified agency bringing a proven, user and data driven award winning process to each partnership.</p>
            </div>
        </div>
    </div>
</section>
@endsection
